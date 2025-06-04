
export const GEMINI_MODEL_TEXT = "gemini-2.5-flash-preview-04-17";
export const IMAGEN_MODEL = "imagen-3.0-generate-002";

export const START_NODE_ID = "T0_HR_EMAIL"; // Updated for The Housemaid story

// New: Control flag for image generation
// Set to false to disable calls to the Imagen API and prevent 429 errors.
// Set to true to attempt to generate images (will use fallback on error).
export const ENABLE_IMAGE_GENERATION = false;

// OBSOLETE - System prompt for tree node generation is no longer needed
// as scene descriptions are taken directly from the storyTree.
// export const SYSTEM_PROMPT_FOR_TREE_NODE_GENERATION = `...`;
