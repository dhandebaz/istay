import { useState } from "preact/hooks";
import { CheckIcon } from "../components/Icons.tsx";

export default function RegisterForm() {
  const [step, setStep] = useState<"details" | "submitting" | "error">("details");
  const [errorMsg, setErrorMsg] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [acceptTerms, setAcceptTerms] = useState(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
      setErrorMsg("All fields are required to continue.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }

    if (!acceptTerms) {
      setErrorMsg("Please accept the terms to proceed.");
      return;
    }

    setStep("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStep("error");
        setErrorMsg(data.error || "Registration failed. Please try again.");
        return;
      }

      if (typeof window !== "undefined") {
        window.location.href = "/pricing";
      }
    } catch {
      setStep("error");
      setErrorMsg("A network error occurred. Please check your connection.");
    }
  }

  if (step === "submitting") {
    return (
      <div class="flex flex-col items-center justify-center py-20 gap-8 animate-fade-in">
        <div class="relative w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center">
          <div class="absolute inset-0 rounded-3xl border-2 border-emerald-500/20 animate-ping" />
          <span class="text-3xl">✨</span>
        </div>
        <div class="text-center space-y-2">
          <p class="text-sm font-bold text-gray-900">Creating your account...</p>
          <p class="text-xs text-gray-400 font-medium tracking-wide">Setting up your hospitality dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div class="space-y-8 animate-fade-in">
      <form onSubmit={handleSubmit} class="space-y-8">
        <div class="grid grid-cols-1 gap-6">
          {/* Full Name */}
          <div class="space-y-2">
            <label class="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
            <input
              type="text"
              value={name}
              onInput={(e) => setName((e.target as HTMLInputElement).value)}
              required
              placeholder="Alex Johnson"
              class="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 font-medium text-gray-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-gray-300 text-sm"
            />
          </div>

          {/* Email */}
          <div class="space-y-2">
            <label class="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <input
              type="email"
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              required
              placeholder="alex@example.com"
              class="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 font-medium text-gray-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-gray-300 text-sm"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Phone */}
            <div class="space-y-2">
              <label class="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">WhatsApp Number</label>
              <input
                type="tel"
                value={phone}
                onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
                required
                placeholder="+91 00000 00000"
                class="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 font-medium text-gray-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-gray-300 text-sm"
              />
            </div>

            {/* Password */}
            <div class="space-y-2">
              <label class="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <input
                type="password"
                value={password}
                onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                required
                placeholder="••••••••"
                class="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 font-medium text-gray-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-gray-300 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Terms */}
        <label class="flex items-start gap-4 cursor-pointer group px-1">
          <div class="relative mt-1">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms((e.target as HTMLInputElement).checked)}
              class="peer absolute opacity-0 w-6 h-6 cursor-pointer"
            />
            <div class="w-6 h-6 border-2 border-gray-200 rounded-lg bg-white peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all flex items-center justify-center">
               <CheckIcon class="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
          </div>
          <p class="text-xs text-gray-400 font-medium leading-relaxed">
            I agree to the <a href="/terms" class="text-gray-900 font-bold hover:text-emerald-500 transition-colors">Terms of Service</a> and have read the <a href="/privacy" class="text-gray-900 font-bold hover:text-emerald-500 transition-colors">Privacy Policy</a>.
          </p>
        </label>

        {errorMsg && (
          <div class="p-4 bg-rose-50 border border-rose-100 rounded-2xl animate-shake">
            <p class="text-xs font-bold text-rose-700 flex items-center gap-2">
              <span class="text-sm">⚠️</span> {errorMsg}
            </p>
          </div>
        )}

        <button
          type="submit"
          class="w-full py-4 bg-gray-900 text-white text-sm font-bold rounded-2xl shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all active:scale-[0.98]"
        >
          {step === "submitting" ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      ` }} />
    </div>
  );
}
