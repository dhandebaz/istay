import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getAuthRecord, saveAuthRecord } from "../utils/db.ts";

interface VerifyPageData {
  success: boolean;
  message: string;
}

export const handler: Handlers<VerifyPageData> = {
  GET: async (req, ctx) => {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    const email = url.searchParams.get("email");

    if (!token || !email) {
      return ctx.render({
        success: false,
        message: "Invalid verification link. Missing token or email.",
      });
    }

    try {
      const lowerEmail = email.toLowerCase();
      const authRecord = await getAuthRecord(lowerEmail);

      if (!authRecord) {
        return ctx.render({
          success: false,
          message: "Account not found.",
        });
      }

      if (authRecord.emailVerified) {
        // Already verified
        return new Response(null, {
          status: 302,
          headers: { Location: "/dashboard" },
        });
      }

      if (authRecord.verifyToken !== token) {
        return ctx.render({
          success: false,
          message: "Invalid or expired verification token.",
        });
      }

      // Mark verified
      authRecord.emailVerified = true;
      authRecord.verifyToken = undefined; // Drop the token
      await saveAuthRecord(authRecord);

      // Redirect to dashboard smoothly
      return new Response(null, {
        status: 302,
        headers: { Location: "/dashboard?verified=true" },
      });
      
    } catch (error) {
      console.error("[verify]", error);
      return ctx.render({
        success: false,
        message: "An internal server error occurred while verifying.",
      });
    }
  },
};

export default function VerifyPage({ data }: PageProps<VerifyPageData>) {
  return (
    <>
      <Head>
        <title>Email Verification — istay</title>
        <meta name="robots" content="noindex" />
      </Head>
      
      <div class="min-h-screen bg-gray-50 flex flex-col font-sans items-center justify-center p-4">
        <div class="max-w-md w-full bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white text-center">
          
          <div class={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${data.success ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"}`}>
            {data.success ? (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            )}
          </div>

          <h2 class="text-2xl font-800 text-gray-900 mb-2">
            Verification Failed
          </h2>
          <p class="text-gray-500 text-sm mb-6">
            {data.message}
          </p>
          
          <a href="/login" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-mint-500 text-istay-900 text-sm font-800 shadow-sm hover:bg-mint-400">
            Return to Login
          </a>
          
        </div>
      </div>
    </>
  );
}
