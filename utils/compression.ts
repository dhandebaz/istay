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

export function compressImage(
  dataUrl: string,
  maxWidth = 1200,
  quality = 0.7
): Promise<string> {
  // Skip compression if the raw data is already small
  if (dataUrl.length < SKIP_BELOW_BYTES) {
    return Promise.resolve(dataUrl);
  }

  const compress = new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(compressedDataUrl);
    };
    img.onerror = () => reject(new Error("Image failed to load for compression"));
  });

  const timeout = new Promise<never>((_resolve, reject) => {
    setTimeout(() => reject(new Error("Image compression timed out")), TIMEOUT_MS);
  });

  return Promise.race([compress, timeout]);
}
