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

      <div class="min-h-screen bg-white flex flex-col lg:flex-row font-sans">
        
        {/* Left Side: Branding / Image (Hidden on Mobile) */}
        <div class="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden items-end p-12">
          <div class="absolute inset-0">
            <img 
              src="/auth-bg.png" 
              alt="istay Premium Hospitality" 
              class="w-full h-full object-cover opacity-80"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
          </div>
          
          <div class="relative z-10 max-w-lg">
            <a href="/" class="block mb-8 hover:opacity-80 transition-opacity">
              <img src="/logo.svg" alt="istay Logo" class="h-10 w-auto invert brightness-0" />
            </a>
            <h1 class="text-4xl font-900 text-white tracking-tight leading-tight mb-4">
              We've got you.
            </h1>
            <p class="text-lg text-gray-300 font-400">
              Enter your email and we'll send a secure link to reset your password instantly.
            </p>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div class="flex-1 flex flex-col">
          <div class="lg:hidden">
            <Header />
          </div>

          <main class="flex-1 flex items-center justify-center p-6 sm:p-12">
            <div class="w-full max-w-md space-y-10">
              <div class="text-center lg:text-left">
                <h2 class="text-3xl font-900 tracking-tight text-gray-900 leading-tight">
                  Reset Password
                </h2>
                <p class="mt-2 text-sm text-gray-500">
                  Enter your email and we'll send a secure reset link.
                </p>
              </div>

              <div class="bg-white lg:bg-transparent lg:shadow-none lg:border-none lg:p-0 py-8 px-6 sm:px-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
                <ForgotPasswordForm />
              </div>

              <div class="text-center lg:text-left">
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
      </div>
    </>
  );
}
