// ================================================================
// routes/dashboard/knowledge.tsx — Host AI Knowledge Base Editor
//
// Dashboard page where hosts write/edit their property knowledge base.
// The AI Concierge uses this content to answer guest questions.
// ================================================================

import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import {
  getKnowledge,
  listProperties,
} from "../../utils/db.ts";
import type { DashboardState, HostKnowledge, Property } from "../../utils/types.ts";
import KnowledgeEditor from "../../islands/KnowledgeEditor.tsx";

interface KnowledgePageData {
  hostId: string;
  hostName: string;
  properties: Property[];
  knowledgeMap: Record<string, string>; // propId → content
}

export const handler: Handlers<KnowledgePageData, DashboardState> = {
  GET: async (_req, ctx) => {
    const { hostId, hostName } = ctx.state;

    const properties = await listProperties(hostId);

    // Load existing knowledge for all properties
    const knowledgeMap: Record<string, string> = {};
    await Promise.all(
      properties.map(async (prop) => {
        const kb = await getKnowledge(hostId, prop.id);
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

      <div class="space-y-8">
        {/* Page Header */}
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-sm">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M10 2C6.68629 2 4 4.68629 4 8C4 10.22 5.21 12.16 7 13.2V15C7 15.55 7.45 16 8 16H12C12.55 16 13 15.55 13 15V13.2C14.79 12.16 16 10.22 16 8C16 4.68629 13.3137 2 10 2Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path d="M8 18H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M10 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-800 text-gray-900">
                AI Knowledge Base
              </h1>
              <p class="text-sm text-gray-400">
                Your AI concierge answers guests using only this information
              </p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div class="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100">
          <span class="text-xl mt-0.5">🤖</span>
          <div>
            <p class="text-sm font-700 text-purple-800">
              How the AI Concierge works
            </p>
            <p class="text-xs text-purple-600 mt-1 leading-relaxed">
              Write your property details below — WiFi passwords, check-in instructions,
              house rules, nearby restaurants, caretaker number. Your guests will see a
              chat bubble on the booking page and can ask questions 24/7. The AI will
              <strong> only</strong> use the info you provide. No hallucinations.
            </p>
          </div>
        </div>

        {/* No properties state */}
        {properties.length === 0 && (
          <div class="flex flex-col items-center justify-center py-16 text-center">
            <span class="text-5xl mb-4">🏠</span>
            <p class="text-base font-700 text-gray-900 mb-1">
              No properties yet
            </p>
            <p class="text-sm text-gray-400 mb-4">
              Add a property first, then set up its AI knowledge base.
            </p>
            <a
              href="/dashboard/properties"
              class="px-5 py-2.5 rounded-xl bg-istay-900 text-white text-sm font-700 hover:bg-istay-800 transition-colors"
            >
              → Go to Properties
            </a>
          </div>
        )}

        {/* Property Editors */}
        {properties.map((prop) => (
          <div
            key={prop.id}
            class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
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
    </>
  );
}
