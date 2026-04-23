import { useState } from "preact/hooks";

interface PricingCheckoutProps {
  hostId: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PricingCheckout({ hostId }: PricingCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/onboard/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hostId }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "INITIALIZE_PROTOCOL_FAILURE");

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "istay",
        description: "Monthly_SaaS_Kernel_Subscription",
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/onboard/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...response, hostId }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.ok) {
              window.location.href = "/dashboard?onboarded=true";
            } else {
              throw new Error(verifyData.error || "VERIFICATION_FAILURE");
            }
          } catch (err: any) {
            setError(err.message);
          }
        },
        theme: { color: "#4ade80" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (res: any) => setError(res.error.description));
      rzp.open();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="w-full">
      <button
        onClick={handlePay}
        disabled={loading}
        class={`w-full py-6 rounded-2xl border-[4px] border-gray-900 font-950 text-xs uppercase tracking-[0.2em] shadow-[8px_8px_0px_0px_#4ade80] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 ${
          loading ? "bg-gray-100 text-gray-400" : "bg-mint-400 text-gray-900"
        }`}
      >
        {loading ? "INITIALIZING_PROTOCOL..." : "ACTIVATE_HOST_CHANNEL — ₹1,000"}
      </button>
      {error && (
        <p class="mt-4 text-[10px] font-950 text-rose-500 uppercase tracking-widest text-center">
          PROTOCOL_ERROR: {error}
        </p>
      )}
    </div>
  );
}
