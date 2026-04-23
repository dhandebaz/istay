import { useRef, useState } from "preact/hooks";

interface KnowledgeUploaderProps {
  onScanComplete: (markdown: string) => void;
}

export default function KnowledgeUploader(
  { onScanComplete }: KnowledgeUploaderProps,
) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    // Quick validation
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file (JPEG, PNG).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setIsScanning(true);
    setError(null);

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
      });

      const res = await fetch("/api/knowledge/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to scan document.");
      }

      onScanComplete(data.text);

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err: any) {
      setError(err.message || "An unknown error occurred during scanning.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div class="mb-10">
      <div
        class={`relative flex flex-col items-center justify-center p-12 border-[4px] border-dashed rounded-[2.5rem] transition-all duration-300 group shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${
          isScanning
            ? "border-mint-500 bg-mint-50/50 shadow-[12px_12px_0px_0px_#4ade80]"
            : "border-gray-200 bg-gray-50 hover:bg-white hover:border-mint-400 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={isScanning}
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          title="Upload physical house rules"
        />

        {isScanning
          ? (
            <div class="flex flex-col items-center justify-center text-center">
              <div class="w-20 h-20 border-[6px] border-gray-900 border-t-mint-500 rounded-full animate-spin mb-6" />
              <p class="text-xs font-950 text-gray-900 uppercase tracking-[0.3em]">
                SCANNING_DOCUMENT...
              </p>
              <p class="text-[10px] text-mint-600 font-800 uppercase tracking-widest mt-2">
                EXTRACTING_KNOWLEDGE_KERNEL
              </p>
            </div>
          )
          : (
            <div class="flex flex-col items-center justify-center text-center pointer-events-none">
              <div class="w-20 h-20 rounded-[2rem] bg-white border-[3px] border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-6 text-4xl group-hover:rotate-[-5deg] transition-transform">
                📷
              </div>
              <h4 class="text-sm font-950 text-gray-900 uppercase tracking-widest mb-2">
                Scan_Rules_Protocol
              </h4>
              <p class="text-[10px] text-gray-400 font-800 uppercase tracking-widest max-w-[250px] leading-relaxed">
                UPLOAD A PHOTO OF PHYSICAL HOUSE RULES OR WIFI SIGN FOR AUTOMATED INGESTION.
              </p>
            </div>
          )}
      </div>

      {error && (
        <div class="mt-6 p-6 rounded-2xl bg-rose-50 border-[3px] border-rose-900 shadow-[6px_6px_0px_0px_#9f1239] animate-shake">
          <p class="text-[10px] font-950 text-rose-900 uppercase tracking-widest flex items-center justify-center gap-3">
             <span class="text-lg">⚠️</span>
             SCAN_FAILURE: {error}
          </p>
        </div>
      )}
    </div>
  );
}
