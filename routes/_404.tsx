import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | istay</title>
      </Head>
      <div class="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div class="relative mb-12">
          {/* Decorative background blur */}
          <div class="absolute -inset-10 bg-mint-500/10 rounded-full blur-3xl" />
          
          <h1 class="relative text-[10rem] font-900 leading-none text-gray-900 tracking-tighter">
            404
          </h1>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-6xl animate-bounce">🏠</span>
          </div>
        </div>
        
        <h2 class="text-3xl font-800 text-gray-900 mb-4">
          This stay doesn't exist.
        </h2>
        <p class="text-gray-500 max-w-md mx-auto mb-10 text-lg leading-relaxed">
          The page you're looking for was either moved, renamed, or never booked in the first place.
        </p>
        
        <a
          href="/"
          class="px-10 py-4 rounded-2xl bg-istay-900 text-white font-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-istay-900/20"
        >
          Back to Home
        </a>
        
        <p class="mt-20 text-xs font-700 text-gray-300 uppercase tracking-widest">
           istay · Direct Booking Infrastructure
        </p>
      </div>
    </>
  );
}
