// ================================================================
// utils/gemini.ts — Gemini Flash-Lite API client for istay.space
//
// Zero dependencies. Uses Deno's native fetch to call the
// Google AI Studio REST API (generativelanguage.googleapis.com).
//
// Model: gemini-2.0-flash-lite ($0.075/1M input, $0.30/1M output)
// ================================================================

const GEMINI_API_KEY = () => Deno.env.get("GEMINI_API_KEY") ?? "";
const MODEL = "gemini-2.0-flash-lite";
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

// ── Types ─────────────────────────────────────────────────────

export interface GeminiTextOptions {
  /** The user prompt */
  prompt: string;
  /** System instruction (injected as systemInstruction) */
  systemPrompt?: string;
  /** Conversation history (for multi-turn chat) */
  history?: Array<{ role: "user" | "model"; content: string }>;
  /** Controls randomness. 0=deterministic, 1=creative. Default: 0.3 */
  temperature?: number;
  /** Max output tokens. Default: 1024 */
  maxOutputTokens?: number;
  /** If true, forces Gemini to return valid JSON */
  jsonMode?: boolean;
}

export interface GeminiVisionOptions {
  /** The text prompt accompanying the image */
  prompt: string;
  /** System instruction */
  systemPrompt?: string;
  /** Base64-encoded image data (without data:image/... prefix) */
  imageBase64: string;
  /** MIME type of the image. Default: "image/jpeg" */
  imageMimeType?: string;
  temperature?: number;
  maxOutputTokens?: number;
  jsonMode?: boolean;
}

export interface GeminiResponse {
  /** The generated text */
  text: string;
  /** Estimated input token count */
  inputTokens?: number;
  /** Estimated output token count */
  outputTokens?: number;
  /** Whether the response was truncated */
  truncated: boolean;
  /** Raw finish reason from API */
  finishReason?: string;
}

// ── Helpers ───────────────────────────────────────────────────

/**
 * Strip data-URI prefix from base64 strings.
 * "data:image/jpeg;base64,/9j/4A..." → "/9j/4A..."
 */
export function stripDataUri(b64: string): { data: string; mime: string } {
  const match = b64.match(/^data:([^;]+);base64,(.+)$/s);
  if (match) {
    return { data: match[2], mime: match[1] };
  }
  return { data: b64, mime: "image/jpeg" };
}

/**
 * Builds the generationConfig block.
 */
function buildGenerationConfig(opts: {
  temperature?: number;
  maxOutputTokens?: number;
  jsonMode?: boolean;
}) {
  const config: Record<string, unknown> = {
    temperature: opts.temperature ?? 0.3,
    maxOutputTokens: opts.maxOutputTokens ?? 1024,
    topP: 0.95,
    topK: 40,
  };
  if (opts.jsonMode) {
    config.responseMimeType = "application/json";
  }
  return config;
}

/**
 * Builds safety settings (permissive for OCR/KYC content).
 */
function buildSafetySettings() {
  return [
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
  ];
}

/**
 * Parse the Gemini API response into our clean GeminiResponse.
 */
function parseResponse(data: Record<string, unknown>): GeminiResponse {
  const candidates = data.candidates as Array<Record<string, unknown>> | undefined;
  if (!candidates || candidates.length === 0) {
    // Check for prompt feedback (blocked)
    const promptFeedback = data.promptFeedback as Record<string, unknown> | undefined;
    if (promptFeedback?.blockReason) {
      return {
        text: `[Blocked: ${promptFeedback.blockReason}]`,
        truncated: false,
        finishReason: "BLOCKED",
      };
    }
    return { text: "[No response generated]", truncated: false, finishReason: "UNKNOWN" };
  }

  const candidate = candidates[0];
  const content = candidate.content as Record<string, unknown> | undefined;
  const parts = content?.parts as Array<{ text?: string }> | undefined;
  const text = parts?.map((p) => p.text ?? "").join("") ?? "";

  const finishReason = candidate.finishReason as string | undefined;

  // Token usage
  const usageMeta = data.usageMetadata as Record<string, number> | undefined;

  return {
    text: text.trim(),
    inputTokens: usageMeta?.promptTokenCount,
    outputTokens: usageMeta?.candidatesTokenCount,
    truncated: finishReason === "MAX_TOKENS",
    finishReason,
  };
}

// ── Main API Calls ────────────────────────────────────────────

/**
 * Call Gemini Flash-Lite with a text-only prompt.
 * Supports multi-turn conversation via `history`.
 */
