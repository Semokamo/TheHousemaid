
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
// StorySegment is not directly used here anymore, but types might be relevant if more complex logic were added.
// import { StorySegment } from '../types'; 
import { GEMINI_MODEL_TEXT, IMAGEN_MODEL } from '../constants';

// This interface is no longer needed as scene details are not fetched from Gemini
// interface GeminiGeneratedSceneDetails {
//   sceneDescription: string;
//   imagePrompt: string;
// }

export class GeminiService {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("API key is required to initialize GeminiService.");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  // Method for generating scene details from Gemini is removed.
  // Scene descriptions will be taken directly from storyTree.ts.
  // Image prompts will use the imagePromptSeed from storyTree.ts directly.

  async generateImageForScene(prompt: string): Promise<string> {
    try {
      // The prompt received here is the imagePromptSeed from the storyTree node
      const response = await this.ai.models.generateImages({
        model: IMAGEN_MODEL,
        prompt: prompt, 
        config: { numberOfImages: 1, outputMimeType: 'image/jpeg', aspectRatio: "16:9"},
      });

      if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image?.imageBytes) {
        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
      } else {
        console.warn("No image data returned from Imagen API for prompt:", prompt, "Response:", response);
        throw new Error("No image data returned from Imagen API.");
      }
    } catch (error) {
      console.error("Error in generateImageForScene:", error);
       if (error instanceof Error) {
         throw new Error(`Imagen API error: ${error.message}`);
      }
      throw new Error("Unknown Imagen API error.");
    }
  }
}
