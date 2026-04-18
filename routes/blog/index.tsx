import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "../../islands/Header.tsx";
import Footer from "../../components/Footer.tsx";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

interface BlogData {
  posts: BlogPost[];
}

export const handler: Handlers<BlogData> = {
  async GET(_req, ctx) {
    const posts: BlogPost[] = [];
    try {
      for await (const entry of Deno.readDir("./content/blog")) {
        if (entry.isFile && entry.name.endsWith(".md")) {
          const slug = entry.name.replace(".md", "");
          // In a real app we'd parse frontmatter, but we'll simulate for now
          const title = slug.split("-").map((w) =>
            w.charAt(0).toUpperCase() + w.slice(1)
          ).join(" ");
          posts.push({
            slug,
            title,
            excerpt:
              "Discover why direct bookings are the future of the hospitality industry...",
            date: "April 12, 2026",
          });
        }
      }
    } catch (e) {
      console.error("Error reading blog directory", e);
    }

    return ctx.render({ posts });
  },
};

export default function BlogIndex({ data }: PageProps<BlogData>) {
  return (
    <>
      <Head>
        <title>Blog | istay Authority Content</title>
        <meta
          name="description"
          content="Insights, guides, and strategy for independent property hosts. Learn how to grow your direct booking channel."
        />
      </Head>

      <Header />

      <main class="min-h-screen bg-gray-50 pt-24 pb-20">
        <div class="max-w-4xl mx-auto px-6">
          <div class="text-center mb-16">
            <h1 class="text-4xl sm:text-5xl font-900 text-gray-900 tracking-tight mb-4">
              Host <span class="text-mint-500">Perspective</span>
            </h1>
            <p class="text-lg text-gray-500 font-500">
              Strategy and insights for the modern independent host.
            </p>
          </div>

          <div class="grid gap-8">
            {data.posts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                class="group flex flex-col sm:flex-row gap-6 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div class="flex-1">
                  <div class="text-xs font-800 text-mint-600 uppercase tracking-widest mb-3">
                    {post.date}
                  </div>
                  <h2 class="text-2xl font-800 text-gray-900 group-hover:text-mint-600 transition-colors mb-3">
                    {post.title}
                  </h2>
                  <p class="text-gray-500 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div class="mt-6 flex items-center gap-2 text-sm font-800 text-gray-900">
                    Read Article
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      class="group-hover:translate-x-1 transition-transform"
                    >
                      <path
                        d="M2 8H14M8 2L14 8L8 14"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
