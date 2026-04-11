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
      // 1. Create order
      const res = await fetch("/api/onboard/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hostId }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to initiate payment");

      // 2. Open Razorpay Checkout
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "istay",
        description: "One-time Onboarding Fee",
        order_id: data.orderId,
        handler: async function (response: any) {
          // 3. Verify payment
          try {
            const verifyRes = await fetch("/api/onboard/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                hostId,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.ok) {
              window.location.href = "/dashboard?onboarded=true";
            } else {
              throw new Error(verifyData.error || "Verification failed");
            }
          } catch (err: any) {
            setError(err.message);
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#00E676", // Electric Mint
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        setError(response.error.description);
      });
      rzp.open();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col items-center">
      <button
        onClick={handlePay}
        disabled={loading}
        class={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-700 text-base shadow-md transition-all duration-200 ${
          loading 
          ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
          : "bg-mint-500 text-istay-900 hover:bg-mint-400 hover:shadow-lg active:scale-95"
        }`}
      >
        {loading ? (
          <>
            <svg class="animate-spin h-5 w-5 text-istay-900" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </>
        ) : (
          <>
            Start Subscription — ₹1,000
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 8H14M8 2L14 8L8 14"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </>
        )}
      </button>

      {error && (
        <p class="mt-4 text-sm text-rose-500 font-500 bg-rose-50 px-4 py-2 rounded-xl">
          Error: {error}
        </p>
      )}

      {/* Razorpay script injection */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
    </div>
  );
}
