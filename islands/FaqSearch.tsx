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
    <div class="space-y-6">
      <div class="relative max-w-xl mx-auto mb-8">
        <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35"></path>
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
          placeholder="Search for answers..."
          class="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-mint-500 focus:border-mint-500 block pl-12 p-3 transition-colors outline-none"
        />
      </div>

      <div class="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map(({ q, a }, i) => (
            <details
              key={i}
              class="group rounded-2xl border border-gray-100 hover:border-mint-200 transition-colors duration-200 bg-white"
            >
              <summary class="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-700 text-gray-900">
                {q}
                <svg
                  class="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div class="px-6 pb-6 text-gray-500 text-sm leading-relaxed">
                {a}
              </div>
            </details>
          ))
        ) : (
          <div class="text-center py-8 text-gray-500 font-500">
            No results found for "{query}". Please contact support.
          </div>
        )}
      </div>
    </div>
  );
}
