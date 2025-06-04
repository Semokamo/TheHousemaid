
export interface Choice {
  text: string;
  nextSceneId?: string; // Used by the story tree
}

export interface StorySegment {
  sceneDescription: string;
  imagePrompt: string;
  choices: Choice[];
  gameOver: boolean;
  gameWin: boolean;
  message?: string;
  sceneId?: string; // Optional: to track current scene from the tree
  endingType?: 'win' | 'lose' | 'neutral'; // Added to specify the type of ending
}

// New types for the predefined story tree
export interface StoryTreeNode {
  id: string;
  timelineTitle?: string; // Short title for display in the rewind timeline
  scenePromptForGemini: string; // Detailed prompt for Gemini to generate sceneDescription
  imagePromptSeed: string; // Seed/base for Gemini to generate a full imagePrompt
  choices: Array<{
    text: string;
    nextSceneId: string;
  }>;
  isEnding?: boolean;
  endingType?: 'win' | 'lose' | 'neutral';
  message?: string;
}

export type StoryTree = Record<string, StoryTreeNode>;