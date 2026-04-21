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
    <div class="space-y-8">
      <Head>
        <title>Billing & Wallet | istay</title>
      </Head>

      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-800 text-gray-900 tracking-tight">Billing & Credits</h1>
          <p class="text-sm text-gray-400 mt-1">Manage your SaaS subscription and AI usage credits.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left Column: Status & Top-up ── */}
        <div class="lg:col-span-1 space-y-6">
          {/* Subscription Status Card */}
          <div class={`p-6 rounded-2xl border ${isExpired ? 'border-rose-200 bg-rose-50' : 'border-emerald-200 bg-emerald-50 shadow-sm'} transition-all`}>
            <div class="flex items-center justify-between mb-4">
              <p class="text-xs font-800 uppercase tracking-widest text-gray-500">Subscription</p>
              <span class={`px-2 py-0.5 rounded-full text-[10px] font-900 uppercase tracking-tighter ${isExpired ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'}`}>
                {isExpired ? 'Expired' : 'Active'}
              </span>
            </div>
            <p class="text-3xl font-900 text-gray-900 mb-1">₹1,000<span class="text-sm font-600 text-gray-400">/mo</span></p>
            <p class="text-xs text-gray-500 font-500">
              {host.subscriptionExpiresAt 
                ? `Renews on ${new Date(host.subscriptionExpiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`
                : 'No active subscription'}
            </p>
          </div>

          {/* Wallet Balance Card */}
          <div class="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm relative overflow-hidden group">
             <div class="absolute top-0 right-0 w-24 h-24 bg-mint-500/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />
             <p class="text-xs font-800 uppercase tracking-widest text-gray-400 mb-4">AI Wallet Balance</p>
             <p class="text-4xl font-900 text-istay-900 mb-2">₹{host.walletBalance.toFixed(2)}</p>
             <p class="text-xs text-gray-500 leading-relaxed"> Used for WhatsApp AI Concierge, Guest Profiling, and Image OCR.</p>
          </div>

          <BillingManager hostId={host.id} currentBalance={host.walletBalance} />
        </div>

        {/* ── Right Column: Transaction History ── */}
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div class="px-6 py-4 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
              <h2 class="text-sm font-800 text-gray-900 uppercase tracking-tight">Transaction History</h2>
              <p class="text-[10px] text-gray-400 font-600">Last 50 activities</p>
            </div>

            <div class="flex-1 overflow-y-auto max-h-[600px]">
              {transactions.length === 0 ? (
                <div class="py-20 text-center">
                  <p class="text-4xl mb-4">📜</p>
                  <p class="text-sm font-600 text-gray-400">No transactions recorded yet.</p>
                </div>
              ) : (
                <table class="w-full text-left">
                  <thead class="sticky top-0 bg-white border-b border-gray-50 z-10">
                    <tr>
                      <th class="px-6 py-3 text-[10px] uppercase tracking-widest font-800 text-gray-400">Description</th>
                      <th class="px-6 py-3 text-[10px] uppercase tracking-widest font-800 text-gray-400">Date</th>
                      <th class="px-6 py-3 text-[10px] uppercase tracking-widest font-800 text-gray-400 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-50">
                    {transactions.map((tx) => (
                      <tr key={tx.id} class="hover:bg-gray-50/50 transition-colors group">
                        <td class="px-6 py-4">
                          <p class="text-sm font-700 text-gray-800 group-hover:text-istay-900">{tx.description}</p>
                          <p class="text-[10px] text-gray-400 font-500 uppercase">{tx.type.replace('_', ' ')}</p>
                        </td>
                        <td class="px-6 py-4 text-xs text-gray-500 font-500">
                          {new Date(tx.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td class={`px-6 py-4 text-sm font-800 text-right ${tx.amount > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
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
