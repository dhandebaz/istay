import { type Handlers } from "$fresh/server.ts";
import { callGeminiVision } from "../../../utils/gemini.ts";

export const handler: Handlers = {
  POST: async (req) => {
    try {
      const { imageBase64 } = await req.json();

      if (!imageBase64) {
        return Response.json(
          { error: "imageBase64 is required" },
          { status: 400 },
        );
      }

      const prompt = `Transcribe every detail from this hospitality document into a structured Markdown knowledge base format suitable for an AI concierge. 
Focus on:
1. WiFi details (network name, password)
2. Check-in/Check-out times
3. House rules
4. Amenities instructions
Format cleanly with Markdown headers and bullet points.`;

      const result = await callGeminiVision({
        prompt: prompt,
        imageBase64: imageBase64,
        systemPrompt: "You are a precise data extraction specialist. Output ONLY the parsed markdown content. Do not include introductory text like 'Here is the transcription:'",
      });

      return Response.json({ text: result.text });
    } catch (error: any) {
      console.error("[knowledge/ocr] Error:", error);
      return Response.json(
        { error: error.message || "Failed to process image" },
        { status: 500 },
      );
    }
  },
};
