import { useSignal } from "@preact/signals";

interface CheckoutFormProps {
  propId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  amount: number;
  propertyName: string;
}

type FormStep = "details" | "submitting" | "redirecting" | "error";

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onInput,
  required = true,
  pattern,
  autocomplete,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onInput: (v: string) => void;
  required?: boolean;
  pattern?: string;
  autocomplete?: string;
}) {
  return (
    <div class="relative group">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onInput={(e) => onInput((e.target as HTMLInputElement).value)}
        required={required}
        pattern={pattern}
        autocomplete={autocomplete}
        placeholder=" "
        class="peer w-full px-6 pt-7 pb-3 rounded-2xl border border-gray-100 bg-gray-50/50 text-[15px] font-medium text-gray-900 placeholder-transparent focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:outline-none transition-all duration-300"
      />
      <label
        for={id}
        class="absolute left-6 top-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest peer-placeholder-shown:top-5 peer-placeholder-shown:text-[13px] peer-placeholder-shown:font-medium peer-placeholder-shown:tracking-normal peer-focus:top-3 peer-focus:text-[10px] peer-focus:font-bold peer-focus:tracking-widest peer-focus:text-emerald-600 transition-all duration-300 pointer-events-none opacity-60 peer-focus:opacity-100"
      >
        {label}
        {required && <span class="text-rose-400 ml-1">*</span>}
      </label>
    </div>
  );
}

