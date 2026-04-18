/**
 * Compresses an image using HTML5 Canvas.
 * Includes a timeout guard for low-memory mobile devices and
 * a size check to skip compression on small images.
 *
 * @param dataUrl The base64 data URL of the image.
 * @param maxWidth The maximum width of the output image.
 * @param quality The quality of the output image (0-1).
 * @returns A promise that resolves to the compressed base64 data URL.
 */

const TIMEOUT_MS = 10_000;
const SKIP_BELOW_BYTES = 500_000; // 500 KB — no point compressing small images

const workerCode = `
self.onmessage = async (e) => {
  const { dataUrl, maxWidth, quality } = e.data;
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const bitmap = await createImageBitmap(blob);
    
    let width = bitmap.width;
    let height = bitmap.height;
    
    if (width > maxWidth) {
      height = (maxWidth / width) * height;
      width = maxWidth;
    }
    
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get OffscreenCanvas context");
    
    ctx.drawImage(bitmap, 0, 0, width, height);
    
    const outBlob = await canvas.convertToBlob({ type: "image/jpeg", quality });
    self.postMessage({ success: true, blob: outBlob });
  } catch (err) {
    self.postMessage({ success: false, error: err.message });
  }
};
`;

let workerUrl: string | null = null;
function getWorkerObj(): Worker | null {
  if (typeof Worker === "undefined") return null;
  if (!workerUrl) {
    const blob = new Blob([workerCode], { type: "application/javascript" });
    workerUrl = URL.createObjectURL(blob);
  }
  return new Worker(workerUrl);
}

export function compressImage(
  dataUrl: string,
  maxWidth = 1200,
  quality = 0.7,
): Promise<string> {
  if (dataUrl.length < SKIP_BELOW_BYTES) {
    return Promise.resolve(dataUrl);
  }

  const compress = new Promise<string>((resolve, reject) => {
    // Fallback if browser entirely lacks OffscreenCanvas or WebWorker support
    // Usually Safari < 16.4 for OffscreenCanvas
    if (
      typeof OffscreenCanvas === "undefined" || typeof Worker === "undefined"
    ) {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Could not get canvas context"));

        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () =>
        reject(new Error("Image failed to load for compression"));
      return;
    }

    const worker = getWorkerObj();
    if (!worker) return reject(new Error("Worker not available"));

    const timeoutId = setTimeout(() => {
      worker.terminate();
      reject(new Error("Worker compression timed out"));
    }, TIMEOUT_MS);

    worker.onmessage = (e) => {
      clearTimeout(timeoutId);
      if (e.data.success) {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(e.data.blob);
      } else {
        reject(new Error(e.data.error));
      }
      worker.terminate();
    };

    worker.onerror = (e) => {
      clearTimeout(timeoutId);
      worker.terminate();
      reject(new Error(e.message));
    };

    worker.postMessage({ dataUrl, maxWidth, quality });
  });

  const timeoutGuard = new Promise<never>((_resolve, reject) => {
    setTimeout(
      () => reject(new Error("Image compression timed out")),
      TIMEOUT_MS + 500,
    );
  });

  return Promise.race([compress, timeoutGuard]);
}
