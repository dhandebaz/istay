import { Head } from "$fresh/runtime.ts";
import Header from "../components/Header.tsx";
import LoginForm from "../islands/LoginForm.tsx";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login — istay</title>
        <meta name="description" content="Sign in to your premium istay host account." />
      </Head>
      
      <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Header />
        
        <main class="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
          <div class="max-w-md w-full space-y-8">
            <div class="text-center">
              <h2 class="text-3xl font-900 tracking-tight text-gray-900 leading-tight">
                Welcome Back
              </h2>
              <p class="mt-3 text-sm text-gray-500">
                Sign in to manage your premium properties.
              </p>
            </div>
            
            <div class="bg-white/80 backdrop-blur-xl py-8 px-6 sm:px-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-white">
              <LoginForm />
            </div>

            <div class="text-center">
              <p class="text-xs text-gray-500 font-500">
                Don't have an account?{" "}
                <a href="/register" class="font-700 text-mint-600 hover:text-mint-500 transition-colors">
                  Get Started
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
