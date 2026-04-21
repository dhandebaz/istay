import { Head } from "$fresh/runtime.ts";
import { getPageMetadata, SEOConfig } from "../utils/seo.ts";

export default function SEOMeta(config: SEOConfig) {
  const {
    title,
    description,
    canonical,
    ogImage,
    schema,
    noIndex,
  } = getPageMetadata(config);
  
  const fullImageUrl = ogImage.startsWith("http") ? ogImage : `https://istay.space${ogImage}`;
  const url = canonical;
  const type = "website";
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex" />}
      
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