export async function callGemini(opts: GeminiTextOptions): Promise<GeminiResponse> {
  const apiKey = GEMINI_API_KEY();
  if (!apiKey) {
    console.warn("[gemini] GEMINI_API_KEY not set — returning mock response");
    return {
      text: "AI features require GEMINI_API_KEY. Please set it in your .env file.",
      truncated: false,
      finishReason: "MOCK",
    };
  }

  // Build contents array (history + current message)
  const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

  if (opts.history) {
    for (const msg of opts.history) {
      contents.push({
        role: msg.role,
        parts: [{ text: msg.content }],
      });
    }
  }

  contents.push({
    role: "user",
    parts: [{ text: opts.prompt }],
  });

  const body: Record<string, unknown> = {
    contents,
    generationConfig: buildGenerationConfig(opts),
    safetySettings: buildSafetySettings(),
  };

  if (opts.systemPrompt) {
    body.systemInstruction = {
      parts: [{ text: opts.systemPrompt }],
    };
  }

  const url = `${BASE_URL}/${MODEL}:generateContent?key=${apiKey}`;

  const res = await fetchWithRetry(url, body);
  const data = await res.json();

  if (!res.ok) {
    console.error("[gemini] API error:", data);
    throw new GeminiError(
      data.error?.message ?? `HTTP ${res.status}`,
      res.status,
    );
  }

  const result = parseResponse(data);

  console.log(
    `[gemini] Text call: in=${result.inputTokens ?? "?"} out=${result.outputTokens ?? "?"} finish=${result.finishReason}`,
  );

  return result;
}

/**
 * Call Gemini Flash-Lite with an image (multimodal / vision).
 * Used for OCR / ID verification.
 */
export async function callGeminiVision(opts: GeminiVisionOptions): Promise<GeminiResponse> {
  const apiKey = GEMINI_API_KEY();
  if (!apiKey) {
    console.warn("[gemini] GEMINI_API_KEY not set — returning mock OCR response");
    return {
      text: JSON.stringify({
        name: "Mock User",
        dob: "1990-01-01",
        id_number: "XXXX-XXXX-1234",
        address: "Mock Address",
        match_score: 50,
        flags: ["mock_mode"],
      }),
      truncated: false,
      finishReason: "MOCK",
    };
  }

  const { data: imageData, mime: detectedMime } = stripDataUri(opts.imageBase64);
  const mimeType = opts.imageMimeType ?? detectedMime;

  const body: Record<string, unknown> = {
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType,
              data: imageData,
            },
          },
          {
            text: opts.prompt,
          },
        ],
      },
    ],
    generationConfig: buildGenerationConfig(opts),
    safetySettings: buildSafetySettings(),
  };

  if (opts.systemPrompt) {
    body.systemInstruction = {
      parts: [{ text: opts.systemPrompt }],
    };
  }

  const url = `${BASE_URL}/${MODEL}:generateContent?key=${apiKey}`;

  const res = await fetchWithRetry(url, body);
  const data = await res.json();

  if (!res.ok) {
    console.error("[gemini-vision] API error:", data);
    throw new GeminiError(
      data.error?.message ?? `HTTP ${res.status}`,
      res.status,
    );
  }

  const result = parseResponse(data);

  console.log(
    `[gemini-vision] Vision call: in=${result.inputTokens ?? "?"} out=${result.outputTokens ?? "?"} finish=${result.finishReason}`,
  );

  return result;
}

// ── Retry Logic ───────────────────────────────────────────────

const MAX_RETRIES = 2;
const RETRY_DELAYS = [1000, 3000]; // ms

async function fetchWithRetry(url: string, body: unknown): Promise<Response> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // Retry on rate limit (429) or server error (5xx)
      if ((res.status === 429 || res.status >= 500) && attempt < MAX_RETRIES) {
        const delay = RETRY_DELAYS[attempt] ?? 3000;
        console.warn(
          `[gemini] HTTP ${res.status}, retrying in ${delay}ms (attempt ${attempt + 1}/${MAX_RETRIES})`,
        );
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }

      return res;
    } catch (err) {
      if (attempt < MAX_RETRIES) {
        const delay = RETRY_DELAYS[attempt] ?? 3000;
        console.warn(`[gemini] Network error, retrying in ${delay}ms:`, err);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      throw err;
    }
  }

  // Should not reach here, but TypeScript needs a return
  throw new Error("[gemini] Max retries exceeded");
}

// ── Error Class ───────────────────────────────────────────────

export class GeminiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "GeminiError";
    this.status = status;
  }
}
