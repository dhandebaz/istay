import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import LoginForm from "../islands/LoginForm.tsx";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login — istay</title>
        <meta
          name="description"
          content="Sign in to your premium istay host account."
        />
      </Head>

      <div class="min-h-screen bg-white flex flex-col lg:flex-row font-sans">
        
        {/* Left Side: Branding / Image (Hidden on Mobile) */}
        <div class="hidden lg:flex lg:w-5/12 relative bg-gray-900 overflow-hidden items-end p-16">
          <div class="absolute inset-0">
            <img 
              src="/auth-bg.png" 
              alt="istay Premium Hospitality" 
              class="w-full h-full object-cover grayscale-[0.5]"
            />
            <div class="absolute inset-0 bg-gray-900/60 mix-blend-multiply" />
          </div>
          
          <div class="relative z-10 max-w-lg">
            <a href="/" class="block mb-12 hover:scale-105 transition-transform w-fit">
              <img src="/logo.svg" alt="istay Logo" class="h-14 w-auto invert brightness-0" />
            </a>
            <h1 class="text-6xl font-950 text-white tracking-tighter leading-[0.9] mb-8 uppercase">
              The <span class="text-mint-400">OS</span> for elite <br/> hospitality.
            </h1>
            <div class="p-6 border-l-[4px] border-mint-500 bg-white/5 backdrop-blur-sm">
              <p class="text-lg text-gray-300 font-600 tracking-tight leading-relaxed uppercase">
                Manage your portfolio, automate every guest touchpoint, and scale your margins.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div class="flex-1 flex flex-col bg-gray-50 relative">
          <div class="lg:hidden">
            <Header />
          </div>

          <main class="flex-1 flex items-center justify-center p-6 sm:p-20 relative z-10">
            <div class="w-full max-w-md">
              <div class="mb-12 text-center lg:text-left">
                <span class="inline-block px-4 py-1 rounded-lg bg-gray-900 text-white text-[10px] font-950 uppercase tracking-[0.3em] mb-4">WELCOME BACK</span>
                <h2 class="text-4xl sm:text-6xl font-950 tracking-tighter text-gray-900 uppercase leading-[0.9]">
                   Log In to <br/> <span class="text-mint-500">Dashboard.</span>
                </h2>
              </div>

              <div class="bg-white rounded-[2.5rem] border-[4px] border-gray-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-12">
                <LoginForm />
              </div>

              <div class="mt-12 text-center">
                <p class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em]">
                  NEW TO ISTAY?{" "}
                  <a
                    href="/register"
                    class="text-mint-500 hover:text-mint-600 transition-all border-b-2 border-mint-500"
                  >
                    CREATE AN ACCOUNT
                  </a>
                </p>
              </div>
            </div>
          </main>

          {/* Decorative background element for Neo-brutalism */}
          <div class="absolute top-20 right-20 w-64 h-64 border-[10px] border-gray-900/5 rounded-full -rotate-12 pointer-events-none hidden lg:block" />
          <div class="absolute bottom-20 left-20 w-40 h-40 bg-mint-500/10 rounded-3xl rotate-45 pointer-events-none hidden lg:block" />
        </div>
      </div>
    </>
  );
}
