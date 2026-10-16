import React from 'react';
import { Keypad } from './Keypad';
import { MathProblem } from '../utils/mathGenerator';
import { PlayerConfig, GameViewMode, AppTheme } from '../types/game';

interface PlayerArenaProps {
  player: PlayerConfig;
  problem: MathProblem | null;
  inputBuffer: string;
  score: number;
  targetScore: number;
  streak: number;
  flashState: 'correct' | 'wrong' | null;
  viewMode: GameViewMode;
  isRotated180: boolean;
  theme?: AppTheme;
  onDigit: (digit: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  gameActive: boolean;
}

export const PlayerArena: React.FC<PlayerArenaProps> = ({
  player,
  problem,
  inputBuffer,
  score,
  targetScore,
  streak,
  flashState,
  viewMode,
  isRotated180,
  theme = 'light',
  onDigit,
  onClear,
  onSubmit,
  gameActive,
}) => {
  const isBlue = player.colorScheme === 'blue';
  const isLight = theme === 'light';

  const arenaGradient = isLight
    ? isBlue
      ? 'bg-gradient-to-b from-sky-50/90 via-blue-50/60 to-cyan-50/80 text-sky-950'
      : 'bg-gradient-to-b from-rose-50/90 via-red-50/60 to-pink-50/80 text-rose-950'
    : isBlue
    ? 'bg-gradient-to-b from-sky-950/60 via-slate-900/90 to-sky-950/40 text-sky-100'
    : 'bg-gradient-to-b from-rose-950/60 via-slate-900/90 to-rose-950/40 text-rose-100';

  const borderAccent = isLight
    ? isBlue
      ? 'border-sky-200/90 shadow-[inset_0_0_30px_rgba(56,189,248,0.06)]'
      : 'border-rose-200/90 shadow-[inset_0_0_30px_rgba(251,113,133,0.06)]'
    : isBlue
    ? 'border-sky-300/30 shadow-[inset_0_0_20px_rgba(56,189,248,0.08)]'
    : 'border-rose-300/30 shadow-[inset_0_0_20px_rgba(251,113,133,0.08)]';

  const flashClass = isLight
    ? flashState === 'correct'
      ? 'ring-4 ring-emerald-400 bg-emerald-100/70'
      : flashState === 'wrong'
      ? 'ring-4 ring-rose-400 bg-rose-100/70 animate-shake'
      : ''
    : flashState === 'correct'
    ? 'ring-4 ring-emerald-300 bg-emerald-950/40'
    : flashState === 'wrong'
    ? 'ring-4 ring-rose-400 bg-rose-950/40 animate-shake'
    : '';

  const promptSymbol = problem?.promptLabel || '=';

  return (
    <div
      className={`relative flex flex-col h-full w-full p-2.5 sm:p-4 select-none touch-none overflow-hidden transition-all duration-300 ${arenaGradient} ${borderAccent} ${flashClass}`}
      style={{
        transform: isRotated180 ? 'rotate(180deg)' : 'none',
        touchAction: 'none',
      }}
    >
      {/* Player Header with Gamified "Card Game" Style (Azul Neón #2563eb & Rojo Coral #dc2626) */}
      <div
        className={`flex items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-3 p-2 sm:p-3 rounded-2xl sm:rounded-3xl border-2 shadow-lg shrink-0 transition-transform ${
          isBlue
            ? 'bg-[#2563eb] border-blue-400/90 text-white shadow-blue-600/30'
            : 'bg-[#dc2626] border-red-400/90 text-white shadow-red-600/30'
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3.5">
          {/* Card Avatar Badge */}
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl bg-white/20 backdrop-blur-xs ring-2 ring-white/60 shadow-inner flex items-center justify-center">
              <span
                className={`text-2xl sm:text-3xl md:text-4xl filter drop-shadow inline-block transition-transform duration-300 ${
                  flashState === 'correct'
                    ? 'scale-125 rotate-12'
                    : streak >= 2
                    ? 'animate-bounce'
                    : 'hover:scale-110'
                }`}
              >
                {player.avatar}
              </span>
            </div>
            {streak >= 2 && (
              <span className="absolute -top-1 -right-1 text-xs sm:text-sm animate-pulse filter drop-shadow">
                🔥
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <span className="font-black text-sm sm:text-base md:text-xl leading-tight tracking-wider uppercase text-white drop-shadow-sm">
              {player.name}
            </span>
            <div className="flex items-center gap-2 text-xs font-bold text-white/90 mt-0.5">
              <span className="bg-white/20 px-2 py-0.5 rounded-lg text-[11px] sm:text-xs">
                Meta: {targetScore} pts
              </span>
              {streak >= 2 && (
                <span className="bg-amber-400 text-amber-950 font-black px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5 text-[11px] sm:text-xs animate-bounce">
                  ⚡ {streak} racha
                </span>
              )}
            </div>
          </div>
        </div>

        {/* High Contrast Card Game Score Badge */}
        <div className="flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl sm:rounded-2xl bg-white shadow-md border-2 border-white/80 tabular-nums">
          <span className={`font-black text-lg sm:text-2xl md:text-3xl ${isBlue ? 'text-[#2563eb]' : 'text-[#dc2626]'}`}>
            {score}
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-slate-400">
            /{targetScore}
          </span>
        </div>
      </div>

      {/* Math Equation & Active Display Box */}
      <div
        className={`flex items-center justify-center gap-2 sm:gap-4 mb-2 sm:mb-3 py-2 sm:py-3.5 px-3 rounded-2xl sm:rounded-3xl border shrink-0 transition-all ${
          isLight
            ? 'bg-white/95 border-slate-200/90 shadow-sm text-slate-900'
            : 'bg-black/40 border-white/10 text-white shadow-inner'
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3 font-mono font-black text-2xl sm:text-4xl md:text-5xl tracking-wide">
          <span>{problem ? problem.expression : '-'}</span>
          <span className="font-sans text-xl sm:text-3xl text-slate-400">
            {promptSymbol}
          </span>
        </div>

        {/* Caja de Respuesta "Brillante" con Borde Animado y Números en Formato Gigante */}
        <div
          className={`min-w-[85px] sm:min-w-[110px] md:min-w-[140px] h-12 sm:h-16 md:h-20 px-3 sm:px-4 flex items-center justify-center rounded-2xl sm:rounded-3xl font-mono transition-all select-none ${
            inputBuffer
              ? isBlue
                ? 'bg-white text-[#1e3a8a] border-3 border-[#2563eb] ring-4 ring-offset-2 ring-blue-400/90 shadow-[0_0_25px_rgba(37,99,235,0.35),0_6px_20px_rgba(0,0,0,0.12)] animate-pulse'
                : 'bg-white text-[#881337] border-3 border-[#dc2626] ring-4 ring-offset-2 ring-red-400/90 shadow-[0_0_25px_rgba(220,38,38,0.35),0_6px_20px_rgba(0,0,0,0.12)] animate-pulse'
              : isLight
              ? 'bg-white text-amber-500 border-3 border-dashed border-amber-400 ring-4 ring-offset-2 ring-amber-300 shadow-[0_0_25px_rgba(255,255,255,1),0_4px_16px_rgba(245,158,11,0.2)] animate-pulse'
              : 'bg-slate-900 text-amber-300 border-3 border-dashed border-amber-400/80 ring-4 ring-offset-2 ring-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.25)] animate-pulse'
          }`}
        >
          <span className="text-3xl sm:text-5xl md:text-6xl font-black tracking-widest tabular-nums">
            {inputBuffer || '?'}
          </span>
        </div>
      </div>

      {/* Interactive Keypad */}
      <div className="flex-1 flex flex-col justify-end w-full">
        <Keypad
          onDigit={onDigit}
          onClear={onClear}
          onSubmit={onSubmit}
          disabled={!gameActive}
          colorScheme={player.colorScheme}
          theme={theme}
        />
      </div>
    </div>
  );
};
