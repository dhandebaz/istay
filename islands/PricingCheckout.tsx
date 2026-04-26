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
      if (!data.ok) throw new Error(data.error || "Initialization Protocol Discrepancy");

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "iStay",
        description: "Monthly Operational Subscription",
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
              throw new Error(verifyData.error || "Verification Protocol Discrepancy");
            }
          } catch (err: any) {
            setError(err.message);
          }
        },
        theme: { color: "#10b981" },
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
    <div class="w-full animate-fade-in">
      <button
        onClick={handlePay}
        disabled={loading}
        class={`w-full py-8 rounded-[1.8rem] border border-gray-900 font-bold text-xs uppercase tracking-[0.4em] shadow-premium-lg transition-all active:scale-95 disabled:opacity-50 group ${
          loading ? "bg-gray-100 text-gray-400 border-gray-200" : "bg-gray-900 text-white hover:bg-emerald-600 hover:border-emerald-600"
        }`}
      >
        <span class="flex items-center justify-center gap-3">
          {loading ? "Initializing Protocol..." : "Activate Operational Channel — ₹1,000"}
          {!loading && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>}
        </span>
      </button>
      {error && (
        <div class="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl animate-slide-up">
          <p class="text-[10px] font-bold text-rose-600 uppercase tracking-[0.3em] text-center">
            Protocol Discrepancy: {error}
          </p>
        </div>
      )}
    </div>
  );
}

