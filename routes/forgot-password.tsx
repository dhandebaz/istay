import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import ForgotPasswordForm from "../islands/ForgotPasswordForm.tsx";

export default function ForgotPasswordPage() {
  return (
    <>
      <Head>
        <title>Forgot Password — istay</title>
        <meta
          name="description"
          content="Reset your premium istay host account password."
        />
      </Head>

      <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Header />

        <main class="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
          <div class="max-w-md w-full space-y-8">
            <div class="text-center">
              <h2 class="text-3xl font-900 tracking-tight text-gray-900 leading-tight">
                Reset Password
              </h2>
              <p class="mt-3 text-sm text-gray-500">
                Enter your email and we'll send a secure reset link.
              </p>
            </div>

            <div class="bg-white/80 backdrop-blur-xl py-8 px-6 sm:px-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-white">
              <ForgotPasswordForm />
            </div>

            <div class="text-center">
              <p class="text-xs text-gray-500 font-500">
                Remember your password?{" "}
                <a
                  href="/login"
                  class="font-700 text-mint-600 hover:text-mint-500 transition-colors"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
