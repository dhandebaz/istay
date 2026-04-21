import { useSignal } from "@preact/signals";
import { CheckIcon } from "../components/Icons.tsx";

export default function RegisterForm() {
  const step = useSignal<"details" | "submitting" | "error">("details");
  const errorMsg = useSignal("");

  const name = useSignal("");
  const email = useSignal("");
  const phone = useSignal("");
  const password = useSignal("");

  const isEmailValid = (e: string) => /^\S+@\S+\.\S+$/.test(e);
  const passwordStrength = (pass: string) => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length > 7) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    return Math.min(strength, 4);
  };

  const strength = passwordStrength(password.value);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["bg-gray-200", "bg-rose-500", "bg-amber-400", "bg-mint-500", "bg-emerald-500"][strength];

  const acceptTerms = useSignal(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!name.value || !email.value || !phone.value || !password.value) {
      errorMsg.value = "All fields are required.";
      return;
    }

    if (password.value.length < 8) {
      errorMsg.value = "Password must be at least 8 characters.";
      return;
    }

    if (!acceptTerms.value) {
      errorMsg.value = "Please accept the Terms and Privacy Policy.";
      return;
    }

    step.value = "submitting";
    errorMsg.value = "";

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          phone: phone.value,
          password: password.value,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        step.value = "error";
        errorMsg.value = data.error || "Failed to create account.";
        return;
      }

      // Automatically redirect to the next step of onboarding (payment setup API)
      if (typeof globalThis.location !== "undefined") {
        globalThis.location.href = "/pricing";
      }
    } catch {
      step.value = "error";
      errorMsg.value = "Network error. Please try again.";
    }
  }

  if (step.value === "submitting") {
    return (
      <div class="flex flex-col items-center justify-center py-20 gap-6">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full border-4 border-gray-100" />
          <div class="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent animate-spin" />
        </div>
        <div class="text-center">
          <p class="text-lg font-900 text-gray-900">Setting up your channel...</p>
          <p class="text-sm font-500 text-gray-500 mt-1">Bringing your properties to life.</p>
        </div>
      </div>
    );
  }

  return (
    <div class="space-y-8">
      {/* ── Step Indicator ─────────────────────────────────────── */}
      <div class="flex items-center justify-between max-w-xs mx-auto mb-8">
        {[
          { icon: "👤", label: "Details", active: true },
          { icon: "💳", label: "Pay", active: false },
          { icon: "🏘️", label: "Start", active: false }
        ].map((s, i) => (
          <div key={i} class="flex flex-col items-center gap-2">
            <div class={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm transition-all ${
              s.active ? "bg-teal-600 text-white shadow-teal-100 rotate-3" : "bg-gray-50 text-gray-400 grayscale opacity-50"
            }`}>
              {s.icon}
            </div>
            <span class={`text-[10px] font-900 uppercase tracking-widest ${
              s.active ? "text-teal-700" : "text-gray-400"
            }`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} class="space-y-5" novalidate>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="block text-xs font-700 text-gray-700 mb-1.5 ml-1">
            Full Name
          </label>
          <input
            type="text"
            value={name.value}
            onInput={(e) => (name.value = (e.target as HTMLInputElement).value)}
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-mint-400 focus:outline-none transition-all duration-200"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label class="block text-xs font-700 text-gray-700 mb-1.5 ml-1">
            Mobile Number
          </label>
          <input
            type="tel"
            value={phone.value}
            onInput={(
              e,
            ) => (phone.value = (e.target as HTMLInputElement).value)}
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-mint-400 focus:outline-none transition-all duration-200"
            placeholder="9876543210"
          />
        </div>
      </div>

      <div>
        <label class="block text-xs font-700 text-gray-700 mb-1.5 ml-1">
          Email Address
        </label>
        <div class="relative">
          <input
            type="email"
            value={email.value}
            onInput={(e) => (email.value = (e.target as HTMLInputElement).value)}
            required
            class={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 text-sm focus:bg-white focus:outline-none transition-all duration-200 ${
              email.value && !isEmailValid(email.value)
                ? "border-rose-400 focus:border-rose-500"
                : "border-gray-200 focus:border-mint-400"
            }`}
            placeholder="john@example.com"
          />
          {email.value && isEmailValid(email.value) && (
            <div class="absolute right-4 top-1/2 -translate-y-1/2 text-mint-500">
              <CheckIcon class="w-4 h-4" strokeWidth="3" />
            </div>
          )}
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between mb-1.5 mx-1">
          <label class="block text-xs font-700 text-gray-700">
            Password
          </label>
          {password.value && (
            <span class={`text-[10px] font-800 uppercase tracking-widest ${
              strength <= 1 ? "text-rose-500" : strength === 2 ? "text-amber-500" : "text-mint-600"
            }`}>
              {strengthLabel}
            </span>
          )}
        </div>
        <input
          type="password"
          value={password.value}
          onInput={(
            e,
          ) => (password.value = (e.target as HTMLInputElement).value)}
          required
          minlength={8}
          class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-mint-400 focus:outline-none transition-all duration-200"
          placeholder="••••••••"
        />
        {/* Strength Progress */}
        <div class="flex gap-1 mt-2 mx-1">
          {[1, 2, 3, 4].map((level) => (
            <div 
              key={level} 
              class={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                password.value && strength >= level ? strengthColor : "bg-gray-200"
              }`} 
            />
          ))}
        </div>
      </div>

      {/* Consent Checkbox */}
      <div class="flex items-start gap-3 px-1 mt-6">
        <label class="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={acceptTerms.value}
            onChange={(e) => (acceptTerms.value = (e.target as HTMLInputElement).checked)}
            class="peer sr-only"
          />
          <div class="w-5 h-5 border-2 border-gray-200 rounded-lg bg-gray-50 peer-checked:bg-mint-500 peer-checked:border-mint-500 transition-all duration-200" />
          <div class="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none">
            <CheckIcon class="w-3.5 h-3.5" strokeWidth="3" />
          </div>
        </label>
        <span class="text-xs text-gray-500 font-500 leading-tight">
          By continuing, you agree to istay's{" "}
          <a href="/legal/terms" class="text-mint-600 font-700 hover:text-mint-700 underline decoration-mint-100">Terms of Service</a>
          {" "}and{" "}
          <a href="/legal/privacy" class="text-mint-600 font-700 hover:text-mint-700 underline decoration-mint-100">Privacy Policy</a>.
        </span>
      </div>

      {errorMsg.value && (
        <div class="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200">
          <span class="text-rose-500 text-sm">⚠️</span>
          <p class="text-xs font-600 text-rose-700">{errorMsg.value}</p>
        </div>
      )}

      <button
        type="submit"
        class="w-full mt-4 py-3.5 rounded-xl bg-mint-500 text-istay-900 font-900 text-sm shadow-sm hover:bg-mint-400 active:scale-95 transition-all duration-150"
      >
        Continue to Setup
      </button>

      {step.value === "error" && (
        <button
          type="button"
          onClick={() => {
            step.value = "details";
            errorMsg.value = "";
          }}
          class="w-full mt-2 py-2 text-xs font-600 text-gray-500 hover:text-gray-700 transition-colors"
        >
          ← Try again
        </button>
      )}
      </form>
    </div>
  );
}
