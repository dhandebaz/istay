import { useState } from "preact/hooks";

export default function LoginForm() {
  const [step, setStep] = useState<"details" | "submitting" | "error">("details");
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("All fields are required.");
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
        setErrorMsg(data.error || "Login failed.");
        return;
      }

      // Backend tells us where to route (dashboard if paid, pricing if not)
      if (typeof window !== "undefined") {
        window.location.href = data.redirectUrl || "/dashboard";
      }
    } catch {
      setStep("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  if (step === "submitting") {
    return (
      <div class="flex flex-col items-center justify-center py-12 gap-4">
        <div class="relative w-14 h-14">
          <div class="absolute inset-0 rounded-full border-4 border-gray-100" />
          <div class="absolute inset-0 rounded-full border-4 border-mint-500 border-t-transparent animate-spin" />
        </div>
        <p class="text-sm font-700 text-gray-900">Signing in...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} class="space-y-5" novalidate>
      <div>
        <label class="block text-xs font-700 text-gray-700 mb-1.5 ml-1">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          required
          class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-mint-400 focus:outline-none transition-all duration-200"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <div class="flex items-center justify-between mb-1.5 px-1">
          <label class="text-xs font-700 text-gray-700">Password</label>
          <a
            href="/forgot-password"
            class="text-xs font-600 text-mint-600 hover:text-mint-500 transition-colors"
          >
            Forgot?
          </a>
        </div>
        <input
          type="password"
          value={password}
          onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
          required
          class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-mint-400 focus:outline-none transition-all duration-200"
          placeholder="••••••••"
        />
      </div>

      {errorMsg && (
        <div class="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200">
          <span class="text-rose-500 text-sm">⚠️</span>
          <p class="text-xs font-600 text-rose-700">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        class="w-full mt-4 py-3.5 rounded-xl bg-mint-500 text-istay-900 font-900 text-sm shadow-sm hover:bg-mint-400 active:scale-95 transition-all duration-150"
      >
        Sign in
      </button>

      {step === "error" && (
        <button
          type="button"
          onClick={() => {
            setStep("details");
            setErrorMsg("");
          }}
          class="w-full mt-2 py-2 text-xs font-600 text-gray-500 hover:text-gray-700 transition-colors"
        >
          ← Try again
        </button>
      )}
    </form>
  );
}
