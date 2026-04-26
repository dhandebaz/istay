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
    { amount: 100, label: "Starter Pack", desc: "Estimated ~500 AI chats" },
    { amount: 500, label: "Recommended", desc: "Estimated ~2500 AI chats", popular: true },
    { amount: 1000, label: "Power User", desc: "Heavy duty AI usage" },
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
      if (!data.ok) throw new Error(data.error || "Failed to initialize payment.");

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "iStay Platform",
        description: type === "subscription" ? "Subscription Renewal" : "Credits Recharge",
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
              if (typeof window !== "undefined") {
                window.location.reload();
              }
            } else {
              throw new Error(verifyData.error || "Payment verification failed.");
            }
          } catch (err: any) {
            setError(err.message);
          }
        },
        theme: { color: "#10b981" },
      };

      if (typeof window !== "undefined" && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (response: any) => setError(response.error.description));
        rzp.open();
      } else {
        throw new Error("Payment gateway failed to load. Please refresh.");
      }
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
      if (!data.ok) throw new Error(data.error || "Failed to set up autopay.");

      if (data.short_url) {
        if (typeof window !== "undefined") {
          window.location.href = data.short_url;
        }
      } else {
        throw new Error("Redirect failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="space-y-10">
      {/* ── Low Balance Alert ── */}
      {currentBalance < 20 && (
        <div class="p-8 bg-rose-50 border border-rose-100 rounded-[2rem] shadow-premium animate-pulse">
           <div class="flex items-center gap-6">
             <span class="text-4xl">⚠️</span>
             <div>
               <p class="text-sm font-bold text-rose-900 tracking-tight mb-1">Low Balance Alert</p>
               <p class="text-xs font-medium text-rose-700/70 leading-relaxed">
                 Your AI Concierge will stop responding soon. Please top up your credits to avoid service interruption.
               </p>
             </div>
           </div>
        </div>
      )}

      {/* Top-up Selection */}
      <div class="space-y-8">
        <div class="flex items-center gap-4">
           <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Recharge Credits</p>
           <div class="h-px flex-1 bg-gray-100" />
        </div>
        
        <div class="grid grid-cols-1 gap-6">
          {TOPUP_OPTIONS.map((opt) => (
            <button
              key={opt.amount}
              onClick={() => handlePay(opt.amount, "wallet_topup")}
              disabled={loading}
              class="group relative flex items-center justify-between p-8 bg-white border border-gray-100 rounded-[2rem] shadow-premium hover:shadow-premium-hover hover:-translate-y-1 hover:bg-emerald-50/30 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
            >
              <div class="text-left">
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-sm font-bold text-gray-900 tracking-tight">{opt.label}</span>
                  {opt.popular && (
                    <span class="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-lg uppercase tracking-widest shadow-sm">Popular</span>
                  )}
                </div>
                <p class="text-[11px] font-medium text-gray-400 group-hover:text-gray-600 tracking-wide transition-colors">{opt.desc}</p>
              </div>
              <div class="text-right">
                <p class="text-3xl font-bold text-gray-900 tracking-tight leading-none">₹{opt.amount}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Autopay Setup */}
      <div class="pt-10 border-t border-gray-100 space-y-6">
        <button
          onClick={handleEnableAutopay}
          disabled={loading}
          class="w-full py-6 rounded-[2.5rem] bg-gray-900 text-white shadow-premium hover:bg-emerald-500 transition-all flex flex-col items-center justify-center gap-2.5 disabled:opacity-50 group"
        >
          {loading ? (
            <div class="w-7 h-7 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <div class="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text-base font-bold tracking-tight">Enable Autopay</span>
              </div>
              <p class="text-[10px] font-bold text-emerald-400 group-hover:text-white uppercase tracking-widest transition-colors">Automatic Renewals</p>
            </>
          )}
        </button>

        <p class="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
          Payments secured by Razorpay <br/> 
          <span class="opacity-50">PCI-DSS Compliant & Encrypted</span>
        </p>
      </div>

      {error && (
        <div class="p-6 bg-rose-50 border border-rose-100 rounded-[1.5rem] shadow-premium animate-shake">
          <p class="text-[11px] font-bold text-rose-900 flex items-center gap-4">
            <span class="text-xl">⚠️</span> Error: {error}
          </p>
        </div>
      )}

      {/* Razorpay script injection */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

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
