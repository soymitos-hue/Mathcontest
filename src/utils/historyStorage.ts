import { MatchRecord } from '../types/game';

const STORAGE_KEY = 'carrera_matematica_history_v1';
const MAX_HISTORY_ITEMS = 5;

export function loadMatchHistory(): MatchRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.slice(0, MAX_HISTORY_ITEMS);
    }
    return [];
  } catch {
    return [];
  }
}

export function saveMatchRecord(
  data: Omit<MatchRecord, 'id' | 'timestamp' | 'dateStr'>
): MatchRecord[] {
  try {
    const current = loadMatchHistory();
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString([], { month: 'short', day: 'numeric' });

    const newRecord: MatchRecord = {
      ...data,
      id: `match_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      dateStr: `${dateStr} · ${timeStr}`,
    };

    const updated = [newRecord, ...current].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearMatchHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failure
  }
}
