import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";

interface IdVerificationProps {
  bookingId: string;
  guestName: string;
}

type VerifyStep =
  | "upload"    // initial: pick file
  | "preview"   // file selected, ready to submit
  | "scanning"  // POST in progress + animation
  | "verified"  // matchScore >= 90, verified
  | "review"    // matchScore < 90, needs manual review
  | "error";    // failed

const ID_TYPES = [
  { value: "aadhaar", label: "Aadhaar Card" },
  { value: "passport", label: "Passport" },
  { value: "driving_licence", label: "Driving Licence" },
  { value: "voter_id", label: "Voter ID" },
  { value: "other", label: "Other Govt. ID" },
] as const;

function ScanningAnimation() {
  return (
    <div class="relative flex items-center justify-center w-36 h-36 mx-auto">
      {/* Outer pulse rings */}
      <div class="absolute inset-0 rounded-full border-4 border-mint-500/20 animate-ping" />
      <div
        class="absolute inset-2 rounded-full border-4 border-mint-500/30 animate-ping"
        style="animation-delay: 300ms;"
      />
      <div
        class="absolute inset-4 rounded-full border-4 border-mint-500/40 animate-ping"
        style="animation-delay: 600ms;"
      />

      {/* Center spinner */}
      <div class="relative w-16 h-16">
        <div class="absolute inset-0 rounded-full border-4 border-mint-100" />
        <div class="absolute inset-0 rounded-full border-4 border-mint-500 border-t-transparent animate-spin" />

        {/* ID icon in center */}
        <div class="absolute inset-0 flex items-center justify-center">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="1"
              y="4"
              width="20"
              height="14"
              rx="2"
              stroke="#00E676"
              stroke-width="1.5"
            />
            <circle cx="7" cy="10" r="2.5" stroke="#00E676" stroke-width="1.5" />
            <path
              d="M12 8H18M12 11H16"
              stroke="#00E676"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Scanning beam */}
      <div
        class="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-mint-400 to-transparent opacity-80"
        style="animation: scanBeam 2s ease-in-out infinite;"
      />

      <style>{`
        @keyframes scanBeam {
          0% { top: 20%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 80%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function IdVerification(
  { bookingId, guestName }: IdVerificationProps,
) {
  const step = useSignal<VerifyStep>("upload");
  const selectedIdType = useSignal<string>("aadhaar");
  const previewUrl = useSignal<string | null>(null);
  const imageB64 = useSignal<string | null>(null);
  const errorMsg = useSignal("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      errorMsg.value = "Please upload an image (JPG, PNG) or PDF.";
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      errorMsg.value = "File is too large. Maximum size is 10MB.";
      return;
    }

    errorMsg.value = "";

    // Generate preview URL
    previewUrl.value = URL.createObjectURL(file);

    // Convert to base64 for upload
    const reader = new FileReader();
    reader.onload = (ev) => {
      imageB64.value = (ev.target?.result as string) ?? null;
      step.value = "preview";
    };
    reader.readAsDataURL(file);
  }

  const matchScore = useSignal(0);
  const verifyMessage = useSignal("");

  async function handleSubmit() {
    if (!imageB64.value) return;

    step.value = "scanning";
    errorMsg.value = "";

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          guestName,
          idType: selectedIdType.value,
          imageB64: imageB64.value,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        step.value = "error";
        errorMsg.value = data.error ?? "Verification failed. Please try again.";
        return;
      }

      // Show scanning animation for at least 2.5 seconds for UX effect
      await new Promise((r) => setTimeout(r, 2500));

      matchScore.value = data.matchScore ?? 0;
      verifyMessage.value = data.message ?? "";

      if (data.verified) {
        step.value = "verified";
      } else {
        step.value = "review";
      }
    } catch {
      step.value = "error";
      errorMsg.value = "Network error. Please check your connection.";
    }
  }

  // ── Upload Step ────────────────────────────────────────────
  if (step.value === "upload") {
    return (
      <div class="space-y-5">
        <div class="text-center">
          <p class="text-sm font-600 text-gray-700 mb-1">
            Verify your identity, {guestName.split(" ")[0]}
          </p>
          <p class="text-xs text-gray-400">
            Upload a photo of your government-issued ID. Your data is encrypted and used only for verification.
          </p>
        </div>

        {/* ID type selector */}
        <div>
          <label class="block text-xs font-600 text-gray-500 mb-2">
            ID Type
          </label>
          <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {ID_TYPES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => (selectedIdType.value = value)}
                class={`py-2 px-3 rounded-xl border text-xs font-600 transition-all duration-150 ${
                  selectedIdType.value === value
                    ? "border-istay-400 bg-istay-50 text-istay-900"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* File drop zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          class="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed border-gray-200 hover:border-mint-300 bg-gray-50 hover:bg-mint-50/50 cursor-pointer transition-all duration-200 group"
        >
          <div class="w-12 h-12 rounded-2xl bg-gray-200 group-hover:bg-mint-100 flex items-center justify-center transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 16V8M12 8L9 11M12 8L15 11"
                stroke="#9ca3af"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="group-hover:stroke-istay-600 transition-colors"
              />
              <path
                d="M4 16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16"
                stroke="#9ca3af"
                stroke-width="1.5"
                stroke-linecap="round"
                class="group-hover:stroke-istay-600 transition-colors"
              />
            </svg>
          </div>
          <div class="text-center">
            <p class="text-sm font-700 text-gray-700 group-hover:text-istay-900">
              Tap to upload your ID
            </p>
            <p class="text-xs text-gray-400 mt-0.5">
              JPG, PNG or PDF · Max 10MB
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          class="hidden"
          aria-label="Upload ID document"
          capture="environment"
        />

        {errorMsg.value && (
          <p class="text-xs text-rose-600 text-center">{errorMsg.value}</p>
        )}
      </div>
    );
  }

  // ── Preview Step ───────────────────────────────────────────
  if (step.value === "preview") {
    return (
      <div class="space-y-4">
        <div class="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
          {previewUrl.value && !previewUrl.value.startsWith("blob:pdf") && (
            <img
              src={previewUrl.value}
              alt="ID preview"
              class="w-full h-48 object-contain"
            />
          )}
          <div class="absolute top-3 right-3">
            <span class="px-2.5 py-1 rounded-full bg-white/90 text-xs font-600 text-gray-700 shadow-sm">
              {ID_TYPES.find((t) => t.value === selectedIdType.value)?.label}
            </span>
          </div>
        </div>

        <div class="flex gap-3">
          <button
            onClick={() => {
              step.value = "upload";
              previewUrl.value = null;
              imageB64.value = null;
            }}
            class="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-600 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            ← Retake
          </button>
          <button
            onClick={handleSubmit}
            class="flex-1 py-3 rounded-xl bg-istay-900 text-white text-sm font-700 hover:bg-istay-800 active:scale-95 transition-all shadow-sm"
          >
            Submit & Verify →
          </button>
        </div>
      </div>
    );
  }

  // ── Scanning Step ──────────────────────────────────────────
  if (step.value === "scanning") {
    return (
      <div class="flex flex-col items-center justify-center py-8 gap-5">
        <ScanningAnimation />
        <div class="text-center">
          <p class="text-sm font-700 text-gray-900 mb-1">Scanning your ID...</p>
          <p class="text-xs text-gray-400">
            AI-powered verification in progress
          </p>
        </div>
        <div class="flex items-center gap-1.5 text-xs text-gray-400">
          {["Uploading", "Analyzing", "Verifying"].map((label, i) => (
            <span key={label} class="flex items-center gap-1">
              {i > 0 && <span class="text-gray-200">→</span>}
              <span class={`font-500 ${i === 0 ? "text-istay-600" : ""}`}>
                {label}
              </span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  // ── Verified Step (matchScore >= 90) ──────────────────────
  if (step.value === "verified") {
    return (
      <div class="flex flex-col items-center justify-center py-8 gap-4 text-center">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full bg-emerald-50 border-2 border-emerald-200" />
          <div class="absolute inset-0 flex items-center justify-center">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 15L12 21L24 9"
                stroke="#10b981"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div>
          <h3 class="text-base font-800 text-gray-900">
            Verified ✅
          </h3>
          <p class="text-xs text-gray-400 mt-1.5 leading-relaxed max-w-xs">
            {verifyMessage.value || "Your identity has been verified successfully!"}
          </p>
        </div>
        <div class="mt-2 p-3 rounded-xl bg-emerald-50 border border-emerald-100 w-full">
          <p class="text-xs text-emerald-700 font-600 text-center">
            ✓ Booking #{bookingId.slice(0, 8).toUpperCase()} — ID Verified (Score: {matchScore.value}%)
          </p>
        </div>
        <a
          href="#checkin-instructions"
          class="w-full py-3 rounded-xl bg-istay-900 text-white text-sm font-700 hover:bg-istay-800 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1L1.5 5.5V14.5H6V10H10V14.5H14.5V5.5L8 1Z" fill="white" />
          </svg>
          View Check-in Instructions
        </a>
      </div>
    );
  }

  // ── Review Step (matchScore < 90) ───────────────────────
  if (step.value === "review") {
    return (
      <div class="flex flex-col items-center justify-center py-8 gap-4 text-center">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full bg-amber-50 border-2 border-amber-200" />
          <div class="absolute inset-0 flex items-center justify-center text-2xl">
            🔍
          </div>
        </div>
        <div>
          <h3 class="text-base font-800 text-gray-900">
            Under Review
          </h3>
          <p class="text-xs text-gray-400 mt-1.5 leading-relaxed max-w-xs">
            {verifyMessage.value || "Your ID is being reviewed by our team. You'll receive a confirmation email shortly."}
          </p>
        </div>
        <div class="mt-2 p-3 rounded-xl bg-amber-50 border border-amber-100 w-full">
          <p class="text-xs text-amber-700 font-600 text-center">
            ⏳ Booking #{bookingId.slice(0, 8).toUpperCase()} — Manual Review (Score: {matchScore.value}%)
          </p>
        </div>
        <p class="text-xs text-gray-400">
          Your stay is still confirmed. Check-in instructions will be sent via email after review.
        </p>
      </div>
    );
  }

  // ── Error Step ─────────────────────────────────────────────
  return (
    <div class="flex flex-col items-center justify-center py-8 gap-4 text-center">
      <div class="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-2xl">
        ⚠️
      </div>
      <div>
        <p class="text-sm font-700 text-gray-900 mb-1">Verification failed</p>
        <p class="text-xs text-gray-500 leading-relaxed">
          {errorMsg.value}
        </p>
      </div>
      <button
        onClick={() => {
          step.value = "upload";
          errorMsg.value = "";
          previewUrl.value = null;
          imageB64.value = null;
        }}
        class="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-600 text-gray-700 hover:bg-gray-50 transition-colors"
      >
        ← Try again
      </button>
    </div>
  );
}
