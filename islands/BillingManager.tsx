import { useState } from "preact/hooks";

interface BillingManagerProps {
  hostId: string;
  currentBalance: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BillingManager({ hostId, currentBalance }: BillingManagerProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const TOPUP_OPTIONS = [
    { amount: 100, label: "Starter", desc: "For ~500 AI chats" },
    { amount: 500, label: "Pro", desc: "For ~2500 AI chats", popular: true },
    { amount: 1000, label: "Whale", desc: "For heavy duty usage" },
  ];

  const handlePay = async (amount: number, type: "subscription" | "wallet_topup") => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/billing/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hostId, amount, type }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to initiate payment");

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "istay",
        description: type === "subscription" ? "Monthly SaaS Subscription" : "AI Wallet Top-up",
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/billing/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                hostId,
                type,
                amount
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.ok) {
              window.location.reload();
            } else {
              throw new Error(verifyData.error || "Verification failed");
            }
          } catch (err: any) {
            setError(err.message);
          }
        },
        theme: { color: "#00E676" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response: any) => setError(response.error.description));
      rzp.open();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnableAutopay = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/billing/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hostId }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Could not setup autopay");

      // Razorpay provides a short_url for subscription auth
      if (data.short_url) {
        window.location.href = data.short_url;
      } else {
        throw new Error("No checkout URL found for subscription");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="space-y-6">
      {/* ── Low Balance Alert ── */}
      {currentBalance < 20 && (
        <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 animate-pulse">
           <div class="flex items-center gap-3">
             <span class="text-xl">⚠️</span>
             <div>
               <p class="text-xs font-900 text-amber-900 uppercase tracking-tight">Low Credits</p>
               <p class="text-[10px] text-amber-700 font-500">Your AI Concierge will stop responding soon. Top up now.</p>
             </div>
           </div>
        </div>
      )}

      {/* ── Subscriptions ── */}
      <div class="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm relative overflow-hidden">
        <div class="absolute -right-4 -top-4 w-16 h-16 bg-istay-900/5 rounded-full blur-xl" />
        <h3 class="text-sm font-800 text-gray-900 uppercase tracking-tight mb-4 flex items-center justify-between">
          SaaS Plan
          <span class="text-[10px] text-gray-400 font-500">₹1,000/mo</span>
        </h3>
        
        <div class="grid grid-cols-1 gap-2">
          <button
            onClick={() => handlePay(1000, "subscription")}
            disabled={loading}
            class={`w-full py-3 rounded-xl font-800 text-sm transition-all active:scale-95 border-2 ${
              loading ? 'bg-gray-100 text-gray-400 border-gray-100' : 'bg-white text-istay-900 border-istay-900 hover:bg-istay-50'
            }`}
          >
            Manual Renewal
          </button>
          
          <button
            onClick={handleEnableAutopay}
            disabled={loading}
            class={`w-full py-3 rounded-xl font-800 text-sm transition-all active:scale-95 shadow-md ${
              loading ? 'bg-gray-100 text-gray-400' : 'bg-istay-900 text-white hover:bg-istay-800'
            }`}
          >
            Enable Autopay ⚡️
          </button>
        </div>
        <p class="text-[10px] text-gray-400 text-center mt-3 font-500 italic">Autopay ensures zero downtime for your reservation link.</p>
      </div>

      {/* ── Top-ups ── */}
      <div class="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <h3 class="text-sm font-800 text-gray-900 uppercase tracking-tight mb-6 text-center">Add AI Credits</h3>
        <div class="grid grid-cols-1 gap-3">
          {TOPUP_OPTIONS.map((opt) => (
            <button
              key={opt.amount}
              onClick={() => handlePay(opt.amount, "wallet_topup")}
              disabled={loading}
              class={`group relative p-4 rounded-xl border-2 transition-all text-left ${
                opt.popular ? 'border-mint-500 bg-mint-50/30 shadow-sm' : 'border-gray-50 bg-gray-50/50 hover:border-gray-200'
              } active:scale-95`}
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-800 text-gray-900">₹{opt.amount}</p>
                  <p class="text-[10px] text-gray-500 font-500">{opt.desc}</p>
                </div>
                {opt.popular && (
                  <span class="text-[9px] font-900 bg-mint-500 text-istay-900 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Popular</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div class="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-600 text-center shadow-sm">
          {error}
        </div>
      )}

      {/* Razorpay script injection */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
    </div>
  );
}
