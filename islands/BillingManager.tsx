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
    { amount: 100, label: "STARTER_NODE", desc: "For ~500 AI chats" },
    { amount: 500, label: "PRO_ENGINE", desc: "For ~2500 AI chats", popular: true },
    { amount: 1000, label: "ELITE_WHALE", desc: "For heavy duty usage" },
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
      if (!data.ok) throw new Error(data.error || "GATEWAY_INIT_FAILURE");

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "iStay_OS",
        description: type === "subscription" ? "KERNEL_ACCESS_RENEWAL" : "AI_WALLET_FUELING",
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
              throw new Error(verifyData.error || "VERIFICATION_SIG_ERROR");
            }
          } catch (err: any) {
            setError(err.message);
          }
        },
        theme: { color: "#00E676" },
      };

      if (typeof window !== "undefined" && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (response: any) => setError(response.error.description));
        rzp.open();
      } else {
        throw new Error("GATEWAY_NOT_LOADED_ERR");
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
      if (!data.ok) throw new Error(data.error || "AUTOPAY_LINK_FAILURE");

      if (data.short_url) {
        if (typeof window !== "undefined") {
          window.location.href = data.short_url;
        }
      } else {
        throw new Error("REDIRECT_URL_MISSING");
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
        <div class="p-8 bg-rose-50 border-[4px] border-gray-900 rounded-[2rem] shadow-[10px_10px_0px_0px_#9f1239] animate-pulse">
           <div class="flex items-center gap-6">
             <span class="text-4xl">⚠️</span>
             <div>
               <p class="text-xs font-950 text-rose-900 uppercase tracking-[0.2em] mb-1">CRITICAL_FUEL_LEVEL</p>
               <p class="text-[10px] text-rose-700/60 font-800 uppercase tracking-widest leading-relaxed">AI_CONCIERGE WILL STOP RESPONDING SOON. INITIATE_TOPUP IMMEDIATELY.</p>
             </div>
           </div>
        </div>
      )}

      {/* Top-up Selection */}
      <div class="space-y-8">
        <div class="flex items-center gap-4">
           <p class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.4em] whitespace-nowrap">RECHARGE_CORE</p>
           <div class="h-[2px] flex-1 bg-gray-100" />
        </div>
        
        <div class="grid grid-cols-1 gap-6">
          {TOPUP_OPTIONS.map((opt) => (
            <button
              key={opt.amount}
              onClick={() => handlePay(opt.amount, "wallet_topup")}
              disabled={loading}
              class="group relative flex items-center justify-between p-8 bg-white border-[4px] border-gray-900 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:bg-mint-400 transition-all disabled:opacity-50 disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none"
            >
              <div class="text-left">
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-xs font-950 text-gray-900 uppercase tracking-tighter">{opt.label}</span>
                  {opt.popular && (
                    <span class="px-3 py-1 bg-gray-900 text-white text-[8px] font-950 rounded-lg uppercase tracking-widest shadow-[2px_2px_0px_0px_#4ade80]">MAX_ROI</span>
                  )}
                </div>
                <p class="text-[9px] font-800 text-gray-400 group-hover:text-gray-900 uppercase tracking-widest">{opt.desc}</p>
              </div>
              <div class="text-right">
                <p class="text-3xl font-950 text-gray-900 tracking-tighter leading-none">₹{opt.amount}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Autopay Setup */}
      <div class="pt-10 border-t-[4px] border-gray-50 space-y-6">
        <button
          onClick={handleEnableAutopay}
          disabled={loading}
          class="w-full py-7 rounded-[2.5rem] bg-gray-900 text-white border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_#4ade80] hover:bg-mint-400 hover:text-gray-900 transition-all flex flex-col items-center justify-center gap-3 disabled:opacity-50 group"
        >
          {loading ? (
            <div class="w-8 h-8 border-[5px] border-mint-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <div class="flex items-center gap-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text-sm font-950 uppercase tracking-[0.4em]">ENABLE_SECURE_AUTOPAY</span>
              </div>
              <p class="text-[9px] font-950 text-mint-400 group-hover:text-gray-900/50 uppercase tracking-[0.2em] transition-colors">ZERO_DOWNTIME_PROTOCOL</p>
            </>
          )}
        </button>

        <p class="text-[9px] text-center text-gray-400 font-950 uppercase tracking-[0.2em] leading-relaxed">
          PAYMENTS_SECURED_BY_RAZORPAY_L4 <br/> 
          <span class="text-gray-200">END_TO_END_ENCRYPTED_SIGNAL_FLOW</span>
        </p>
      </div>

      {error && (
        <div class="p-6 bg-rose-50 border-[3px] border-rose-900 rounded-[1.5rem] shadow-[6px_6px_0px_0px_#9f1239] animate-shake">
          <p class="text-[10px] font-950 text-rose-900 uppercase tracking-widest flex items-center gap-4">
            <span class="text-xl">⚠️</span> KERNEL_ERROR: {error}
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
