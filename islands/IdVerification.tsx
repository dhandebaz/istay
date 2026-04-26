import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";
import { compressImage } from "../utils/compression.ts";

interface IdVerificationProps {
  bookingId: string;
  guestName: string;
}

type VerifyStep =
  | "upload" 
  | "preview" 
  | "scanning" 
  | "verified" 
  | "review" 
  | "error";

const ID_TYPES = [
  { value: "aadhaar", label: "Aadhaar Card" },
  { value: "passport", label: "Passport" },
  { value: "driving_licence", label: "Driving Licence" },
  { value: "voter_id", label: "Voter ID" },
  { value: "other", label: "Other Govt. ID" },
] as const;

function ScanningAnimation() {
  return (
    <div class="relative flex items-center justify-center w-48 h-48 mx-auto">
      <div class="absolute inset-0 rounded-[2.5rem] border-4 border-emerald-500/10 animate-ping" />
      <div
        class="absolute inset-4 rounded-[2rem] border-4 border-emerald-500/5 animate-ping"
        style="animation-delay: 500ms;"
      />

      <div class="relative w-32 h-32 rounded-[2rem] bg-white shadow-premium border border-emerald-50 flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent" />
        <div class="absolute inset-4 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin opacity-40" />
        
        <div class="relative z-10 scale-125">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect x="3" y="6" width="18" height="12" rx="2" stroke="#10b981" stroke-width="2.5" />
            <circle cx="8.5" cy="12" r="2.5" stroke="#10b981" stroke-width="2.5" />
            <path d="M14.5 10h4M14.5 14h2" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" />
          </svg>
        </div>
        
        <div
          class="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60 z-20"
          style="animation: scanBeam 3s ease-in-out infinite;"
        />
      </div>

      <style>
        {`
        @keyframes scanBeam {
          0% { top: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}
      </style>
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

    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      errorMsg.value = "Document format not supported. Please provide JPG, PNG or PDF.";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      errorMsg.value = "Document size limit exceeded. Please provide a file under 10MB.";
      return;
    }

    errorMsg.value = "";
    previewUrl.value = URL.createObjectURL(file);

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const rawB64 = (ev.target?.result as string) ?? null;
      if (rawB64 && file.type.startsWith("image/")) {
        try {
          imageB64.value = await compressImage(rawB64);
        } catch (err) {
          imageB64.value = rawB64;
        }
      } else {
        imageB64.value = rawB64;
      }
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
        errorMsg.value = data.error ?? "Protocol error. Please re-submit your identification.";
        return;
      }

      await new Promise((r) => setTimeout(r, 3000));

      matchScore.value = data.matchScore ?? 0;
      verifyMessage.value = data.message ?? "";

      if (data.verified) {
        step.value = "verified";
      } else {
        step.value = "review";
      }
    } catch {
      step.value = "error";
      errorMsg.value = "Secure connection discrepancy. Please refresh and try again.";
    }
  }

  if (step.value === "upload") {
    return (
      <div class="space-y-10 animate-fade-in">
        <div class="text-center space-y-2">
          <p class="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em]">
            Protocol Authentication
          </p>
          <h2 class="text-2xl font-bold text-gray-900 tracking-tight">
            Verify Residency, {guestName.split(" ")[0]}
          </h2>
          <p class="text-[13px] font-medium text-gray-400 mt-3 max-w-sm mx-auto leading-relaxed">
            Please provide a professional capture of your government-issued identification for secure residency authentication.
          </p>
        </div>

        <div class="space-y-4">
          <label class="block text-[10px] font-bold text-gray-300 uppercase tracking-widest text-center">
            Document Selection
          </label>
          <div class="grid grid-cols-2 gap-4">
            {ID_TYPES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => (selectedIdType.value = value)}
                class={`py-4 px-6 rounded-2xl border text-[11px] font-bold uppercase tracking-widest transition-all duration-500 shadow-sm ${
                  selectedIdType.value === value
                    ? "border-emerald-500 bg-emerald-500 text-white shadow-premium"
                    : "border-gray-50 bg-gray-50/50 text-gray-400 hover:border-emerald-200 hover:bg-emerald-50/30"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div
          onClick={() => fileInputRef.current?.click()}
          class="group relative flex flex-col items-center justify-center gap-6 p-16 rounded-[2.5rem] border-2 border-dashed border-gray-100 bg-gray-50/30 hover:bg-white hover:border-emerald-400/50 hover:shadow-premium-lg cursor-pointer transition-all duration-700 overflow-hidden"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div class="relative w-20 h-20 rounded-[1.5rem] bg-white border border-gray-100 group-hover:bg-gray-900 group-hover:text-white flex items-center justify-center transition-all duration-500 shadow-sm group-hover:scale-110 group-hover:-rotate-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          
          <div class="text-center relative">
            <p class="text-[12px] font-bold text-gray-900 uppercase tracking-widest">
              Submit Identification
            </p>
            <p class="text-[10px] font-bold text-gray-300 mt-2 uppercase tracking-widest">
              High Resolution JPG, PNG or PDF
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          class="hidden"
          capture="environment"
        />

        {errorMsg.value && (
          <div class="p-5 bg-rose-50 border border-rose-100 rounded-3xl animate-shake">
            <p class="text-[11px] font-bold text-rose-600 text-center uppercase tracking-widest leading-relaxed">
              Discrepancy: {errorMsg.value}
            </p>
          </div>
        )}
        
        <div class="pt-4 flex items-center justify-center gap-4 text-[9px] font-bold text-gray-300 uppercase tracking-widest">
           <div class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
           256-Bit Encrypted Protocol
           <div class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>
      </div>
    );
  }

  if (step.value === "preview") {
    return (
      <div class="space-y-8 animate-fade-in">
        <div class="text-center space-y-2">
          <p class="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em]">Curation Preview</p>
          <h3 class="text-2xl font-bold text-gray-900 tracking-tight">Verify Legibility</h3>
        </div>

        <div class="relative rounded-[3rem] overflow-hidden border border-gray-100 bg-white shadow-premium-lg group">
          {previewUrl.value && !previewUrl.value.startsWith("blob:pdf") && (
            <img
              src={previewUrl.value}
              alt="Identification Capture"
              class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          )}
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div class="absolute bottom-6 left-6">
            <span class="px-5 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md shadow-premium text-[10px] font-bold text-gray-900 uppercase tracking-widest">
              {ID_TYPES.find((t) => t.value === selectedIdType.value)?.label}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6">
          <button
            onClick={() => {
              step.value = "upload";
              previewUrl.value = null;
              imageB64.value = null;
            }}
            class="py-5 rounded-[1.5rem] border border-gray-100 bg-white text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:bg-gray-50 hover:text-gray-900 transition-all duration-500"
          >
            ← Recapture
          </button>
          <button
            onClick={handleSubmit}
            class="py-5 rounded-[1.5rem] bg-gray-900 text-white text-[11px] font-bold uppercase tracking-widest shadow-premium hover:bg-emerald-600 hover:-translate-y-1 transition-all duration-500"
          >
            Synchronize →
          </button>
        </div>
      </div>
    );
  }

  if (step.value === "scanning") {
    return (
      <div class="flex flex-col items-center justify-center py-16 gap-10 animate-fade-in">
        <ScanningAnimation />
        <div class="text-center space-y-3">
          <p class="text-2xl font-bold text-gray-900 tracking-tight">Synchronizing Identity</p>
          <p class="text-[13px] font-medium text-gray-400 max-w-xs mx-auto leading-relaxed">
            Bespoke identity audit in progress...
          </p>
        </div>
        <div class="flex items-center gap-5">
          {["Encryption", "Analysis", "Validation"].map((label, i) => (
            <div key={label} class="flex items-center gap-5">
              {i > 0 && <div class="w-2 h-0.5 bg-gray-100 rounded-full" />}
              <span class={`text-[10px] font-bold uppercase tracking-[0.2em] ${i === 1 ? "text-emerald-500 animate-pulse" : "text-gray-200"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step.value === "verified") {
    return (
      <div class="flex flex-col items-center justify-center py-12 gap-10 text-center animate-fade-in">
        <div class="w-24 h-24 rounded-[2rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center text-4xl shadow-sm animate-scale-in">
          ✓
        </div>
        <div class="space-y-3">
          <h3 class="text-2xl font-bold text-gray-900 tracking-tight">
            Authentication Successful
          </h3>
          <p class="text-[13px] font-medium text-gray-400 leading-relaxed max-w-sm mx-auto">
            {verifyMessage.value || "Residency protocol complete. Your stay credentials have been successfully authorized."}
          </p>
        </div>
        <div class="p-8 rounded-[2.5rem] bg-emerald-50/50 border border-emerald-100 w-full space-y-3 shadow-inner">
          <p class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
            Residency Audit Record
          </p>
          <p class="text-sm font-bold text-emerald-900 tracking-tight">
            SEC_ID_{bookingId.slice(0, 8).toUpperCase()} • {matchScore.value}% Clarity
          </p>
        </div>
        <a
          href="#checkin-instructions"
          class="w-full py-5 rounded-[1.5rem] bg-gray-900 text-white text-[11px] font-bold uppercase tracking-widest shadow-premium hover:bg-emerald-600 hover:-translate-y-1 transition-all duration-500 flex items-center justify-center gap-4"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Arrival Credentials
        </a>
      </div>
    );
  }

  if (step.value === "review") {
    return (
      <div class="flex flex-col items-center justify-center py-12 gap-10 text-center animate-fade-in">
        <div class="w-24 h-24 rounded-[2rem] bg-amber-50 border border-amber-100 flex items-center justify-center text-4xl shadow-sm animate-pulse">
          ⏳
        </div>
        <div class="space-y-3">
          <h3 class="text-2xl font-bold text-gray-900 tracking-tight">
            Audit in Progress
          </h3>
          <p class="text-[13px] font-medium text-gray-400 leading-relaxed max-w-sm mx-auto">
            {verifyMessage.value || "Your identification is undergoing professional curation. This is a standard procedure."}
          </p>
        </div>
        <div class="p-8 rounded-[2.5rem] bg-amber-50/50 border border-amber-100 w-full space-y-3 shadow-inner">
          <p class="text-[10px] font-bold text-amber-600 uppercase tracking-widest">
            Authentication Status
          </p>
          <p class="text-sm font-bold text-amber-900 tracking-tight">
            REF_{bookingId.slice(0, 8).toUpperCase()} • Manual Verification
          </p>
        </div>
        <p class="text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-relaxed max-w-xs">
          Residency confirmed. Arrival access details will be synchronized shortly.
        </p>
      </div>
    );
  }

  return (
    <div class="flex flex-col items-center justify-center py-16 gap-10 text-center animate-fade-in">
      <div class="w-24 h-24 rounded-[2rem] bg-rose-50 border border-rose-100 flex items-center justify-center text-4xl shadow-sm">
        !
      </div>
      <div class="space-y-3">
        <h3 class="text-2xl font-bold text-gray-900 tracking-tight">Authentication Discrepancy</h3>
        <p class="text-[13px] font-medium text-rose-500 leading-relaxed max-w-sm mx-auto">
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
        class="px-10 py-5 rounded-[1.5rem] border border-gray-100 bg-white text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:bg-gray-50 hover:text-gray-900 transition-all duration-500"
      >
        ← Restart Protocol
      </button>
    </div>
  );
}
