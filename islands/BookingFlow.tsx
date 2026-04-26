import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import IdVerification from "./IdVerification.tsx";

interface BookingFlowProps {
  bookingId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  status: string; // "pending" | "confirmed" | "room_ready" | etc.
  verificationStatus: string; // "pending" | "processing" | "verified" | "failed"
  instructionsContent?: string; // Markdown or raw text from HostKnowledge
  propertyName: string;
  propertyImage?: string;
}

const POLL_INTERVAL_MS = 5_000;
const MAX_POLL_DURATION_MS = 10 * 60_000;

export default function BookingFlow({
  bookingId,
  guestName,
  checkIn,
  checkOut,
  status,
  verificationStatus: initialVerificationStatus,
  instructionsContent,
  propertyName,
  propertyImage,
}: BookingFlowProps) {
  const isConfirmed = status === "confirmed" || status === "room_ready";

  const [liveVerificationStatus, setLiveVerificationStatus] = useState(
    initialVerificationStatus,
  );
  const pollStartRef = useRef<number>(0);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isVerified = liveVerificationStatus === "verified";
  const canAccessDetails = isConfirmed && isVerified;

  const pollVerificationStatus = useCallback(async () => {
    try {
      const res = await fetch(`/api/verify/status?bookingId=${bookingId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.status && data.status !== liveVerificationStatus) {
          setLiveVerificationStatus(data.status);
          if (data.status === "verified" || data.status === "failed") {
            if (pollTimerRef.current) {
              clearInterval(pollTimerRef.current);
              pollTimerRef.current = null;
            }
          }
        }
      }
    } catch (_err) {
      // Silently fail
    }
  }, [bookingId, liveVerificationStatus]);

  useEffect(() => {
    if (!isConfirmed || isVerified || liveVerificationStatus === "failed") {
      return;
    }

    pollStartRef.current = Date.now();

    pollTimerRef.current = setInterval(() => {
      if (Date.now() - pollStartRef.current > MAX_POLL_DURATION_MS) {
        if (pollTimerRef.current) {
          clearInterval(pollTimerRef.current);
          pollTimerRef.current = null;
        }
        return;
      }
      pollVerificationStatus();
    }, POLL_INTERVAL_MS);

    return () => {
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
    };
  }, [isConfirmed, isVerified, liveVerificationStatus, pollVerificationStatus]);

  const formatDate = (iso: string) => {
    return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div class="max-w-2xl mx-auto w-full space-y-10 animate-fade-in">
      {/* Premium Residency Card */}
      <div class="relative bg-white rounded-[3.5rem] border border-gray-50 shadow-premium-lg overflow-hidden p-12 group hover:shadow-premium-xl transition-all duration-700">
        {propertyImage && (
          <div class="absolute top-0 left-0 w-full h-48 opacity-[0.05] overflow-hidden pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-1000">
            <img
              src={propertyImage}
              class="w-full h-full object-cover blur-2xl scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white" />
          </div>
        )}
        <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-sm" />
        
        <div class="relative z-10 flex items-start justify-between">
          <div class="space-y-2">
            <h1 class="text-3xl font-bold text-gray-900 tracking-tighter">
              Residency Profile
            </h1>
            <p class="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] italic opacity-60">{propertyName}</p>
          </div>
          <div class="text-right">
            <span
              class={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-premium transition-all duration-500 ${
                status === "room_ready"
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100 animate-pulse"
                  : isConfirmed
                  ? "bg-gray-900 text-white shadow-emerald-900/20"
                  : "bg-amber-50 text-amber-600 border border-amber-100"
              }`}
            >
              {status === "room_ready"
                ? "✨ Residence Prepared"
                : isConfirmed
                ? "✓ Confirmed Residency"
                : "⏳ Processing Protocol"}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-10 mt-16 pb-12 border-b border-gray-50 relative">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-[1.5rem] bg-white flex items-center justify-center text-gray-200 border border-gray-50 shadow-premium z-10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <div class="space-y-3">
            <p class="text-[10px] font-bold text-gray-300 uppercase tracking-[0.4em] italic">
              Arrival Node
            </p>
            <p class="text-2xl font-bold text-gray-900 tracking-tight">
              {formatDate(checkIn)}
            </p>
          </div>
          
          <div class="text-right space-y-3">
            <p class="text-[10px] font-bold text-gray-300 uppercase tracking-[0.4em] italic">
              Departure Node
            </p>
            <p class="text-2xl font-bold text-gray-900 tracking-tight">
              {formatDate(checkOut)}
            </p>
          </div>
        </div>

        <div class="pt-10 flex items-center justify-between">
          <a
            href={`/invoice/${bookingId}?download=1`}
            target="_blank"
            class="group inline-flex items-center gap-4 text-[10px] font-bold text-gray-400 hover:text-emerald-600 uppercase tracking-[0.3em] transition-all duration-500"
          >
            <div class="w-12 h-12 rounded-[1.2rem] bg-gray-50 flex items-center justify-center group-hover:bg-emerald-50 group-hover:shadow-premium transition-all duration-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 2v6h6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            Residency Invoice
          </a>
          
          <div class="text-right">
             <p class="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.4em] opacity-60">Verified Direct Stay</p>
          </div>
        </div>
      </div>

      {/* Access Authentication Block */}
      {!canAccessDetails
        ? (
          <div class="bg-white rounded-[3.5rem] border border-gray-50 shadow-premium-lg p-16 text-center space-y-10 animate-fade-in transition-all duration-700 hover:shadow-premium-xl group">
            <div class="relative w-28 h-28 mx-auto">
               <div class="absolute inset-0 rounded-[2.5rem] bg-emerald-50/50 animate-pulse border border-emerald-100/50" />
               <div class="absolute inset-0 flex items-center justify-center text-5xl grayscale filter opacity-20 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000">🔒</div>
            </div>
            
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-900 tracking-tight">
                Authorize Residency Access
              </h2>
              <p class="text-[14px] text-gray-500 leading-relaxed max-w-sm mx-auto font-medium opacity-80 italic">
                {!isConfirmed
                  ? "Your residency node is being synchronized. Arrival credentials will unlock once the professional audit is complete."
                  : liveVerificationStatus === "processing"
                  ? "Security protocol in progress. Identification is being verified across the synchronized network."
                  : "Authenticate your guest profile to unlock the residency credentials, WiFi protocols, and arrival instructions."}
              </p>
            </div>

            {isConfirmed && liveVerificationStatus === "processing" && (
              <div class="flex items-center justify-center gap-4 p-6 rounded-[2rem] bg-emerald-50/50 border border-emerald-100 animate-fade-in shadow-inner">
                <div class="relative w-3 h-3">
                   <div class="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                   <div class="absolute inset-0 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                </div>
                <p class="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.4em] italic">
                  Authentication in progress — Auto-updating...
                </p>
              </div>
            )}

            {isConfirmed &&
              (liveVerificationStatus === "pending" ||
                !liveVerificationStatus) &&
              (
                <div class="text-left mt-12 animate-slide-up">
                  <IdVerification bookingId={bookingId} guestName={guestName} />
                </div>
              )}
          </div>
        )
        : (
          <div class="bg-white rounded-[3.5rem] border border-gray-50 shadow-premium-lg p-16 space-y-12 animate-fade-in transition-all duration-700 hover:shadow-premium-xl group">
            <div class="flex items-center gap-6">
              <div class="w-16 h-16 rounded-[1.5rem] bg-emerald-500 text-white flex items-center justify-center shadow-premium-emerald transition-transform duration-700 group-hover:rotate-12">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="space-y-1">
                <h2 class="text-3xl font-bold text-gray-900 tracking-tighter">
                  Residency Credentials
                </h2>
                <p class="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.4em] opacity-60">Authentication Protocol Successful</p>
              </div>
            </div>

            <div class="p-10 rounded-[2.5rem] bg-gray-50/50 border border-gray-100 prose prose-sm max-w-none text-gray-700 font-medium leading-relaxed break-words whitespace-pre-wrap shadow-inner italic relative group">
              <div class="absolute top-8 right-10 text-4xl opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">✨</div>
              {instructionsContent ||
                "Curation of your residency credentials is in progress."}
            </div>
            
            <div class="flex items-center justify-center gap-4 text-[10px] font-bold text-gray-300 uppercase tracking-[0.4em] pt-6 opacity-40 italic">
               <div class="w-1.5 h-px bg-gray-300" />
               Professional Residency Protocol
               <div class="w-1.5 h-px bg-gray-300" />
            </div>
          </div>
        )}
    </div>
  );
}

