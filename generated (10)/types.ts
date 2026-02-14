export interface DesignVersion {
  id: string;
  timestamp: number;
  prompt: string;
  code: string;
  thumbnail?: string; // Placeholder for future implementation
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export enum AppState {
  AUTH = 'AUTH',
  DESIGN = 'DESIGN',
}
