import { useState, useEffect, useCallback, useRef } from "preact/hooks";
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

const POLL_INTERVAL_MS = 5_000; // Poll every 5s
const MAX_POLL_DURATION_MS = 10 * 60_000; // Stop after 10 minutes

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
  
  // ── Live verification state (reactive polling) ──────────────
  const [liveVerificationStatus, setLiveVerificationStatus] = useState(initialVerificationStatus);
  const pollStartRef = useRef<number>(0);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isVerified = liveVerificationStatus === "verified";
  const canAccessDetails = isConfirmed && isVerified;

  // Poll for verification status changes
  const pollVerificationStatus = useCallback(async () => {
    try {
      const res = await fetch(`/api/verify/status?bookingId=${bookingId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.status && data.status !== liveVerificationStatus) {
          setLiveVerificationStatus(data.status);
          // Stop polling once verified or failed (terminal states)
          if (data.status === "verified" || data.status === "failed") {
            if (pollTimerRef.current) {
              clearInterval(pollTimerRef.current);
              pollTimerRef.current = null;
            }
          }
        }
      }
    } catch (_err) {
      // Silently fail — network hiccups shouldn't crash the flow
    }
  }, [bookingId, liveVerificationStatus]);

  useEffect(() => {
    // Only start polling if the booking is confirmed but verification is pending/processing
    if (!isConfirmed || isVerified || liveVerificationStatus === "failed") return;

    pollStartRef.current = Date.now();

    pollTimerRef.current = setInterval(() => {
      // Auto-stop after MAX_POLL_DURATION_MS to prevent infinite network usage
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
    <div class="max-w-2xl mx-auto w-full space-y-6">
      {/* Bespoke Header Card */}
      <div class="relative bg-white/80 backdrop-blur-md rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden p-8">
        {/* Property Branding Layer */}
        {propertyImage && (
          <div class="absolute top-0 left-0 w-full h-32 opacity-10 overflow-hidden pointer-events-none">
            <img src={propertyImage} class="w-full h-full object-cover blur-sm" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" />
          </div>
        )}
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-500"></div>
        <div class="relative z-10 flex items-start justify-between">
          <div>
            <h1 class="text-2xl font-800 text-gray-900 tracking-tight">Your Stay</h1>
            <p class="text-gray-500 mt-1">{propertyName}</p>
          </div>
          <div class="text-right">
            <span class={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-700 ${
              status === "room_ready" ? "bg-teal-50 text-teal-700" :
              isConfirmed ? "bg-blue-50 text-blue-700" : "bg-orange-50 text-orange-700"
            }`}>
              {status === "room_ready" ? "✨ Room Ready" : isConfirmed ? "✅ Confirmed" : "⏳ Pending"}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-4 mt-8 pb-6 border-b border-gray-100">
          <div class="flex-1">
            <p class="text-xs font-600 text-gray-400 uppercase tracking-widest">Check-in</p>
            <p class="text-lg font-700 text-gray-900 mt-1">{formatDate(checkIn)}</p>
          </div>
          <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
            →
          </div>
          <div class="flex-1 text-right">
            <p class="text-xs font-600 text-gray-400 uppercase tracking-widest">Check-out</p>
            <p class="text-lg font-700 text-gray-900 mt-1">{formatDate(checkOut)}</p>
          </div>
        </div>

        <div class="pt-6">
          <a
            href={`/invoice/${bookingId}?download=1`}
            target="_blank"
            class="inline-flex items-center gap-2 text-sm font-600 text-teal-600 hover:text-teal-700 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M14 6V3a1 1 0 00-1-1H7a1 1 0 00-1 1v3M6 14H5a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v4a2 2 0 01-2 2h-1M6 10h8v8H6v-8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Download Invoice
          </a>
        </div>
      </div>

      {/* Conditional Access Block */}
      {!canAccessDetails ? (
        <div class="bg-white/80 backdrop-blur-md rounded-[2rem] border border-gray-100 shadow-xl p-8 text-center space-y-6">
          <div class="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto border border-gray-100 shadow-inner">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="text-gray-400">
              <path d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-800 text-gray-900">Unlock Check-in Details</h2>
            <p class="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
              {!isConfirmed 
                ? "Your booking is still pending confirmation. The details will unlock once the payment is fully processed."
                : liveVerificationStatus === "processing"
                ? "Your ID is being verified. This page will update automatically — no need to refresh."
                : "For security and compliance, verify your government ID to unlock the WiFi passwords and check-in codes."
              }
            </p>
          </div>

          {/* Live processing indicator */}
          {isConfirmed && liveVerificationStatus === "processing" && (
            <div class="flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
              <div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <p class="text-xs font-700 text-blue-700">Verification in progress — auto-updating...</p>
            </div>
          )}

          {isConfirmed && (liveVerificationStatus === "pending" || !liveVerificationStatus) && (
            <div class="text-left mt-8">
              <IdVerification bookingId={bookingId} guestName={guestName} />
            </div>
          )}
        </div>
      ) : (
        <div class="bg-white/80 backdrop-blur-md rounded-[2rem] border border-gray-100 shadow-xl p-8 space-y-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="text-teal-600">
                <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h2 class="text-xl font-800 text-gray-900 tracking-tight">Check-in & Credentials</h2>
          </div>
          
          <div class="prose prose-sm max-w-none text-gray-600 break-words whitespace-pre-wrap">
            {instructionsContent || "No instructions provided by the host yet."}
          </div>
        </div>
      )}
    </div>
  );
}
