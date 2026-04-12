import { useState, useRef, useMemo } from "preact/hooks";
import CaretakerChecklist from "./CaretakerChecklist.tsx";
import { compressImage } from "../utils/compression.ts";

interface ProofOfCleanUploaderProps {
  bookingId: string;
  guestName: string;
}

export default function ProofOfCleanUploader({ bookingId, guestName }: ProofOfCleanUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const checklistComplete = useMemo(() => {
    return Object.keys(checklist).length > 0 && Object.values(checklist).every(Boolean);
  }, [checklist]);

  const handleFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const selectedFile = input.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = async (e) => {
        const rawB64 = (e.target?.result as string) ?? null;
        if (rawB64) {
          try {
            setPreviewUrl(await compressImage(rawB64));
          } catch (err) {
            console.error("Compression failed:", err);
            setPreviewUrl(rawB64);
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

    try {
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

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setSuccess(true);
      globalThis.setTimeout(() => {
        globalThis.location.reload();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  if (success) {
    return (
      <div class="mt-4 p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center gap-3">
        <span class="text-xl">✨</span>
        <p class="text-sm font-600 text-teal-400">Room marked as ready!</p>
      </div>
    );
  }

  return (
    <div class="mt-4 pt-4 border-t border-gray-800">
      <h3 class="text-xs font-600 text-gray-400 uppercase tracking-widest mb-3">Housekeeping</h3>
      
      <div class="mb-6">
        <CaretakerChecklist 
          bookingId={bookingId} 
          onComplete={setChecklist} 
          disabled={isUploading} 
        />
      </div>
      
      {!previewUrl ? (
        <button
          onClick={() => fileInputRef.current?.click()}
          class="w-full flex flex-col items-center justify-center gap-2 p-6 rounded-xl border border-dashed border-gray-700 bg-gray-900/50 hover:bg-gray-800 hover:border-gray-600 transition-colors"
        >
          <span class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
            📷
          </span>
          <span class="text-sm font-600 text-gray-300">Take a photo of the clean room</span>
        </button>
      ) : (
        <div class="space-y-4">
          <div class="relative w-full h-32 rounded-xl overflow-hidden border border-gray-700 group">
            <img src={previewUrl} alt="Room condition" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => { setFile(null); setPreviewUrl(null); }}
                class="text-sm font-600 text-white bg-black/50 px-3 py-1.5 rounded-lg"
              >
                Retake
              </button>
            </div>
          </div>
          
          {error && (
            <p class="text-xs font-500 text-rose-400">{error}</p>
          )}

          <button
            onClick={handleUpload}
            disabled={isUploading || !checklistComplete}
            class="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-95 text-gray-950 font-800 text-sm transition-all disabled:opacity-50 disabled:active:scale-100 disabled:grayscale"
          >
            {isUploading ? "Uploading..." : "Mark Room as Ready"}
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
