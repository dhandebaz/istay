// ================================================================
// utils/seo.ts — Centralized SEO & Brand Metadata
// ================================================================

export interface SEOConfig {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  schema?: string;
  noIndex?: boolean;
}

const DEFAULT_CONFIG: SEOConfig = {
  title: "istay | Direct Bookings for Independent Hosts",
  description: "Stop paying 15% commissions. Use istay to accept direct bookings via WhatsApp and Instagram with a flat 5% fee.",
  canonical: "https://istay.space",
  ogImage: "https://istay.space/og-main.jpg",
};

/**
 * Generates standardized metadata for any route.
 */
export function getPageMetadata(config: SEOConfig = {}): Required<SEOConfig> {
  const title = config.title 
    ? `${config.title} | istay`
    : DEFAULT_CONFIG.title!;
    
  return {
    title,
    description: config.description || DEFAULT_CONFIG.description!,
    canonical: config.canonical || DEFAULT_CONFIG.canonical!,
    ogImage: config.ogImage || DEFAULT_CONFIG.ogImage!,
    schema: config.schema || "",
    noIndex: !!config.noIndex,
  };
}

/**
 * Specialized Schema for Property listings.
 */
export function getPropertySchema(prop: {
  name: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  id: string;
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": prop.name,
    "description": prop.description,
    "image": prop.imageUrl,
    "url": `https://istay.space/st/${prop.id}`,
    "priceRange": `₹${prop.basePrice}+`,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    }
  });
}
