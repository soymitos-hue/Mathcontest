import React from 'react';
import { X, History, Trash2, Trophy, Timer, Swords, Flame, Zap, Target } from 'lucide-react';
import { MatchRecord, AppTheme } from '../types/game';

interface HistoryModalProps {
  isOpen: boolean;
  history: MatchRecord[];
  onClearHistory: () => void;
  onClose: () => void;
  theme?: AppTheme;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  history,
  onClearHistory,
  onClose,
  theme = 'light',
}) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 select-none overflow-y-auto ${
        isLight ? 'bg-slate-900/40 backdrop-blur-sm' : 'bg-slate-950/85 backdrop-blur-md'
      }`}
      style={{ touchAction: 'auto' }}
    >
      <div className={`relative w-full max-w-xl border rounded-3xl shadow-2xl p-4 sm:p-6 max-h-[92vh] overflow-y-auto flex flex-col my-auto transition-colors ${
        isLight
          ? 'bg-white border-slate-200 text-slate-800'
          : 'bg-slate-900 border-slate-700/80 text-slate-100'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between pb-3.5 border-b shrink-0 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${
              isLight ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-indigo-500/15 border-indigo-400/30 text-indigo-300'
            }`}>
              <History className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className={`text-base sm:text-lg font-black leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Historial de Partidas
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Últimos 5 encuentros guardados en tu dispositivo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {history.length > 0 && (
              <button
                type="button"
                onClick={onClearHistory}
                className={`p-1.5 rounded-lg border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                  isLight
                    ? 'text-rose-700 hover:text-rose-800 hover:bg-rose-50 border-rose-200'
                    : 'text-rose-300 hover:text-rose-200 hover:bg-rose-950/40 border-rose-500/20'
                }`}
                title="Limpiar historial"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Limpiar</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isLight ? 'text-slate-400 hover:text-slate-800 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="py-4 space-y-3 overflow-y-auto flex-1 pr-1">
          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <div className="text-4xl">🏁</div>
              <div className={`font-bold text-sm ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Aún no hay partidas registradas
              </div>
              <p className={`text-xs max-w-xs mx-auto ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
                Completa un duelo o una sesión de entrenamiento para registrar tus estadísticas y comparar tu progreso.
              </p>
            </div>
          ) : (
            history.map((record, index) => {
              const isSolo = record.gameType === 'solo';
              const p1 = record.p1;
              const p2 = record.p2;

              return (
                <div
                  key={record.id}
                  className={`p-3.5 rounded-2xl border transition-all space-y-2.5 ${
                    isLight
                      ? 'bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-xs'
                      : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700/80'
                  }`}
                >
                  {/* Top Bar of Card */}
                  <div className={`flex items-center justify-between text-xs pb-1.5 border-b ${isLight ? 'border-slate-200/80' : 'border-slate-800/60'}`}>
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-[10px] font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        #{index + 1}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md font-bold text-[10px] flex items-center gap-1 ${
                          isSolo
                            ? isLight
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                            : isLight
                            ? 'bg-sky-100 text-sky-800 border border-sky-300'
                            : 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                        }`}
                      >
                        {isSolo ? <Timer className="w-3 h-3" /> : <Swords className="w-3 h-3" />}
                        <span>{isSolo ? 'Entrenamiento' : 'Duelo'}</span>
                      </span>

                      <span className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        {record.difficulty === 'easy'
                          ? 'Fácil'
                          : record.difficulty === 'medium'
                          ? 'Medio'
                          : 'Difícil'}{' '}
                        · Meta: {record.targetScore}
                      </span>
                    </div>

                    <div className={`text-[11px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      {record.dateStr}
                    </div>
                  </div>

                  {/* Main Outcome */}
                  {isSolo ? (
                    /* Solo Card Details */
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{p1.avatar}</span>
                        <div>
                          <div className={`font-extrabold text-sm ${isLight ? 'text-sky-900' : 'text-sky-200'}`}>
                            {p1.name}
                          </div>
                          <div className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                            Tiempo total: <strong className={isLight ? 'text-amber-800' : 'text-amber-300'}>{record.durationSec}s</strong>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-right text-xs">
                        <div>
                          <div className={`font-mono font-black text-sm ${isLight ? 'text-sky-800' : 'text-sky-300'}`}>
                            {p1.accuracy}%
                          </div>
                          <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>precisión</div>
                        </div>
                        <div>
                          <div className={`font-mono font-black text-sm ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>
                            {p1.avgTime.toFixed(1)}s
                          </div>
                          <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>por op.</div>
                        </div>
                        <div>
                          <div className={`font-mono font-black text-sm ${isLight ? 'text-rose-800' : 'text-rose-300'}`}>
                            🔥 {p1.maxStreak}
                          </div>
                          <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>racha</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Duel Card Details */
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {/* Player 1 (Blue) */}
                        <div
                          className={`p-2 rounded-xl border ${
                            p1.isWinner
                              ? isLight
                                ? 'bg-sky-50 border-sky-300 text-sky-950 ring-1 ring-sky-300'
                                : 'bg-sky-500/15 border-sky-400/40 text-sky-100 ring-1 ring-sky-300/30'
                              : isLight
                              ? 'bg-white border-slate-200 text-slate-700'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1 font-bold truncate max-w-[120px]">
                              <span>{p1.avatar}</span>
                              <span className="truncate">{p1.name}</span>
                            </span>
                            {p1.isWinner && (
                              <span className={`text-[10px] font-black ${isLight ? 'text-amber-700' : 'text-amber-300'}`}>
                                🏆 Ganador
                              </span>
                            )}
                          </div>
                          <div className={`mt-1 flex items-center justify-between text-[11px] font-mono ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                            <span>{p1.score} pts</span>
                            <span>{p1.accuracy}% acc</span>
                            <span>{p1.avgTime.toFixed(1)}s</span>
                          </div>
                        </div>

                        {/* Player 2 (Red) */}
                        {p2 && (
                          <div
                            className={`p-2 rounded-xl border ${
                              p2.isWinner
                                ? isLight
                                  ? 'bg-rose-50 border-rose-300 text-rose-950 ring-1 ring-rose-300'
                                  : 'bg-rose-500/15 border-rose-400/40 text-rose-100 ring-1 ring-rose-300/30'
                                : isLight
                                ? 'bg-white border-slate-200 text-slate-700'
                                : 'bg-slate-900/60 border-slate-800 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1 font-bold truncate max-w-[120px]">
                                <span>{p2.avatar}</span>
                                <span className="truncate">{p2.name}</span>
                              </span>
                              {p2.isWinner && (
                                <span className={`text-[10px] font-black ${isLight ? 'text-amber-700' : 'text-amber-300'}`}>
                                  🏆 Ganador
                                </span>
                              )}
                            </div>
                            <div className={`mt-1 flex items-center justify-between text-[11px] font-mono ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                              <span>{p2.score} pts</span>
                              <span>{p2.accuracy}% acc</span>
                              <span>{p2.avgTime.toFixed(1)}s</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className={`text-[10px] flex items-center justify-between px-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        <span>⏱️ Duración: {record.durationSec}s</span>
                        <span>🔥 Rachas: {p1.name} ({p1.maxStreak}) vs {p2?.name} ({p2?.maxStreak})</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className={`pt-3 border-t flex items-center justify-end text-xs shrink-0 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-5 py-2 rounded-xl font-bold transition-colors cursor-pointer ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            Cerrar Historial
          </button>
        </div>
      </div>
    </div>
  );
};
