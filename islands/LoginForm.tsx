import { useState } from "preact/hooks";

export default function LoginForm() {
  const [step, setStep] = useState<"details" | "submitting" | "error">("details");
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("Please enter your email and password.");
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
        setErrorMsg(data.error || "Invalid email or password. Please try again.");
        return;
      }

      if (typeof window !== "undefined") {
        window.location.href = data.redirectUrl || "/dashboard";
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
           <p class="text-sm font-bold text-gray-900">Signing you in...</p>
           <p class="text-xs text-gray-400 font-medium tracking-wide">Securely authenticating your session</p>
        </div>
      </div>
    );
  }

  return (
    <div class="space-y-8 animate-fade-in">
      <form onSubmit={handleSubmit} class="space-y-6">
        <div class="space-y-5">
          {/* Email Address */}
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

          {/* Password */}
          <div class="space-y-2">
            <div class="flex items-center justify-between px-1">
              <label class="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
              <a href="/forgot-password" class="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-widest">Forgot password?</a>
            </div>
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
          {step === "submitting" ? "Signing in..." : "Sign In"}
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
