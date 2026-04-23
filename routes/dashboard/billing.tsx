import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getHost, listWalletTransactions } from "../../utils/db.ts";
import type { DashboardState, Host, WalletTransaction } from "../../utils/types.ts";
import BillingManager from "../../islands/BillingManager.tsx";

interface BillingData {
  host: Host;
  transactions: WalletTransaction[];
}

export const handler: Handlers<BillingData, DashboardState> = {
  GET: async (_req, ctx) => {
    const { hostId } = ctx.state as DashboardState;
    const [host, transactions] = await Promise.all([
      getHost(hostId),
      listWalletTransactions(hostId),
    ]);

    if (!host) return ctx.renderNotFound();

    return ctx.render({ host, transactions });
  },
};

export default function BillingPage({ data }: PageProps<BillingData>) {
  const { host, transactions } = data;

  const isExpired = host.subscriptionStatus === "expired" || 
    (host.subscriptionExpiresAt && new Date(host.subscriptionExpiresAt) < new Date());

  return (
    <div class="space-y-12 pb-20">
      <Head>
        <title>Billing & Wallet | istay</title>
      </Head>

      {/* Header */}
      <section class="flex flex-col lg:flex-row items-end justify-between gap-8">
        <div>
          <div class="flex items-center gap-4 mb-4">
            <div class="px-3 py-1 bg-gray-900 text-mint-400 text-[10px] font-950 uppercase tracking-[0.2em] rounded-full border-[2px] border-gray-900 shadow-[3px_3px_0px_0px_#4ade80]">
              FINANCIAL_ENGINE
            </div>
            <div class="h-[2px] w-24 bg-gray-100" />
          </div>
          <h2 class="text-4xl sm:text-7xl font-950 text-gray-900 tracking-tighter uppercase leading-[0.8]">
            Billing & <br/> <span class="text-emerald-500">Credits.</span>
          </h2>
        </div>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* ── Left Column: Status & Top-up ── */}
        <div class="lg:col-span-1 space-y-10">
          {/* Subscription Status Card */}
          <div class={`p-10 rounded-[2.5rem] border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${isExpired ? 'bg-rose-50' : 'bg-white'}`}>
            <div class="flex items-center justify-between mb-8">
              <p class="text-[10px] font-950 text-gray-400 uppercase tracking-widest">SUBSCRIPTION</p>
              <span class={`px-4 py-2 rounded-xl border-[3px] border-gray-900 text-[9px] font-950 uppercase tracking-widest ${isExpired ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'}`}>
                {isExpired ? 'EXPIRED' : 'ACTIVE_NODE'}
              </span>
            </div>
            <p class="text-5xl font-950 text-gray-900 tracking-tighter mb-4 leading-none">₹1,000<span class="text-sm font-800 text-gray-400 uppercase tracking-widest ml-2">/cycle</span></p>
            <p class="text-[10px] text-gray-500 font-950 uppercase tracking-[0.2em]">
              {host.subscriptionExpiresAt 
                ? `NEXT_RENEWAL: ${new Date(host.subscriptionExpiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }).toUpperCase()}`
                : 'SYSTEM_INACTIVE'}
            </p>
          </div>

          {/* Wallet Balance Card */}
          <div class="p-10 rounded-[2.5rem] bg-gray-900 text-white border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_#4ade80] relative overflow-hidden group">
             <div class="absolute -right-6 -top-6 text-8xl opacity-10 group-hover:scale-125 transition-transform duration-700">⚡</div>
             <p class="text-[10px] font-950 text-mint-400 uppercase tracking-[0.3em] mb-10">AI_WALLET_CORE</p>
             <p class="text-6xl font-950 tracking-tighter leading-none mb-6">₹{host.walletBalance.toFixed(0)}</p>
             <p class="text-[10px] text-gray-400 font-900 uppercase tracking-widest leading-relaxed"> FUELING_CONCIERGE | OCR_ENGINE | GUEST_INTEL</p>
          </div>

          <BillingManager hostId={host.id} currentBalance={host.walletBalance} />
        </div>

        {/* ── Right Column: Transaction History ── */}
        <div class="lg:col-span-2">
          <div class="bg-white rounded-[3rem] border-[4px] border-gray-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden h-full flex flex-col">
            <div class="px-10 py-8 border-b-[4px] border-gray-900 bg-gray-50 flex items-center justify-between">
              <h2 class="text-2xl font-950 text-gray-900 uppercase tracking-tighter">Transaction_Ledger</h2>
              <div class="px-4 py-2 bg-gray-900 text-mint-400 text-[9px] font-950 uppercase tracking-widest rounded-xl border-[2px] border-gray-900 shadow-[3px_3px_0px_0px_#4ade80]">
                AUDITED
              </div>
            </div>

            <div class="flex-1 overflow-y-auto max-h-[800px] no-scrollbar">
              {transactions.length === 0 ? (
                <div class="py-40 text-center space-y-4">
                  <p class="text-7xl">🏜️</p>
                  <p class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em]">The ledger is currently empty.</p>
                </div>
              ) : (
                <table class="w-full text-left">
                  <thead>
                    <tr class="bg-gray-50/50 border-b-[3px] border-gray-100">
                      <th class="px-10 py-6 text-[10px] uppercase tracking-[0.3em] font-950 text-gray-400">SIGNAL_DESC</th>
                      <th class="px-10 py-6 text-[10px] uppercase tracking-[0.3em] font-950 text-gray-400">TIMESTAMP</th>
                      <th class="px-10 py-6 text-[10px] uppercase tracking-[0.3em] font-950 text-gray-400 text-right">VOLUME</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y-[2px] divide-gray-100">
                    {transactions.map((tx) => (
                      <tr key={tx.id} class="group hover:bg-gray-50 transition-colors">
                        <td class="px-10 py-8">
                          <p class="text-sm font-950 text-gray-900 uppercase tracking-tighter leading-none mb-1">{tx.description}</p>
                          <p class="text-[9px] font-800 text-gray-400 uppercase tracking-widest">INTERNAL_TRANSIT</p>
                        </td>
                        <td class="px-10 py-8 text-[11px] font-950 text-gray-400 uppercase">
                          {new Date(tx.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}
                        </td>
                        <td class={`px-10 py-8 text-right text-sm font-950 tracking-tight ${tx.amount > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
