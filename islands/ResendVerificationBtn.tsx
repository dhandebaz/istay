import { useSignal } from "@preact/signals";

interface ResendVerificationBtnProps {
  email: string;
  name: string;
}

export default function ResendVerificationBtn({ email, name }: ResendVerificationBtnProps) {
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
        setTimeout(() => { if (status.value === "sent") status.value = "idle"; }, 5000);
      } else {
        const data = await res.json();
        status.value = "error";
        errorMsg.value = data.error || "FAILED_TO_RESEND";
      }
    } catch {
      status.value = "error";
      errorMsg.value = "PROTOCOL_NETWORK_ERROR";
    }
  }

  if (status.value === "sent") {
    return (
      <span class="px-6 py-3 bg-mint-400 border-[2px] border-gray-900 rounded-xl text-[10px] font-950 text-gray-900 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        SIGN_SENT_SUCCESS ✓
      </span>
    );
  }

  return (
    <div class="flex flex-col sm:flex-row items-center gap-4">
      <button
        onClick={handleResend}
        disabled={status.value === "sending"}
        class="px-8 py-3 bg-gray-900 text-white text-[10px] font-950 rounded-xl border-[2px] border-gray-900 shadow-[4px_4px_0px_0px_#4ade80] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all uppercase tracking-[0.2em]"
      >
        {status.value === "sending" ? "TRANSMITTING..." : "RESEND_PROTOCOL"}
      </button>
      {status.value === "error" && (
        <span class="text-[9px] text-rose-500 font-950 uppercase tracking-widest">{errorMsg.value}</span>
      )}
    </div>
  );
}
