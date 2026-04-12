import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "../../islands/Header.tsx";
import Footer from "../../components/Footer.tsx";

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  date: string;
}

export const handler: Handlers<BlogPost> = {
  async GET(_req, ctx) {
    const { slug } = ctx.params;
    try {
      const content = await Deno.readTextFile(`./content/blog/${slug}.md`);
      const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      return ctx.render({ slug, title, content, date: "April 12, 2026" });
    } catch {
      return ctx.renderNotFound();
    }
  },
};

export default function BlogPostPage({ data }: PageProps<BlogPost>) {
  const { title, content, date, slug } = data;
  
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "datePublished": "2026-04-12",
    "author": {
      "@type": "Organization",
      "name": "istay"
    },
    "publisher": {
      "@type": "Organization",
      "name": "istay",
      "logo": {
        "@type": "ImageObject",
        "url": "https://istay.space/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://istay.space/blog/${slug}`
    }
  });

  return (
    <>
      <Head>
        <title>{title} | istay Host Authority</title>
        <meta name="description" content={`Read: ${title}. Insights and strategy for independent property hosts in India via istay.`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      </Head>

      <Header />

      <main class="min-h-screen bg-white pt-24 pb-20">
        <article class="max-w-3xl mx-auto px-6">
          <header class="mb-12 text-center">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-50 text-mint-700 text-xs font-800 uppercase tracking-widest mb-6">
              Perspective
            </div>
            <h1 class="text-4xl sm:text-5xl font-900 text-gray-900 tracking-tight leading-tight mb-4 text-balance">
              {title}
            </h1>
            <p class="text-gray-400 font-600 uppercase tracking-widest text-[11px]">
              By istay Operations · {date}
            </p>
          </header>

          <div class="prose prose-lg prose-mint max-w-none prose-headings:font-900 prose-headings:tracking-tight prose-a:text-mint-600 prose-strong:text-gray-900 text-gray-600 leading-relaxed font-500">
            {/* Very minimal markdown renderer simulation */}
            {content.split("\n").map((line, i) => {
              if (line.startsWith("# ")) return <h1 key={i}>{line.slice(2)}</h1>;
              if (line.startsWith("## ")) return <h2 key={i}>{line.slice(3)}</h2>;
              if (line.startsWith("- ")) return <li key={i}>{line.slice(2)}</li>;
              if (line.startsWith("1. ")) return <li key={i}>{line.slice(3)}</li>;
              if (line.trim() === "") return <br key={i} />;
              return <p key={i}>{line}</p>;
            })}
          </div>

          <div class="mt-20 pt-10 border-t border-gray-100 bg-gray-50 rounded-[2rem] p-10 text-center">
            <h3 class="text-xl font-800 text-gray-900 mb-3">Tired of sharing your revenue?</h3>
            <p class="text-gray-500 mb-8 max-w-sm mx-auto">
              Join hundreds of independent hosts who have switched back to direct bookings.
            </p>
            <a href="/register" class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-mint-500 text-istay-900 font-900 shadow-xl shadow-mint-500/20 hover:bg-mint-400 transition-all hover:-translate-y-1">
              Start Hosting for ₹1,000
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
