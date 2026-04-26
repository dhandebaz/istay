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
        <title>Billing & Credits | iStay</title>
      </Head>

      {/* Header */}
      <section class="flex flex-col lg:flex-row items-end justify-between gap-8">
        <div>
          <div class="flex items-center gap-4 mb-6">
            <span class="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-widest rounded-full border border-emerald-100">Billing & Wallet</span>
            <div class="h-px w-24 bg-gray-100" />
          </div>
          <h2 class="text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Subscription & <br/> <span class="text-emerald-500 font-serif italic">Credits.</span>
          </h2>
        </div>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left Column: Status & Top-up ── */}
        <div class="lg:col-span-1 space-y-8">
          {/* Subscription Status Card */}
          <div class={`p-10 rounded-[2.5rem] border border-gray-100 shadow-premium ${isExpired ? 'bg-rose-50 border-rose-100' : 'bg-white'}`}>
            <div class="flex items-center justify-between mb-8">
              <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Subscription</p>
              <span class={`px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest ${isExpired ? 'bg-rose-500 text-white border-rose-600' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                {isExpired ? 'Expired' : 'Active'}
              </span>
            </div>
            <p class="text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-none">₹1,000<span class="text-sm font-medium text-gray-400 ml-2">/month</span></p>
            <p class="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
              {host.subscriptionExpiresAt 
                ? `Next renewal: ${new Date(host.subscriptionExpiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`
                : 'Inactive'}
            </p>
          </div>

          {/* Wallet Balance Card */}
          <div class="p-10 rounded-[2.5rem] bg-gray-900 text-white border border-gray-900 shadow-premium-lg relative overflow-hidden group">
             <div class="absolute -right-6 -top-6 text-8xl opacity-10 group-hover:scale-125 transition-transform duration-700">⚡</div>
             <p class="text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-10">Credits Balance</p>
             <p class="text-6xl font-bold tracking-tight leading-none mb-6">₹{host.walletBalance.toFixed(0)}</p>
             <p class="text-[10px] text-gray-400 font-medium uppercase tracking-widest leading-relaxed"> Used for AI Concierge, Knowledge Hub & Guest Insights</p>
          </div>

          <BillingManager hostId={host.id} currentBalance={host.walletBalance} />
        </div>

        {/* ── Right Column: Transaction History ── */}
        <div class="lg:col-span-2">
          <div class="bg-white rounded-[3rem] border border-gray-100 shadow-premium overflow-hidden h-full flex flex-col">
            <div class="px-10 py-8 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Transaction History</h2>
              <div class="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-emerald-100">
                Verified
              </div>
            </div>

            <div class="flex-1 overflow-y-auto max-h-[800px] no-scrollbar">
              {transactions.length === 0 ? (
                <div class="py-40 text-center space-y-4">
                  <p class="text-7xl">🏜️</p>
                  <p class="text-sm font-medium text-gray-400">No transactions found yet.</p>
                </div>
              ) : (
                <table class="w-full text-left">
                  <thead>
                    <tr class="bg-gray-50/30 border-b border-gray-100">
                      <th class="px-10 py-6 text-[11px] uppercase tracking-widest font-bold text-gray-400">Description</th>
                      <th class="px-10 py-6 text-[11px] uppercase tracking-widest font-bold text-gray-400">Date</th>
                      <th class="px-10 py-6 text-[11px] uppercase tracking-widest font-bold text-gray-400 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    {transactions.map((tx) => (
                      <tr key={tx.id} class="group hover:bg-emerald-50/30 transition-colors">
                        <td class="px-10 py-8">
                          <p class="text-sm font-bold text-gray-900 tracking-tight mb-1">{tx.description}</p>
                          <p class="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Platform Transaction</p>
                        </td>
                        <td class="px-10 py-8 text-xs font-bold text-gray-400 uppercase">
                          {new Date(tx.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td class={`px-10 py-8 text-right text-sm font-bold tracking-tight ${tx.amount > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
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
