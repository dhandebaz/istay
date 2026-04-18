import { Head } from "$fresh/runtime.ts";

interface SEOMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  schema?: string;
  canonical?: string;
}

export default function SEOMeta({
  title = "istay — Direct Booking Platform for Property Hosts",
  description = "Stop paying 15–18% to OTAs. istay lets you accept direct bookings with a flat 5% fee and AI-powered guest management.",
  image = "/og-home.png",
  url = "https://istay.space",
  type = "website",
  schema,
  canonical,
}: SEOMetaProps) {
  const fullImageUrl = image.startsWith("http") ? image : `https://istay.space${image}`;
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="istay" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {canonical && <link rel="canonical" href={canonical} />}
      
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema }}
        />
      )}
    </Head>
  );
}
