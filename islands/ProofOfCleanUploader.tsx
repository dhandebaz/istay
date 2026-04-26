import { useMemo, useRef, useState } from "preact/hooks";
import CaretakerChecklist from "./CaretakerChecklist.tsx";
import { compressImage } from "../utils/compression.ts";

interface ProofOfCleanUploaderProps {
  bookingId: string;
  guestName: string;
}

const COMPRESS_TIMEOUT_MS = 15_000;

export default function ProofOfCleanUploader(
  { bookingId, guestName }: ProofOfCleanUploaderProps,
) {
  const [_file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const checklistComplete = useMemo(() => {
    return Object.keys(checklist).length > 0 &&
      Object.values(checklist).every(Boolean);
  }, [checklist]);

  const handleFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const selectedFile = input.files[0];
      setFile(selectedFile);
      setError(null);

      const reader = new FileReader();
      reader.onload = async (ev) => {
        const rawB64 = (ev.target?.result as string) ?? null;
        if (rawB64) {
          setIsCompressing(true);
          try {
            // Race compression against a hard timeout
            const compressed = await Promise.race([
              compressImage(rawB64),
              new Promise<string>((_resolve, reject) =>
                setTimeout(
                  () => reject(new Error("Compression timed out")),
                  COMPRESS_TIMEOUT_MS,
                )
              ),
            ]);
            setPreviewUrl(compressed);
          } catch (_err) {
            console.error("Compression failed, using original:", _err);
            setPreviewUrl(rawB64);
          } finally {
            setIsCompressing(false);
          }
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!previewUrl) return;

    setIsUploading(true);
    setError(null);
    setUploadProgress(10);

    try {
      // Simulate staged progress for UX since fetch doesn't expose upload progress natively
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 8, 85));
      }, 300);

      const response = await fetch("/api/caretaker/ready", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId,
          guestName,
          photoBase64: previewUrl.split(",")[1], // Strip raw Data URL prefix
          checklist,
        }),
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setUploadProgress(100);
      setSuccess(true);
      globalThis.setTimeout(() => {
        globalThis.location.reload();
      }, 1500);
    } catch (err: unknown) {
      const message = err instanceof Error
        ? err.message
        : "An error occurred during upload.";
      setError(message);
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  if (success) {
    return (
      <div class="mt-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-4 animate-fade-in">
        <div class="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xl shadow-sm">
          ✓
        </div>
        <div>
          <p class="text-sm font-bold text-gray-900 leading-tight">Property Ready!</p>
          <p class="text-xs font-medium text-emerald-600">Marked as ready for guest check-in.</p>
        </div>
      </div>
    );
  }

  return (
    <div class="mt-6 pt-6 border-t border-gray-100">
      <div class="flex items-center gap-4 mb-6">
        <div class="px-3 py-1 bg-white border border-gray-100 text-[11px] font-bold text-emerald-600 uppercase tracking-widest rounded-full shadow-sm">
          Cleaning Audit
        </div>
        <div class="h-px flex-1 bg-gray-100" />
      </div>

      <div class="mb-8 bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100">
        <CaretakerChecklist
          bookingId={bookingId}
          onComplete={setChecklist}
          disabled={isUploading}
        />
      </div>

      {!previewUrl
        ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isCompressing}
            class="w-full flex flex-col items-center justify-center gap-4 p-10 rounded-[2rem] border-2 border-dashed border-gray-100 bg-gray-50/30 hover:bg-white hover:border-emerald-500/50 hover:shadow-premium transition-all disabled:opacity-50 group"
          >
            {isCompressing
              ? (
                <div class="flex flex-col items-center gap-4">
                  <div class="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-emerald-500 animate-spin" />
                  <span class="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    Optimizing photo...
                  </span>
                </div>
              )
              : (
                <>
                  <div class="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                    📷
                  </div>
                  <div class="text-center">
                    <span class="block text-sm font-bold text-gray-900">Room Verification</span>
                    <span class="text-xs font-medium text-gray-400 mt-1 block">Take a photo of the prepared room</span>
                  </div>
                </>
              )}
          </button>
        )
        : (
          <div class="space-y-6">
            <div class="relative w-full h-48 rounded-[2rem] overflow-hidden border border-gray-100 shadow-premium-lg group">
              <img
                src={previewUrl}
                alt="Room condition"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreviewUrl(null);
                    setUploadProgress(0);
                  }}
                  class="bg-white text-gray-900 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-emerald-500 hover:text-white transition-all"
                >
                  Retake Photo
                </button>
              </div>
            </div>

            {error && (
              <div class="p-4 bg-rose-50 border border-rose-100 rounded-2xl animate-shake">
                <p class="text-xs font-bold text-rose-700 flex items-center gap-2">
                  <span>⚠️</span> {error}
                </p>
              </div>
            )}

            {/* Upload Progress Bar */}
            {isUploading && (
              <div class="space-y-2">
                <div class="flex justify-between items-center px-1">
                  <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Uploading Report</span>
                  <span class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{Math.round(uploadProgress)}%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    class="bg-emerald-500 h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    style={`width: ${uploadProgress}%`}
                  />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleUpload}
              disabled={isUploading || !checklistComplete}
              class="w-full py-4 rounded-2xl bg-gray-900 text-white font-bold text-sm uppercase tracking-widest shadow-premium hover:bg-emerald-500 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:grayscale"
            >
              {isUploading
                ? "Submitting Report..."
                : "Submit Cleaning Report"}
            </button>
          </div>
        )}

      <input
        type="file"
        accept="image/*"
        capture="environment"
        class="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}
