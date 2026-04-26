import { useState } from "preact/hooks";

export default function LoginForm() {
  const [step, setStep] = useState<"details" | "submitting" | "error">("details");
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("Please provide your communication node and security protocol.");
      return;
    }

    setStep("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStep("error");
        setErrorMsg(data.error || "Authentication protocol discrepancy. Please verify credentials.");
        return;
      }

      if (typeof window !== "undefined") {
        window.location.href = data.redirectUrl || "/dashboard";
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
           <p class="text-[11px] font-bold text-gray-900 uppercase tracking-[0.4em]">Authenticating Residency Node...</p>
           <p class="text-xs text-gray-400 font-medium tracking-widest italic opacity-60">Synchronizing Secure Protocol</p>
        </div>
      </div>
    );
  }

  return (
    <div class="space-y-10 animate-fade-in">
      <form onSubmit={handleSubmit} class="space-y-8">
        <div class="space-y-8">
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

          {/* Security Protocol */}
          <div class="space-y-3">
            <div class="flex items-center justify-between px-1">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">Security Protocol (Password)</label>
              <a href="/forgot-password" class="text-[9px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-[0.2em] italic">Protocol Recovery?</a>
            </div>
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
            {step === "submitting" ? "Initializing Protocol..." : "Credential Entry"}
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

