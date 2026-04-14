import { S3Client } from "s3_lite_client";

const endpoint = Deno.env.get("R2_S3_URL_ENDPOINT") || "";
const accessKey = Deno.env.get("R2_S3_ACCESS_KEY") || "";
const secretKey = Deno.env.get("R2_S3_SECURITY_ACCESS_KEY") || "";
const bucket = Deno.env.get("R2_BUCKET_NAME") || "istay";

const s3Client = new S3Client({
  endPoint: endpoint.replace("https://", ""),
  accessKey,
  secretKey,
  bucket,
  region: "auto",
  useSSL: true,
});

/**
 * Uploads a file to Cloudflare R2.
 * Returns a signed URL (default) or a public URL if isPublic is true.
 */
export async function uploadToR2(
  buffer: Uint8Array,
  path: string,
  mimeType: string,
  isPublic = false,
): Promise<string> {
  await s3Client.putObject(path, buffer, {
    metadata: { "Content-Type": mimeType },
  });

  if (isPublic) {
    return getPublicUrl(path);
  }
  return await getSignedUrl(path);
}

/**
 * Generates a presigned GET URL for a private object.
 */
export async function getSignedUrl(path: string, seconds = 3600): Promise<string> {
  return await s3Client.presignedGetObject(path, { expirySeconds: seconds });

}

/**
 * Returns a public URL for an object.
 * Note: Requires the bucket to be configured for public access.
 */
export function getPublicUrl(path: string): string {
  // If user has a custom domain for R2, they should provide it.
  // Fallback to S3 endpoint format which works for most R2 public setups if enabled.
  return `${endpoint}/${path}`;
}

/**
 * Deletes an object from R2.
 */
export async function deleteFromR2(path: string): Promise<void> {
  await s3Client.deleteObject(path);
}
