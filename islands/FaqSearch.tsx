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
    <div class="space-y-16 animate-fade-in">
      <div class="relative max-w-3xl mx-auto group">
        <div class="absolute inset-y-0 left-8 flex items-center pointer-events-none z-10">
          <svg class="w-6 h-6 text-gray-400 group-focus-within:text-emerald-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
          placeholder="Search Insights Portfolio..."
          class="w-full bg-white border border-gray-100 text-[15px] font-medium text-gray-900 placeholder-gray-300 rounded-[2rem] pl-18 pr-8 py-6 shadow-premium focus:shadow-premium-lg focus:border-emerald-100 outline-none transition-all"
        />
      </div>

      <div class="grid grid-cols-1 gap-8">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map(({ q, a }, i) => (
            <details
              key={i}
              class="group bg-white border border-gray-50 rounded-[2.5rem] shadow-premium overflow-hidden transition-all duration-500 open:shadow-premium-lg open:border-emerald-50"
            >
              <summary class="flex items-center justify-between px-10 py-8 cursor-pointer list-none text-[13px] font-bold text-gray-900 uppercase tracking-[0.2em] transition-all hover:bg-emerald-50/20">
                <span class="flex items-center gap-6">
                  <span class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-[11px] font-bold shadow-sm transition-transform group-open:scale-110 group-open:bg-emerald-500 group-open:text-white">
                    {i + 1}
                  </span>
                  <span class="tracking-tight">{q}</span>
                </span>
                <div class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center transition-all duration-500 group-open:rotate-180 group-open:bg-emerald-50 group-open:border-emerald-100">
                  <svg
                    class="w-5 h-5 text-gray-400 group-open:text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="3"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </summary>
              <div class="px-10 pb-10 text-[15px] font-medium text-gray-500 leading-relaxed animate-slide-up">
                <div class="pt-8 border-t border-gray-50">
                  {a}
                </div>
              </div>
            </details>
          ))
        ) : (
          <div class="text-center py-24 bg-gray-50/50 border border-dashed border-gray-100 rounded-[3.5rem] shadow-inner">
            <div class="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-8 text-gray-300 shadow-premium">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p class="text-[12px] font-bold text-gray-400 uppercase tracking-[0.4em]">No Insights Synchronized for: <span class="text-emerald-600">"{query}"</span></p>
          </div>
        )}
      </div>
    </div>
  );
}

