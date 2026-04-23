import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import LoginForm from "../islands/LoginForm.tsx";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Sign In — iStay</title>
        <meta
          name="description"
          content="Sign in to your premium iStay host account."
        />
      </Head>

      <div class="min-h-screen bg-white flex flex-col lg:flex-row font-sans selection:bg-emerald-100">
        
        {/* Left Side: Branding / Image (Hidden on Mobile) */}
        <div class="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden items-end p-20">
          <div class="absolute inset-0">
            <img 
              src="/auth-bg.png" 
              alt="iStay Premium Hospitality" 
              class="w-full h-full object-cover opacity-60"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
          </div>
          
          <div class="relative z-10 max-w-lg animate-slide-up">
            <a href="/" class="block mb-12 hover:opacity-80 transition-opacity w-fit">
              <img src="/logo.svg" alt="iStay Logo" class="h-10 w-auto invert" />
            </a>
            <h1 class="text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              The operating <br/> system for <span class="text-emerald-400 font-serif italic">elite</span> hosts.
            </h1>
            <div class="pl-6 border-l-2 border-emerald-500/50">
              <p class="text-xl text-gray-300 font-medium tracking-tight leading-relaxed">
                Manage your portfolio, automate guest interactions, and scale your margins with AI.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div class="flex-1 flex flex-col bg-gray-50/50 relative overflow-hidden">
          <div class="lg:hidden">
            <Header />
          </div>

          <main class="flex-1 flex items-center justify-center p-6 sm:p-20 relative z-10">
            <div class="w-full max-w-md">
              <div class="mb-10 text-center lg:text-left animate-slide-up">
                <span class="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-[11px] font-bold uppercase tracking-wider mb-4">Welcome Back</span>
                <h2 class="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-[1.2]">
                   Sign in to your <br/> <span class="text-emerald-600">dashboard.</span>
                </h2>
              </div>

              <div class="bg-white rounded-[2rem] border border-gray-100 shadow-premium p-8 sm:p-12 animate-slide-up delay-100">
                <LoginForm />
              </div>

              <div class="mt-10 text-center animate-slide-up delay-200">
                <p class="text-sm font-medium text-gray-400">
                  New to iStay?{" "}
                  <a
                    href="/register"
                    class="text-emerald-600 font-bold hover:text-emerald-700 transition-all border-b border-emerald-200 hover:border-emerald-600"
                  >
                    Create an account
                  </a>
                </p>
              </div>
            </div>
          </main>

          {/* Decorative background elements */}
          <div class="absolute -top-24 -right-24 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl pointer-events-none" />
          <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </>
  );
}
