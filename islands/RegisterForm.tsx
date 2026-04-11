import { useSignal } from "@preact/signals";

export default function RegisterForm() {
  const step = useSignal<"details" | "submitting" | "error">("details");
  const errorMsg = useSignal("");

  const name = useSignal("");
  const email = useSignal("");
  const phone = useSignal("");
  const password = useSignal("");

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
      globalThis.location.href = "/pricing";
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
        <p class="text-sm font-700 text-gray-900">Creating your account...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} class="space-y-5" novalidate>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="block text-xs font-700 text-gray-700 mb-1.5 ml-1">Full Name</label>
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
          <label class="block text-xs font-700 text-gray-700 mb-1.5 ml-1">Mobile Number</label>
          <input
            type="tel"
            value={phone.value}
            onInput={(e) => (phone.value = (e.target as HTMLInputElement).value)}
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-mint-400 focus:outline-none transition-all duration-200"
            placeholder="9876543210"
          />
        </div>
      </div>

      <div>
        <label class="block text-xs font-700 text-gray-700 mb-1.5 ml-1">Email Address</label>
        <input
          type="email"
          value={email.value}
          onInput={(e) => (email.value = (e.target as HTMLInputElement).value)}
          required
          class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-mint-400 focus:outline-none transition-all duration-200"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label class="block text-xs font-700 text-gray-700 mb-1.5 ml-1">Password</label>
        <input
          type="password"
          value={password.value}
          onInput={(e) => (password.value = (e.target as HTMLInputElement).value)}
          required
          minlength={8}
          class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-mint-400 focus:outline-none transition-all duration-200"
          placeholder="••••••••"
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
  );
}
