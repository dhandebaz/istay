import { useState } from "preact/hooks";

interface FAQ {
  q: string;
  a: string;
}

interface FaqSearchProps {
  faqs: FAQ[];
}

export default function FaqSearch({ faqs }: FaqSearchProps) {
  const [query, setQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(query.toLowerCase()) ||
      faq.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div class="space-y-12">
      <div class="relative max-w-2xl mx-auto group">
        <div class="absolute inset-y-0 left-6 flex items-center pointer-events-none z-10">
          <svg class="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
          placeholder="SEARCH_KNOWLEDGE_BASE"
          class="w-full bg-white border-[4px] border-gray-900 text-sm font-950 text-gray-900 placeholder-gray-300 rounded-[2rem] pl-16 pr-8 py-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:shadow-[8px_8px_0px_0px_#4ade80] outline-none transition-all uppercase tracking-widest"
        />
      </div>

      <div class="grid grid-cols-1 gap-6">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map(({ q, a }, i) => (
            <details
              key={i}
              class="group bg-white border-[3px] border-gray-900 rounded-[2rem] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden open:shadow-[6px_6px_0px_0px_#4ade80] transition-all"
            >
              <summary class="flex items-center justify-between px-10 py-6 cursor-pointer list-none text-xs font-950 text-gray-900 uppercase tracking-widest">
                <span class="flex items-center gap-4">
                  <span class="text-mint-500 font-950">Q{i + 1}.</span>
                  {q}
                </span>
                <svg
                  class="w-5 h-5 text-gray-900 group-open:rotate-180 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="4"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div class="px-10 pb-8 text-sm font-700 text-gray-500 leading-relaxed uppercase tracking-tight">
                <div class="pt-4 border-t-2 border-gray-100">
                  {a}
                </div>
              </div>
            </details>
          ))
        ) : (
          <div class="text-center py-20 bg-gray-50 border-[3px] border-dashed border-gray-900 rounded-[3rem]">
            <p class="text-[11px] font-950 text-gray-400 uppercase tracking-[0.4em]">NO_RECORDS_FOUND_FOR: "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
