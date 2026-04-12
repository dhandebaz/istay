/**
 * Compresses an image using HTML5 Canvas.
 * @param dataUrl The base64 data URL of the image.
 * @param maxWidth The maximum width of the output image.
 * @param quality The quality of the output image (0-1).
 * @returns A promise that resolves to the compressed base64 data URL.
 */
export async function compressImage(
  dataUrl: string,
  maxWidth = 1200,
  quality = 0.7
): Promise<string> {
  return new Promise((resolve, reject) => {
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
    img.onerror = (err) => reject(err);
  });
}