export default function CheckoutForm(
  { propId, checkIn, checkOut, nights, amount, propertyName }:
    CheckoutFormProps,
) {
  const step = useSignal<FormStep>("details");
  const errorMsg = useSignal("");

  // Form fields
  const guestName = useSignal("");
  const guestEmail = useSignal("");
  const guestPhone = useSignal("");

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (
      !guestName.value.trim() || !guestEmail.value.trim() ||
      !guestPhone.value.trim()
    ) {
      errorMsg.value = "All residency principal protocols must be defined.";
      return;
    }

    const phoneRaw = guestPhone.value.replace(/\s/g, "");
    if (!/^[6-9]\d{9}$/.test(phoneRaw)) {
      errorMsg.value = "Please provide a valid 10-digit operational contact number.";
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail.value)) {
      errorMsg.value = "Communication node (email) format discrepancy.";
      return;
    }

    step.value = "submitting";
    errorMsg.value = "";

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propId,
          checkIn,
          checkOut,
          guestName: guestName.value.trim(),
          guestEmail: guestEmail.value.trim(),
          guestPhone: phoneRaw,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        step.value = "error";
        errorMsg.value = data.error ?? "Residency synchronization discrepancy. Please verify and retry.";
        return;
      }

      step.value = "redirecting";

      // Redirect to payment link
      if (data.paymentLink) {
        setTimeout(() => {
          globalThis.location.href = data.paymentLink;
        }, 800);
      } else {
        // No payment link returned — show error
        step.value = "error";
        errorMsg.value = "Secure protocol link not available. Please contact concierge.";
      }
    } catch {
      step.value = "error";
      errorMsg.value =
        "Synchronization node error. Please check your connectivity protocol.";
    }
  }

  // ── Submitting State ───────────────────────────────────────
  if (step.value === "submitting") {
    return (
      <div class="flex flex-col items-center justify-center py-20 gap-10 animate-fade-in">
        <div class="relative w-24 h-24 rounded-[2rem] bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10">
          <div class="absolute inset-0 rounded-[2rem] border-2 border-emerald-500/20 animate-ping" />
          <div class="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
        </div>
        <div class="text-center space-y-3">
          <p class="text-[11px] font-bold text-gray-900 uppercase tracking-[0.4em]">Initializing Residency Request...</p>
          <p class="text-xs text-gray-400 font-medium tracking-widest italic opacity-60">Synchronizing Secure Protocol</p>
        </div>
      </div>
    );
  }

  // ── Redirecting State ──────────────────────────────────────
  if (step.value === "redirecting") {
    return (
      <div class="flex flex-col items-center justify-center py-20 gap-10 animate-fade-in">
        <div class="w-24 h-24 rounded-[2.5rem] bg-emerald-500 text-white flex items-center justify-center shadow-premium-emerald animate-bounce">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20 6L9 17L4 12"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="text-center space-y-3">
          <p class="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.4em]">Residency Node Synchronized</p>
          <p class="text-xs text-gray-400 font-medium tracking-widest italic opacity-60">
            Redirecting to Secure Protocol...
          </p>
        </div>
        <div class="flex items-center gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
              style={`animation-delay: ${i * 200}ms`}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Error State ────────────────────────────────────────────
  if (step.value === "error") {
    return (
      <div class="flex flex-col items-center justify-center py-16 gap-8 text-center animate-fade-in">
        <div class="w-24 h-24 rounded-[2.5rem] bg-rose-50 border border-rose-100 flex items-center justify-center text-4xl shadow-inner">
          ⚠️
        </div>
        <div class="space-y-3">
          <p class="text-[11px] font-bold text-rose-600 uppercase tracking-[0.4em]">Synchronization Discrepancy</p>
          <p class="text-[14px] text-gray-500 leading-relaxed max-w-sm mx-auto font-medium opacity-80 italic">
            {errorMsg.value}
          </p>
        </div>
        <button
          onClick={() => {
            step.value = "details";
            errorMsg.value = "";
          }}
          class="px-10 py-5 rounded-2xl border border-gray-100 text-[10px] font-bold text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all uppercase tracking-widest active:scale-95"
        >
          ← Initialize Recovery
        </button>
      </div>
    );
  }

  // ── Details Form ───────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} class="space-y-8 animate-fade-in" novalidate>
      <div class="space-y-6">
        <FloatingInput
          id="guest-name"
          label="Residency Principal (Full Name)"
          value={guestName.value}
          onInput={(v) => (guestName.value = v)}
          autocomplete="name"
        />
        <FloatingInput
          id="guest-email"
          label="Communication Node (Email Address)"
          type="email"
          value={guestEmail.value}
          onInput={(v) => (guestEmail.value = v)}
          autocomplete="email"
        />
        <FloatingInput
          id="guest-phone"
          label="Operational Contact (WhatsApp)"
          type="tel"
          value={guestPhone.value}
          onInput={(v) => (guestPhone.value = v)}
          pattern="[6-9][0-9]{9}"
          autocomplete="tel"
        />
      </div>

      {errorMsg.value && (
        <div class="p-6 bg-rose-50 border border-rose-100 rounded-2xl animate-shake">
          <p class="text-[10px] font-bold text-rose-600 uppercase tracking-[0.3em] flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> {errorMsg.value}
          </p>
        </div>
      )}

      {/* Terms notice */}
      <div class="p-6 rounded-[2rem] bg-gray-50/50 border border-gray-100 italic">
        <p class="text-[11px] text-gray-400 font-medium leading-relaxed">
          By initializing the request, you acknowledge the{" "}
          <a
            href="/legal/terms"
            class="text-emerald-600 font-bold border-b border-emerald-100 hover:border-emerald-500 transition-all"
            target="_blank"
          >
            Operational Terms
          </a>{" "}
          and{" "}
          <a
            href="/legal/cancellation"
            class="text-emerald-600 font-bold border-b border-emerald-100 hover:border-emerald-500 transition-all"
            target="_blank"
          >
            Cancellation Protocol
          </a>. Identification authentication will be synchronized after protocol initialization.
        </p>
      </div>

      {/* Submit */}
      <button
        id="confirm-booking-btn"
        type="submit"
        class="w-full py-7 rounded-[2rem] bg-gray-900 text-white font-bold text-[11px] uppercase tracking-[0.4em] shadow-premium-lg hover:bg-emerald-600 transition-all active:scale-95 group"
      >
        <span class="flex items-center justify-center gap-4">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            class="opacity-40 group-hover:opacity-100 transition-all"
          >
            <rect
              x="3"
              y="6"
              width="18"
              height="14"
              rx="2"
              stroke="currentColor"
              stroke-width="2.5"
            />
            <path
              d="M7 6V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V6"
              stroke="currentColor"
              stroke-width="2.5"
            />
            <circle cx="12" cy="13" r="2" fill="currentColor" />
          </svg>
          Initialize Residency Request — {formatINR(amount)}
        </span>
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      ` }} />
    </form>
  );
}

