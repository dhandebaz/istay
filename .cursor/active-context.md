> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `prisma\schema.prisma` (Domain: **Database (Models/Schema)**)

### 📐 Database (Models/Schema) Conventions & Fixes
- **[what-changed] Added API key auth authentication — ensures atomic multi-step database operat...**: - }
+   output          = "../node_modules/.prisma/client"
- 
+ }
- datasource db {
+ 
-   provider = "postgresql"
+ datasource db {
-   url      = env("DATABASE_URL")
+   provider = "postgresql"
- }
+   url      = env("DATABASE_URL")
- 
+ }
- // ── CORE ENTITIES ─────────────────────────────────────────────
+ 
- 
+ // ── CORE ENTITIES ─────────────────────────────────────────────
- model Host {
+ 
-   id               String   @id @default(uuid())
+ model Host {
-   email            String   @unique
+   id               String   @id @default(uuid())
-   name             String
+   email            String   @unique
-   phone            String
+   name             String
-   plan             String   @default("monthly") // "monthly" or "lifetime"
+   phone            String
-   subscriptionStatus String @default("expired") // "active", "expired", "trailing"
+   plan             String   @default("monthly") // "monthly" or "lifetime"
-   subscriptionExpiresAt DateTime?
+   subscriptionStatus String @default("expired") // "active", "expired", "trailing"
-   walletBalance    Float    @default(0)
+   subscriptionExpiresAt DateTime?
-   setupFeePaid     Boolean  @default(false)
+   walletBalance    Float    @default(0)
-   gatewayVendorId  String?
+   setupFeePaid     Boolean  @default(false)
-   cashfreeVendorId String?
+   gatewayVendorId  String?
-   razorpaySubscriptionId String?
+   cashfreeVendorId String?
-   lastLowBalanceAlert DateTime?
+   razorpaySubscriptionId String?
-   apiKey           String?
+   lastLowBalanceAlert DateTime?
-   legacyApiKey     String?
+   apiKey           String?
-   legacyApiKeyExpires DateTime?
+   legacyApiKey     String?
-   settings         Json?    // logoUrl, gstin, businessName, etc.
+   legacyApiKeyExpires DateTime?
-   webhooks         Json?    // Array of WebhookConfig
+   settings         Json?    // logoUrl, gstin, businessName, etc.
-   createdAt        DateTime @default(now())
+   webhooks         Json?    // Array of Web
… [diff truncated]
- **[what-changed] Added API key auth authentication — ensures atomic multi-step database operat...**: -   output          = "../generated/client"
+ }
- }
+ 
- 
+ datasource db {
- datasource db {
+   provider = "postgresql"
-   provider = "postgresql"
+   url      = env("DATABASE_URL")
-   url      = env("DATABASE_URL")
+ }
- }
+ 
- 
+ // ── CORE ENTITIES ─────────────────────────────────────────────
- // ── CORE ENTITIES ─────────────────────────────────────────────
+ 
- 
+ model Host {
- model Host {
+   id               String   @id @default(uuid())
-   id               String   @id @default(uuid())
+   email            String   @unique
-   email            String   @unique
+   name             String
-   name             String
+   phone            String
-   phone            String
+   plan             String   @default("monthly") // "monthly" or "lifetime"
-   plan             String   @default("monthly") // "monthly" or "lifetime"
+   subscriptionStatus String @default("expired") // "active", "expired", "trailing"
-   subscriptionStatus String @default("expired") // "active", "expired", "trailing"
+   subscriptionExpiresAt DateTime?
-   subscriptionExpiresAt DateTime?
+   walletBalance    Float    @default(0)
-   walletBalance    Float    @default(0)
+   setupFeePaid     Boolean  @default(false)
-   setupFeePaid     Boolean  @default(false)
+   gatewayVendorId  String?
-   gatewayVendorId  String?
+   cashfreeVendorId String?
-   cashfreeVendorId String?
+   razorpaySubscriptionId String?
-   razorpaySubscriptionId String?
+   lastLowBalanceAlert DateTime?
-   lastLowBalanceAlert DateTime?
+   apiKey           String?
-   apiKey           String?
+   legacyApiKey     String?
-   legacyApiKey     String?
+   legacyApiKeyExpires DateTime?
-   legacyApiKeyExpires DateTime?
+   settings         Json?    // logoUrl, gstin, businessName, etc.
-   settings         Json?    // logoUrl, gstin, businessName, etc.
+   webhooks         Json?    // Array of WebhookConfig
-   webhooks         Json?    // Array of WebhookConfig
+   createdAt        DateTime @default(now())

… [diff truncated]
