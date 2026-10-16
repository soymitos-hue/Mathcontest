import { DifficultyLevel, OperationType } from '../utils/mathGenerator';

export type GameViewMode = 'face-to-face' | 'side-by-side';
export type GamePlayType = 'duel' | 'solo';
export type AppTheme = 'light' | 'dark';

export interface PlayerConfig {
  id: 'p1' | 'p2';
  name: string;
  avatar: string;
  colorScheme: 'blue' | 'red';
}

export interface PlayerStats {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  totalAttempts: number;
  accuracy: number;
  maxStreak: number;
  avgResponseTimeSec: number;
}

export interface MatchRecord {
  id: string;
  timestamp: number;
  dateStr: string;
  gameType: GamePlayType;
  difficulty: DifficultyLevel;
  targetScore: number;
  durationSec: number;
  p1: {
    name: string;
    avatar: string;
    score: number;
    accuracy: number;
    avgTime: number;
    maxStreak: number;
    isWinner: boolean;
  };
  p2?: {
    name: string;
    avatar: string;
    score: number;
    accuracy: number;
    avgTime: number;
    maxStreak: number;
    isWinner: boolean;
  };
}

export interface GameSettings {
  gameType: GamePlayType; // 'duel' (2 jugadores) o 'solo' (entrenamiento 1 jugador)
  targetScore: number;
  difficulty: DifficultyLevel;
  operations: OperationType[];
  viewMode: GameViewMode;
  soundEnabled: boolean;
  theme: AppTheme;
  p1: PlayerConfig;
  p2: PlayerConfig;
}

export const AVATAR_LIST = [
  { id: 'rocket', emoji: '🚀', label: 'Cohete' },
  { id: 'racecar', emoji: '🏎️', label: 'Bólido' },
  { id: 'ufo', emoji: '🛸', label: 'Ovni' },
  { id: 'bike', emoji: '🏍️', label: 'Moto' },
  { id: 'airplane', emoji: '✈️', label: 'Avión' },
  { id: 'train', emoji: '🚂', label: 'Tren' },
  { id: 'lion', emoji: '🦁', label: 'León' },
  { id: 'tiger', emoji: '🐯', label: 'Tigre' },
  { id: 'eagle', emoji: '🦅', label: 'Águila' },
  { id: 'wolf', emoji: '🐺', label: 'Lobo' },
  { id: 'fox', emoji: '🦊', label: 'Zorro' },
  { id: 'dolphin', emoji: '🐬', label: 'Delfín' },
  { id: 'robot', emoji: '🤖', label: 'Robot' },
  { id: 'wizard', emoji: '🧙', label: 'Mago' },
  { id: 'dino', emoji: '🦖', label: 'T-Rex' },
  { id: 'lightning', emoji: '⚡', label: 'Rayo' },
  { id: 'star', emoji: '🌟', label: 'Estrella' },
  { id: 'trophy', emoji: '🏆', label: 'Campeón' },
];

export const DEFAULT_SETTINGS: GameSettings = {
  gameType: 'duel',
  targetScore: 10,
  difficulty: 'easy',
  operations: ['add', 'sub'],
  viewMode: 'face-to-face',
  soundEnabled: true,
  theme: 'light',
  p1: {
    id: 'p1',
    name: 'Equipo Azul',
    avatar: '🚀',
    colorScheme: 'blue',
  },
  p2: {
    id: 'p2',
    name: 'Equipo Rojo',
    avatar: '🏎️',
    colorScheme: 'red',
  },
};
