import { useSignal } from "@preact/signals";

interface ResendVerificationBtnProps {
  email: string;
  name: string;
}

export default function ResendVerificationBtn(
  { email, name }: ResendVerificationBtnProps,
) {
  const status = useSignal<"idle" | "sending" | "sent" | "error">("idle");
  const errorMsg = useSignal("");

  async function handleResend() {
    status.value = "sending";
    errorMsg.value = "";

    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      if (res.ok) {
        status.value = "sent";
        setTimeout(() => {
          if (status.value === "sent") status.value = "idle";
        }, 5000);
      } else {
        const data = await res.json();
        status.value = "error";
        errorMsg.value = data.error || "Failed to resend.";
      }
    } catch {
      status.value = "error";
      errorMsg.value = "Network error. Try again.";
    }
  }

  if (status.value === "sent") {
    return (
      <span class="text-xs font-700 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
        Email Sent! ✓
      </span>
    );
  }

  return (
    <div class="flex items-center gap-2">
      <button
        onClick={handleResend}
        disabled={status.value === "sending"}
        class="text-xs font-700 bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg shadow-sm transition-all shadow-amber-500/20 active:scale-95 disabled:opacity-50"
      >
        {status.value === "sending" ? "Sending..." : "Resend Link"}
      </button>
      {status.value === "error" && (
        <span class="text-[10px] text-rose-600 font-600">{errorMsg.value}</span>
      )}
    </div>
  );
}
