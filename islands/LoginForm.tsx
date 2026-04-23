import { useState } from "preact/hooks";

export default function LoginForm() {
  const [step, setStep] = useState<"details" | "submitting" | "error">("details");
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("PROTOCOL_MISSING_CREDENTIALS");
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
        setErrorMsg(data.error || "AUTHENTICATION_FAILED");
        return;
      }

      if (typeof window !== "undefined") {
        window.location.href = data.redirectUrl || "/dashboard";
      }
    } catch {
      setStep("error");
      setErrorMsg("SIGNAL_NETWORK_FAILURE");
    }
  }

  if (step === "submitting") {
    return (
      <div class="flex flex-col items-center justify-center py-20 gap-10">
        <div class="w-24 h-24 rounded-[2.5rem] bg-mint-400 border-[5px] border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center animate-pulse-brutal">
          <span class="text-4xl">⚡</span>
        </div>
        <div class="text-center">
           <p class="text-[11px] font-950 text-gray-900 uppercase tracking-[0.4em] mb-3">SYNCHRONIZING_CREDENTIALS...</p>
           <p class="text-[10px] font-800 text-gray-400 uppercase tracking-widest leading-relaxed">SECURE_HANDSHAKE_IN_PROGRESS</p>
        </div>
      </div>
    );
  }

  return (
    <div class="space-y-12">
      <form onSubmit={handleSubmit} class="space-y-10" novalidate>
        <div class="space-y-10">
          {/* Email Address */}
          <div class="space-y-4">
            <label class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em] ml-4">HOST_IDENTIFIER</label>
            <input
              type="email"
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              required
              placeholder="YOU@DOMAIN.EXT"
              class="w-full px-8 py-5 rounded-[2rem] border-[4px] border-gray-900 font-950 text-gray-900 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-mint-50 focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-200 uppercase tracking-widest text-xs"
            />
          </div>

          {/* Password */}
          <div class="space-y-4">
            <div class="flex items-center justify-between px-4">
              <label class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em]">SECURE_KEY</label>
              <a href="/forgot-password" class="text-[9px] font-950 text-mint-500 hover:text-mint-600 transition-colors uppercase tracking-widest border-b-2 border-mint-500">RECOVER_KEY</a>
            </div>
            <input
              type="password"
              value={password}
              onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
              required
              placeholder="********"
              class="w-full px-8 py-5 rounded-[2rem] border-[4px] border-gray-900 font-950 text-gray-900 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-mint-50 focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-200 uppercase tracking-widest text-xs"
            />
          </div>
        </div>

        {errorMsg && (
          <div class="p-6 bg-rose-50 border-[3px] border-rose-900 rounded-[1.5rem] shadow-[6px_6px_0px_0px_#9f1239] animate-shake">
            <p class="text-[10px] font-950 text-rose-900 uppercase tracking-[0.2em] flex items-center gap-3">
              <span class="text-lg">⚠️</span> ACCESS_DENIED: {errorMsg}
            </p>
          </div>
        )}

        <button
          type="submit"
          class="w-full py-6 bg-gray-900 text-mint-400 text-sm font-950 uppercase tracking-[0.4em] rounded-[2rem] border-[4px] border-gray-900 shadow-[10px_10px_0px_0px_#4ade80] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-[0.98]"
        >
          {step === "submitting" ? "AUTHORIZING..." : "INITIATE_SESSION"}
        </button>
      </form>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-brutal {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.05); filter: brightness(1.2); }
        }
        .animate-pulse-brutal { animation: pulse-brutal 1.5s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
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
