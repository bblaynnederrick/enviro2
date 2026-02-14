import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an expert Frontend Architect and UI Designer specializing in Tailwind CSS.
Your task is to generate production-ready, responsive HTML snippets styled with Tailwind CSS utility classes.

Rules:
1. Return ONLY valid HTML code. Do not include markdown code blocks.
2. Do not include the <html>, <head>, or <body> tags. Just return the content that goes inside the <body>.
3. Use semantic HTML5 elements.
4. Ensure designs are mobile-responsive (use sm:, md:, lg: prefixes).
5. Use highly aesthetic, modern design patterns (clean whitespace, nice typography, consistent spacing).
6. Do not include external JavaScript or CSS files. Use Tailwind classes for all styling.
7. If the user asks for a modification, return the FULL updated HTML code, not just the diff.
`;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDesignCode = async (prompt: string, currentCode?: string): Promise<string> => {
  try {
    let fullPrompt = prompt;
    if (currentCode) {
      fullPrompt = `
      Current Code:
      ${currentCode}

      User Modification Request:
      ${prompt}

      Return the complete updated HTML code.
      `;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const text = response.text || '';
    return text.replace(/```html/g, '').replace(/```/g, '').trim();
  } catch (error) {
    console.error("Error generating design:", error);
    throw new Error("Failed to generate design.");
  }
};