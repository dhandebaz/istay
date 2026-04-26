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
        class={`relative flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-[2.5rem] transition-all duration-300 group shadow-premium ${
          isScanning
            ? "border-emerald-500 bg-emerald-50/30"
            : "border-gray-100 bg-gray-50/50 hover:bg-white hover:border-emerald-300 hover:-translate-y-1 hover:shadow-premium-hover"
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
              <div class="w-16 h-16 border-4 border-gray-100 border-t-emerald-500 rounded-full animate-spin mb-6 shadow-sm" />
              <p class="text-sm font-bold text-gray-900 uppercase tracking-widest animate-pulse">
                Scanning Document...
              </p>
              <p class="text-[11px] text-emerald-600 font-bold uppercase tracking-widest mt-2">
                Extracting property details
              </p>
            </div>
          )
          : (
            <div class="flex flex-col items-center justify-center text-center pointer-events-none">
              <div class="w-20 h-20 rounded-[1.5rem] bg-white border border-gray-100 shadow-premium flex items-center justify-center mb-6 text-4xl group-hover:scale-110 transition-transform">
                📷
              </div>
              <h4 class="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2">
                Import from Photo
              </h4>
              <p class="text-[11px] text-gray-400 font-medium max-w-[280px] leading-relaxed">
                Upload a photo of your house rules or WiFi sign to automatically import details into your knowledge base.
              </p>
            </div>
          )}
      </div>

      {error && (
        <div class="mt-6 p-6 rounded-2xl bg-rose-50 border border-rose-100 shadow-premium animate-shake">
          <p class="text-xs font-bold text-rose-900 flex items-center justify-center gap-3">
             <span class="text-lg">⚠️</span>
             Scan failed: {error}
          </p>
        </div>
      )}
    </div>
  );
}
