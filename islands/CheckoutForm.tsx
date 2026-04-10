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
    <div class="relative">
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
        class="peer w-full px-4 pt-6 pb-2 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-transparent focus:border-teal-400 focus:bg-white focus:outline-none transition-all duration-200"
      />
      <label
        for={id}
        class="absolute left-4 top-2 text-xs font-600 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600 transition-all duration-200 pointer-events-none"
      >
        {label}
        {required && <span class="text-rose-400 ml-0.5">*</span>}
      </label>
    </div>
  );
}

export default function CheckoutForm(
  { propId, checkIn, checkOut, nights, amount, propertyName }: CheckoutFormProps,
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

    if (!guestName.value.trim() || !guestEmail.value.trim() || !guestPhone.value.trim()) {
      errorMsg.value = "Please fill in all required fields.";
      return;
    }

    const phoneRaw = guestPhone.value.replace(/\s/g, "");
    if (!/^[6-9]\d{9}$/.test(phoneRaw)) {
      errorMsg.value = "Please enter a valid 10-digit Indian mobile number.";
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail.value)) {
      errorMsg.value = "Please enter a valid email address.";
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
        errorMsg.value = data.error ?? "Booking failed. Please try again.";
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
        errorMsg.value = "Payment link not available. Please contact support.";
      }
    } catch {
      step.value = "error";
      errorMsg.value = "Network error. Please check your connection and try again.";
    }
  }

  // ── Submitting State ───────────────────────────────────────
  if (step.value === "submitting") {
    return (
      <div class="flex flex-col items-center justify-center py-12 gap-4">
        <div class="relative w-14 h-14">
          <div class="absolute inset-0 rounded-full border-4 border-teal-100" />
          <div class="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent animate-spin" />
        </div>
        <div class="text-center">
          <p class="text-sm font-700 text-gray-900">Creating your booking...</p>
          <p class="text-xs text-gray-400 mt-1">Setting up secure payment</p>
        </div>
      </div>
    );
  }

  // ── Redirecting State ──────────────────────────────────────
  if (step.value === "redirecting") {
    return (
      <div class="flex flex-col items-center justify-center py-12 gap-4">
        <div class="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 14L11.5 20.5L23 8"
              stroke="#10b981"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="text-center">
          <p class="text-sm font-700 text-gray-900">Booking created!</p>
          <p class="text-xs text-gray-400 mt-1">
            Redirecting to secure payment...
          </p>
        </div>
        <div class="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              class="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce"
              style={`animation-delay: ${i * 150}ms`}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Error State ────────────────────────────────────────────
  if (step.value === "error") {
    return (
      <div class="flex flex-col items-center justify-center py-8 gap-4 text-center">
        <div class="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-2xl">
          ⚠️
        </div>
        <div>
          <p class="text-sm font-700 text-gray-900 mb-1">Booking failed</p>
          <p class="text-xs text-gray-500 leading-relaxed max-w-xs">
            {errorMsg.value}
          </p>
        </div>
        <button
          onClick={() => {
            step.value = "details";
            errorMsg.value = "";
          }}
          class="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-600 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          ← Try again
        </button>
      </div>
    );
  }

  // ── Details Form ───────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} class="space-y-4" novalidate>
      <FloatingInput
        id="guest-name"
        label="Full Name"
        value={guestName.value}
        onInput={(v) => (guestName.value = v)}
        autocomplete="name"
      />
      <FloatingInput
        id="guest-email"
        label="Email Address"
        type="email"
        value={guestEmail.value}
        onInput={(v) => (guestEmail.value = v)}
        autocomplete="email"
      />
      <FloatingInput
        id="guest-phone"
        label="Mobile Number (10 digits)"
        type="tel"
        value={guestPhone.value}
        onInput={(v) => (guestPhone.value = v)}
        pattern="[6-9][0-9]{9}"
        autocomplete="tel"
      />

      {errorMsg.value && (
        <div class="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200">
          <span class="text-rose-500 text-sm mt-0.5">⚠️</span>
          <p class="text-xs text-rose-700 leading-relaxed">
            {errorMsg.value}
          </p>
        </div>
      )}

      {/* Terms notice */}
      <p class="text-xs text-gray-400 leading-relaxed">
        By clicking "Confirm Booking", you agree to our{" "}
        <a href="/legal/terms" class="text-teal-600 hover:underline" target="_blank">
          Terms
        </a>
        {" "}and{" "}
        <a href="/legal/cancellation" class="text-teal-600 hover:underline" target="_blank">
          Cancellation Policy
        </a>. Your ID may be verified after payment.
      </p>

      {/* Submit */}
      <button
        id="confirm-booking-btn"
        type="submit"
        class="w-full py-4 rounded-xl bg-teal-500 text-white font-700 text-sm shadow-sm hover:bg-teal-600 active:scale-95 transition-all duration-150 flex items-center justify-center gap-2"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <rect x="1" y="4" width="14" height="10" rx="1.5" stroke="white" stroke-width="1.25" />
          <path d="M5 4V3C5 1.89543 5.89543 1 7 1H9C10.1046 1 11 1.89543 11 3V4" stroke="white" stroke-width="1.25" />
          <circle cx="8" cy="9" r="1.5" fill="white" />
        </svg>
        Confirm Booking — {formatINR(amount)}
      </button>
    </form>
  );
}
