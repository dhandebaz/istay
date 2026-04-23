// ================================================================
// routes/dashboard/knowledge.tsx — Host AI Knowledge Base Editor
// ================================================================

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
        <title>AI Knowledge Base | istay Dashboard</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div class="space-y-12 pb-20">
        {/* Page Header */}
        <section class="flex flex-col lg:flex-row items-end justify-between gap-8">
          <div>
            <div class="flex items-center gap-4 mb-4">
              <div class="px-3 py-1 bg-gray-900 text-mint-400 text-[10px] font-950 uppercase tracking-[0.2em] rounded-full border-[2px] border-gray-900 shadow-[3px_3px_0px_0px_#4ade80]">
                COGNITIVE_ENGINE
              </div>
              <div class="h-[2px] w-24 bg-gray-100" />
            </div>
            <h2 class="text-4xl sm:text-7xl font-950 text-gray-900 tracking-tighter uppercase leading-[0.8]">
              AI <br/> <span class="text-mint-500">Knowledge.</span>
            </h2>
          </div>
          <div class="bg-white p-8 rounded-[2.5rem] border-[4px] border-gray-900 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex items-center gap-8 group hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <div>
              <p class="text-[9px] font-950 text-gray-400 uppercase tracking-[0.3em] mb-2">SYSTEM_ACCURACY</p>
              <p class="text-4xl font-950 text-gray-900 tracking-tighter">100%</p>
            </div>
            <div class="w-16 h-16 rounded-2xl bg-purple-400 border-[3px] border-gray-900 flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-[-5deg] transition-transform">
              🧠
            </div>
          </div>
        </section>

        {/* Info Banner */}
        <div class="p-10 bg-purple-50 rounded-[2.5rem] border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_#a855f7]">
          <div class="flex items-start gap-6">
            <span class="text-4xl">🤖</span>
            <div class="space-y-2">
              <h3 class="text-sm font-950 text-gray-900 uppercase tracking-widest">PROTOCOL_INSTRUCTIONS</h3>
              <p class="text-xs text-purple-900/60 font-800 uppercase leading-relaxed tracking-widest">
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
          <div class="bg-white border-[4px] border-gray-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-32 flex flex-col items-center justify-center text-center rounded-[3rem]">
            <span class="text-8xl mb-8">🏠</span>
            <h3 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">Registry_Empty</h3>
            <p class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em] mt-4 mb-10">Add a property first, then set up its AI knowledge base.</p>
            <a
              href="/dashboard/properties"
              class="px-10 py-5 bg-mint-400 text-gray-900 text-[11px] font-950 uppercase tracking-[0.2em] rounded-2xl border-[3px] border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              GO_TO_PROPERTIES
            </a>
          </div>
        )}

        {/* Property Editors */}
        <div class="space-y-12">
          {properties.map((prop) => (
            <div
              key={prop.id}
              class="bg-white rounded-[3rem] border-[4px] border-gray-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-12"
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
