import { Head } from "$fresh/runtime.ts";
import Header from "../components/Header.tsx";
import RegisterForm from "../islands/RegisterForm.tsx";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Onboarding & Registration — istay</title>
        <meta name="description" content="Create your premium istay host account and get onboarding." />
      </Head>
      
      <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Header />
        
        <main class="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
          <div class="max-w-md w-full space-y-8">
            <div class="text-center">
              <h2 class="text-3xl font-900 tracking-tight text-gray-900 leading-tight">
                Welcome to istay
              </h2>
              <p class="mt-3 text-sm text-gray-500">
                Let's set up your host profile in seconds.
              </p>
            </div>
            
            <div class="bg-white/80 backdrop-blur-xl py-8 px-6 sm:px-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-white">
              <RegisterForm />
            </div>

            <div class="text-center">
              <p class="text-xs text-gray-500 font-500">
                Already have an account?{" "}
                <a href="/login" class="font-700 text-mint-600 hover:text-mint-500 transition-colors">
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
