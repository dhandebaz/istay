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
      setErrorMsg("All protocols must be defined to continue.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Security protocol requires a minimum of 8 characters.");
      return;
    }

    if (!acceptTerms) {
      setErrorMsg("Please acknowledge the operational terms to proceed.");
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
        setErrorMsg(data.error || "Onboarding protocol discrepancy. Please verify and retry.");
        return;
      }

      if (typeof window !== "undefined") {
        window.location.href = "/pricing";
      }
    } catch {
      setStep("error");
      setErrorMsg("A synchronization node error occurred. Please check your connectivity.");
    }
  }

  if (step === "submitting") {
    return (
      <div class="flex flex-col items-center justify-center py-24 gap-10 animate-fade-in">
        <div class="relative w-24 h-24 rounded-[2rem] bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10">
          <div class="absolute inset-0 rounded-[2rem] border-2 border-emerald-500/20 animate-ping" />
          <div class="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
        </div>
        <div class="text-center space-y-3">
          <p class="text-[11px] font-bold text-gray-900 uppercase tracking-[0.4em]">Initializing Residency Node...</p>
          <p class="text-xs text-gray-400 font-medium tracking-widest italic opacity-60">Synchronizing Operational Dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div class="space-y-10 animate-fade-in">
      <form onSubmit={handleSubmit} class="space-y-10">
        <div class="grid grid-cols-1 gap-8">
          {/* Account Principal */}
          <div class="space-y-3">
            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] ml-1">Account Principal</label>
            <input
              type="text"
              value={name}
              onInput={(e) => setName((e.target as HTMLInputElement).value)}
              required
              placeholder="Authorized Manager"
              class="w-full px-8 py-5 rounded-2xl border border-gray-100 bg-gray-50/50 font-medium text-gray-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all placeholder:text-gray-300 text-sm"
            />
          </div>

          {/* Email Node */}
          <div class="space-y-3">
            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] ml-1">Communication Node (Email)</label>
            <input
              type="email"
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              required
              placeholder="node@istay.space"
              class="w-full px-8 py-5 rounded-2xl border border-gray-100 bg-gray-50/50 font-medium text-gray-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all placeholder:text-gray-300 text-sm"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Phone Protocol */}
            <div class="space-y-3">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] ml-1">Operational Contact (WhatsApp)</label>
              <input
                type="tel"
                value={phone}
                onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
                required
                placeholder="+91 00000 00000"
                class="w-full px-8 py-5 rounded-2xl border border-gray-100 bg-gray-50/50 font-medium text-gray-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all placeholder:text-gray-300 text-sm"
              />
            </div>

            {/* Security Protocol */}
            <div class="space-y-3">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] ml-1">Security Protocol (Password)</label>
              <input
                type="password"
                value={password}
                onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                required
                placeholder="••••••••"
                class="w-full px-8 py-5 rounded-2xl border border-gray-100 bg-gray-50/50 font-medium text-gray-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all placeholder:text-gray-300 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Operational Terms */}
        <label class="flex items-start gap-5 cursor-pointer group px-2">
          <div class="relative mt-1">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms((e.target as HTMLInputElement).checked)}
              class="peer absolute opacity-0 w-6 h-6 cursor-pointer"
            />
            <div class="w-6 h-6 border-2 border-gray-200 rounded-xl bg-white peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all flex items-center justify-center shadow-sm">
               <CheckIcon class="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
          </div>
          <p class="text-[11px] text-gray-400 font-bold leading-relaxed uppercase tracking-wider">
            I acknowledge the <a href="/terms" class="text-gray-900 border-b border-gray-200 hover:text-emerald-500 hover:border-emerald-500 transition-all">Operational Terms</a> and have reviewed the <a href="/privacy" class="text-gray-900 border-b border-gray-200 hover:text-emerald-500 hover:border-emerald-500 transition-all">Privacy Protocol</a>.
          </p>
        </label>

        {errorMsg && (
          <div class="p-6 bg-rose-50 border border-rose-100 rounded-2xl animate-shake">
            <p class="text-[10px] font-bold text-rose-600 uppercase tracking-[0.3em] flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> {errorMsg}
            </p>
          </div>
        )}

        <button
          type="submit"
          class="w-full py-6 bg-gray-900 text-white text-[11px] font-bold uppercase tracking-[0.4em] rounded-[1.8rem] shadow-premium-lg hover:bg-emerald-600 transition-all active:scale-95 group"
        >
          <span class="flex items-center justify-center gap-3">
            {step === "submitting" ? "Initializing Protocol..." : "Initialize Onboarding"}
            {step !== "submitting" && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>}
          </span>
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

