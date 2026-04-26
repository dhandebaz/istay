import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getKnowledge, listProperties } from "../../utils/db.ts";
import type {
  DashboardState,
  Property,
} from "../../utils/types.ts";
import KnowledgeEditor from "../../islands/KnowledgeEditor.tsx";

interface KnowledgePageData {
  hostId: string;
  hostName: string;
  properties: Property[];
  knowledgeMap: Record<string, string>; // propId → content
}

export const handler: Handlers<KnowledgePageData, DashboardState> = {
  GET: async (_req, ctx) => {
    const state = ctx.state as DashboardState;
    const { hostId, hostName } = state;

    const properties = await listProperties(hostId);

    // Load existing knowledge for all properties
    const knowledgeMap: Record<string, string> = {};
    await Promise.all(
      properties.map(async (prop) => {
        const kb = await getKnowledge(prop.id);

        if (kb?.content) {
          knowledgeMap[prop.id] = kb.content;
        }
      }),
    );

    return ctx.render({ hostId, hostName, properties, knowledgeMap });
  },
};

export default function KnowledgePage(
  { data }: PageProps<KnowledgePageData>,
) {
  const { hostId, properties, knowledgeMap } = data;

  return (
    <>
      <Head>
        <title>Knowledge Hub | iStay</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div class="space-y-12 pb-20">
        {/* Page Header */}
        <section class="flex flex-col lg:flex-row items-end justify-between gap-8">
          <div>
            <div class="flex items-center gap-4 mb-6">
              <span class="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-widest rounded-full border border-emerald-100">AI Brain</span>
              <div class="h-px w-24 bg-gray-100" />
            </div>
            <h2 class="text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Knowledge <br/> <span class="text-emerald-500 font-serif italic">Hub.</span>
            </h2>
          </div>
          <div class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-premium flex items-center gap-8 group hover:shadow-premium-hover hover:-translate-y-1 transition-all">
            <div>
              <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Bot Accuracy</p>
              <p class="text-4xl font-bold text-gray-900 tracking-tight">100%</p>
            </div>
            <div class="w-16 h-16 rounded-[1.5rem] bg-purple-50 border border-purple-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              🧠
            </div>
          </div>
        </section>

        {/* Info Banner */}
        <div class="p-10 bg-purple-50/50 rounded-[2.5rem] border border-purple-100 shadow-premium">
          <div class="flex items-start gap-6">
            <span class="text-4xl bg-white p-3 rounded-2xl shadow-sm">🤖</span>
            <div class="space-y-3">
              <h3 class="text-sm font-bold text-gray-900 uppercase tracking-widest">How it works</h3>
              <p class="text-sm text-purple-900/70 font-medium leading-relaxed max-w-2xl">
                Write your property details below — WiFi passwords, check-in
                instructions, house rules, nearby restaurants, caretaker number.
                Your guests will see a chat bubble on the booking page and can ask
                questions 24/7. The AI will <strong class="text-purple-600">only</strong> use the info you provide. No hallucinations.
              </p>
            </div>
          </div>
        </div>

        {/* No properties state */}
        {properties.length === 0 && (
          <div class="bg-white border border-gray-100 shadow-premium p-32 flex flex-col items-center justify-center text-center rounded-[3rem]">
            <span class="text-8xl mb-8">🏠</span>
            <h3 class="text-2xl font-bold text-gray-900 tracking-tight">No properties yet</h3>
            <p class="text-sm font-medium text-gray-400 mt-4 mb-10 max-w-xs mx-auto">Once you add a property, you can train your AI concierge here.</p>
            <a
              href="/dashboard/properties"
              class="px-10 py-5 bg-gray-900 text-white text-sm font-bold rounded-2xl shadow-premium hover:bg-emerald-500 transition-all"
            >
              Go to Properties
            </a>
          </div>
        )}

        {/* Property Editors */}
        <div class="space-y-12">
          {properties.map((prop) => (
            <div
              key={prop.id}
              class="bg-white rounded-[3rem] border border-gray-100 shadow-premium p-12"
            >
              <KnowledgeEditor
                hostId={hostId}
                propertyId={prop.id}
                propertyName={prop.name}
                initialContent={knowledgeMap[prop.id]}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
