import { useState } from "preact/hooks";

export default function ForgotPasswordForm() {
  const [step, setStep] = useState<"details" | "submitting" | "success" | "error">("details");
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!email) {
      setErrorMsg("Email is required.");
      return;
    }

    setStep("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      setStep("success");
    } catch {
      setStep("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  if (step === "submitting") {
    return (
      <div class="flex flex-col items-center justify-center py-12 gap-8 text-center">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-2xl border-[4px] border-gray-900 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" />
          <div class="absolute inset-0 rounded-2xl border-[4px] border-mint-500 border-t-transparent animate-spin" />
        </div>
        <p class="text-[10px] font-950 text-gray-900 uppercase tracking-[0.4em] animate-pulse">REQUESTING_ACCESS_SIGNAL</p>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div class="flex flex-col items-center justify-center py-10 gap-8 text-center animate-fade-in">
        <div class="w-20 h-20 rounded-[2rem] bg-mint-400 border-[4px] border-gray-900 flex items-center justify-center text-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-bounce">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-linecap="round" stroke-linejoin="round"></path>
            <polyline points="22 4 12 14.01 9 11.01" stroke-linecap="round" stroke-linejoin="round"></polyline>
          </svg>
        </div>
        
        <div>
          <h3 class="text-2xl font-950 text-gray-900 uppercase tracking-tighter mb-4">Check_Your_Inbox</h3>
          <p class="text-[11px] text-gray-400 font-800 uppercase tracking-widest leading-relaxed">
            IF_ACCOUNT_EXISTS_FOR: {email}, A SECURE_RESET_LINK HAS BEEN DISPATCHED.
          </p>
        </div>

        {/* DEV HINT NOTE */}
        <div class="p-8 bg-mint-50 border-[3px] border-gray-900 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-sm text-left">
          <p class="text-[10px] font-950 text-gray-900 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
            <span class="text-lg">🛠️</span> DEV_NOTICE
          </p>
          <p class="text-[9px] text-mint-900/60 font-800 uppercase tracking-widest leading-relaxed">
            EMAIL_API_IDLE. CHECK TERMINAL LOGS FOR LOCAL_RESET_URL.
          </p>
        </div>

        <a
          href="/login"
          class="inline-block px-10 py-5 bg-gray-900 text-white font-950 rounded-2xl border-[3px] border-gray-900 shadow-[6px_6px_0px_0px_#4ade80] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase tracking-[0.2em] text-[10px]"
        >
          RETURN_TO_BASE_LOGIN
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} class="space-y-8" novalidate>
      <div class="space-y-3">
        <label class="block text-[10px] font-950 text-gray-400 uppercase tracking-widest ml-1">
          EMAIL_ADDRESS
        </label>
        <input
          type="email"
          value={email}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          required
          class="w-full px-6 py-4 rounded-2xl border-[4px] border-gray-900 bg-gray-50 text-gray-900 text-sm font-950 focus:bg-white focus:shadow-[6px_6px_0px_0px_#4ade80] outline-none transition-all uppercase tracking-widest"
          placeholder="USER@HOST.SIGNAL"
        />
      </div>

      {errorMsg && (
        <div class="flex items-center gap-4 p-5 rounded-2xl bg-rose-50 border-[3px] border-rose-900 shadow-[4px_4px_0px_0px_#9f1239]">
          <span class="text-xl">⚠️</span>
          <p class="text-[10px] font-950 text-rose-900 uppercase tracking-widest">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        class="w-full py-5 bg-gray-900 text-white font-950 rounded-2xl border-[4px] border-gray-900 shadow-[10px_10px_0px_0px_#4ade80] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase tracking-[0.2em] text-[10px]"
      >
        DISPATCH_RESET_LINK
      </button>

      {step === "error" && (
        <button
          type="button"
          onClick={() => {
            setStep("details");
            setErrorMsg("");
          }}
          class="w-full py-4 text-[10px] font-950 text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-[0.2em]"
        >
          ← RETRY_PROTOCOL
        </button>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      ` }} />
    </form>
  );
}
