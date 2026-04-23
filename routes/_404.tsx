import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404_SIGNAL_LOST // ISTAY</title>
      </Head>
      <div class="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8 text-center overflow-hidden relative">
        {/* Decorative Grid background */}
        <div class="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4ade80 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div class="relative z-10">
          <div class="mb-12">
             <span class="px-5 py-2 rounded-xl bg-mint-400 text-gray-900 text-[10px] font-950 uppercase tracking-[0.4em] border-[3px] border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">ERROR_NODE_404</span>
          </div>

          <div class="relative mb-16 inline-block">
             <h1 class="text-[10rem] sm:text-[14rem] font-950 leading-none text-white tracking-tighter uppercase select-none">
               VOID
             </h1>
             <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-mint-400 text-8xl sm:text-9xl font-950 mix-blend-difference animate-pulse">?</span>
             </div>
          </div>

          <h2 class="text-3xl sm:text-5xl font-950 text-white mb-8 tracking-tighter uppercase leading-none">
            THIS_STAY_DOES_NOT_EXIST.
          </h2>
          
          <p class="text-[11px] sm:text-xs font-800 text-gray-500 max-w-sm mx-auto mb-16 uppercase tracking-[0.2em] leading-relaxed">
            THE REQUESTED SEGMENT HAS BEEN DE-ALLOCATED OR MOVED TO AN UNRECOVERABLE SECTOR.
          </p>

          <a
            href="/"
            class="inline-block px-12 py-6 rounded-[2rem] bg-mint-400 text-gray-900 font-950 text-sm uppercase tracking-[0.4em] border-[4px] border-gray-900 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-[0.98]"
          >
            RESTORE_SESSION_HOME
          </a>
        </div>

        {/* Floating Brutalist Shapes */}
        <div class="absolute top-20 left-20 w-32 h-32 border-[8px] border-white/5 rounded-full animate-bounce-slow" />
        <div class="absolute bottom-20 right-20 w-48 h-48 bg-mint-400/5 rounded-[3rem] rotate-12 animate-pulse" />
        
        <p class="absolute bottom-10 text-[9px] font-950 text-gray-700 uppercase tracking-[0.5em]">
          ISTAY_OS // DIRECT_BOOKING_INFRASTRUCTURE_V4
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(10deg); } }
        .animate-bounce-slow { animation: bounce-slow 6s ease-in-out infinite; }
      ` }} />
    </>
  );
}
