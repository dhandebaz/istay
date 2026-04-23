import { useState } from "preact/hooks";
import { CheckIcon } from "../components/Icons.tsx";

export default function RegisterForm() {
  const [step, setStep] = useState<"details" | "submitting" | "error">("details");
  const [errorMsg, setErrorMsg] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [acceptTerms, setAcceptTerms] = useState(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
      setErrorMsg("ALL_FIELDS_REQUIRED");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("PASSWORD_MIN_8_CHARS");
      return;
    }

    if (!acceptTerms) {
      setErrorMsg("TERMS_ACCEPTANCE_REQUIRED");
      return;
    }

    setStep("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStep("error");
        setErrorMsg(data.error || "REGISTRATION_FAILED");
        return;
      }

      if (typeof window !== "undefined") {
        window.location.href = "/pricing";
      }
    } catch {
      setStep("error");
      setErrorMsg("PROTOCOL_NETWORK_ERROR");
    }
  }

  if (step === "submitting") {
    return (
      <div class="flex flex-col items-center justify-center py-20 gap-10">
        <div class="w-24 h-24 rounded-[2.5rem] bg-mint-400 border-[5px] border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center animate-spin-brutal">
          <span class="text-4xl">🏗️</span>
        </div>
        <div class="text-center">
          <p class="text-[11px] font-950 text-gray-900 uppercase tracking-[0.4em] mb-3">INITIALIZING_KERNEL...</p>
          <p class="text-[10px] font-800 text-gray-400 uppercase tracking-widest leading-relaxed">ASSEMBLING YOUR PRIVATE HOSPITALITY ENGINE</p>
        </div>
      </div>
    );
  }

  return (
    <div class="space-y-12">
      <form onSubmit={handleSubmit} class="space-y-10" novalidate>
        <div class="grid grid-cols-1 gap-10">
          {/* Full Name */}
          <div class="space-y-4">
            <label class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em] ml-4">HOST_FULL_NAME</label>
            <input
              type="text"
              value={name}
              onInput={(e) => setName((e.target as HTMLInputElement).value)}
              required
              placeholder="E.G. ARTHUR DENT"
              class="w-full px-8 py-5 rounded-[2rem] border-[4px] border-gray-900 font-950 text-gray-900 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-mint-50 focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-200 uppercase tracking-widest text-xs"
            />
          </div>

          {/* Email */}
          <div class="space-y-4">
            <label class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em] ml-4">SIGNAL_COMM_CHANNEL</label>
            <input
              type="email"
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              required
              placeholder="YOU@DOMAIN.EXT"
              class="w-full px-8 py-5 rounded-[2rem] border-[4px] border-gray-900 font-950 text-gray-900 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-mint-50 focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-200 uppercase tracking-widest text-xs"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Phone */}
            <div class="space-y-4">
              <label class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em] ml-4">WHATSAPP_LINK</label>
              <input
                type="tel"
                value={phone}
                onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
                required
                placeholder="+91 00000 00000"
                class="w-full px-8 py-5 rounded-[2rem] border-[4px] border-gray-900 font-950 text-gray-900 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-mint-50 focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-200 uppercase tracking-widest text-xs"
              />
            </div>

            {/* Password */}
            <div class="space-y-4">
              <label class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em] ml-4">ENCRYPTION_KEY</label>
              <input
                type="password"
                value={password}
                onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                required
                placeholder="********"
                class="w-full px-8 py-5 rounded-[2rem] border-[4px] border-gray-900 font-950 text-gray-900 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-mint-50 focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-200 uppercase tracking-widest text-xs"
              />
            </div>
          </div>
        </div>

        {/* Terms */}
        <label class="flex items-start gap-5 cursor-pointer group">
          <div class="relative mt-1">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms((e.target as HTMLInputElement).checked)}
              class="peer absolute opacity-0 w-6 h-6 cursor-pointer"
            />
            <div class="w-7 h-7 border-[4px] border-gray-900 rounded-xl bg-white peer-checked:bg-mint-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center">
               <CheckIcon class="w-4 h-4 text-gray-900 opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
          </div>
          <p class="text-[10px] font-950 text-gray-400 uppercase tracking-widest leading-relaxed">
            I AGREE TO THE <a href="/terms" class="text-gray-900 border-b-2 border-gray-900 hover:text-mint-500 transition-colors">PROTOCOL_TERMS</a> AND UNDERSTAND THAT MY DATA FLOWS THROUGH THE <a href="/privacy" class="text-gray-900 border-b-2 border-gray-900 hover:text-mint-500 transition-colors">SECURE_KERNEL</a>.
          </p>
        </label>

        {errorMsg && (
          <div class="p-6 bg-rose-50 border-[3px] border-rose-900 rounded-[1.5rem] shadow-[6px_6px_0px_0px_#9f1239] animate-shake">
            <p class="text-[10px] font-950 text-rose-900 uppercase tracking-[0.2em] flex items-center gap-3">
              <span class="text-lg">⚠️</span> SYSTEM_ERROR: {errorMsg}
            </p>
          </div>
        )}

        <button
          type="submit"
          class="w-full py-6 bg-gray-900 text-mint-400 text-sm font-950 uppercase tracking-[0.4em] rounded-[2rem] border-[4px] border-gray-900 shadow-[10px_10px_0px_0px_#4ade80] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-[0.98]"
        >
          {step === "submitting" ? "PROCESSING..." : "ACTIVATE_HOST_NODE"}
        </button>
      </form>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-brutal { 
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .animate-spin-brutal { animation: spin-brutal 3s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      ` }} />
    </div>
  );
}
