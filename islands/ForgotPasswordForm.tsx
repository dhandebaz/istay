import { useSignal } from "@preact/signals";

export default function ForgotPasswordForm() {
  const step = useSignal<"details" | "submitting" | "success" | "error">(
    "details",
  );
  const errorMsg = useSignal("");
  const email = useSignal("");

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!email.value) {
      errorMsg.value = "Email is required.";
      return;
    }

    step.value = "submitting";
    errorMsg.value = "";

    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.value }),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      step.value = "success";
    } catch {
      step.value = "error";
      errorMsg.value = "Network error. Please try again.";
    }
  }

  if (step.value === "submitting") {
    return (
      <div class="flex flex-col items-center justify-center py-12 gap-4">
        <div class="relative w-14 h-14">
          <div class="absolute inset-0 rounded-full border-4 border-gray-100" />
          <div class="absolute inset-0 rounded-full border-4 border-mint-500 border-t-transparent animate-spin" />
        </div>
        <p class="text-sm font-700 text-gray-900">Requesting reset link...</p>
      </div>
    );
  }

  if (step.value === "success") {
    return (
      <div class="flex flex-col items-center justify-center py-6 gap-4 text-center">
        <div class="w-16 h-16 rounded-full bg-mint-50 flex items-center justify-center text-mint-500 mb-2 border border-mint-100">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h3 class="text-lg font-900 text-gray-900">Check Your Email</h3>
        <p class="text-sm text-gray-500">
          If an account exists for{" "}
          {email.value}, we have sent a secure password reset link.
        </p>

        {/* DEV HINT NOTE */}
        <div class="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl max-w-sm text-left">
          <p class="text-xs font-700 text-blue-700 mb-1">Developer Notice</p>
          <p class="text-[10px] text-blue-600">
            Since no email API is configured yet, check the terminal/console to
            click the local generated reset link!
          </p>
        </div>

        <a
          href="/login"
          class="mt-6 text-sm font-700 text-mint-600 hover:text-mint-500"
        >
          Return to Login
        </a>
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
          value={email.value}
          onInput={(e) => (email.value = (e.target as HTMLInputElement).value)}
          required
          class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-mint-400 focus:outline-none transition-all duration-200"
          placeholder="john@example.com"
        />
      </div>

      {errorMsg.value && (
        <div class="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200">
          <span class="text-rose-500 text-sm">⚠️</span>
          <p class="text-xs font-600 text-rose-700">{errorMsg.value}</p>
        </div>
      )}

      <button
        type="submit"
        class="w-full mt-4 py-3.5 rounded-xl bg-gray-900 text-white font-900 text-sm shadow-sm hover:bg-gray-800 active:scale-95 transition-all duration-150"
      >
        Send Reset Link
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
  );
}
