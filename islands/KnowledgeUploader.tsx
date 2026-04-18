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
    <div class="mb-6">
      <div
        class={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-all duration-300 ${
          isScanning
            ? "border-mint-400 bg-mint-50/50"
            : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-mint-300"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={isScanning}
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          title="Upload physical house rules"
        />

        {isScanning
          ? (
            <div class="flex flex-col items-center justify-center text-center">
              <span class="inline-flex w-12 h-12 items-center justify-center mb-4">
                <span class="w-8 h-8 border-4 border-mint-500 border-t-transparent rounded-full animate-spin" />
              </span>
              <p class="text-sm font-700 text-mint-700">
                AI is scanning document...
              </p>
              <p class="text-xs text-mint-600/70 mt-1">
                Extracting WiFi and rules
              </p>
            </div>
          )
          : (
            <div class="flex flex-col items-center justify-center text-center pointer-events-none">
              <div class="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-2xl">
                📷
              </div>
              <p class="text-sm font-700 text-gray-900">
                Scan Rules from Photo
              </p>
              <p class="text-xs text-gray-500 mt-1 max-w-[200px]">
                Tap to upload a photo of your physical house rules card or WiFi
                sign
              </p>
            </div>
          )}
      </div>

      {error && (
        <p class="mt-3 text-xs font-600 text-rose-500 text-center bg-rose-50 py-2 rounded-lg">
          {error}
        </p>
      )}
    </div>
  );
}
