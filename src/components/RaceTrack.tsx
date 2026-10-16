import React from 'react';
import {
  Maximize,
  Minimize,
  Settings as SettingsIcon,
  Timer,
} from 'lucide-react';
import { PlayerConfig, GameViewMode, GamePlayType, AppTheme } from '../types/game';

interface RaceTrackProps {
  gameType: GamePlayType;
  p1: PlayerConfig;
  p2: PlayerConfig;
  score1: number;
  score2: number;
  targetScore: number;
  viewMode: GameViewMode;
  soundEnabled?: boolean;
  isFullscreen: boolean;
  elapsedSec: number;
  theme?: AppTheme;
  onToggleFullscreen: () => void;
  onOpenSettings: () => void;
  // Optional legacy props maintained for full backwards-compatibility
  onToggleTheme?: () => void;
  onToggleViewMode?: () => void;
  onToggleSound?: () => void;
  onRestart?: () => void;
  onOpenCredits?: () => void;
  onOpenHowToPlay?: () => void;
  onOpenHistory?: () => void;
}

export const RaceTrack: React.FC<RaceTrackProps> = ({
  gameType,
  p1,
  p2,
  score1,
  score2,
  targetScore,
  isFullscreen,
  elapsedSec,
  theme = 'light',
  onToggleFullscreen,
  onOpenSettings,
}) => {
  const isSolo = gameType === 'solo';
  const isLight = theme === 'light';
  const p1Progress = Math.min(100, Math.max(0, (score1 / targetScore) * 100));
  const p2Progress = Math.min(100, Math.max(0, (score2 / targetScore) * 100));

  const p1IsLeading = !isSolo && score1 > score2 && score1 > 0;
  const p2IsLeading = !isSolo && score2 > score1 && score2 > 0;

  const formatStopwatch = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toFixed(1).padStart(4, '0')}`;
  };

  const barBg = isLight
    ? 'bg-white/95 border-y-2 border-slate-200 shadow-md backdrop-blur-md text-slate-800'
    : 'bg-slate-900/95 border-y-2 border-slate-800 shadow-xl backdrop-blur-md text-slate-100';

  return (
    <div className={`relative z-30 flex items-center justify-between gap-2 sm:gap-4 px-2 sm:px-5 py-2 sm:py-2.5 shrink-0 w-full select-none touch-none ${barBg}`}>
      {/* Left Area: Stopwatch in Solo Mode */}
      {isSolo && (
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-mono text-xs sm:text-sm font-black tabular-nums shrink-0 shadow-xs border ${
          isLight
            ? 'bg-amber-50 border-amber-300 text-amber-900'
            : 'bg-slate-800/80 border-amber-400/30 text-amber-300'
        }`}>
          <Timer className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>{formatStopwatch(elapsedSec)}</span>
        </div>
      )}

      {/* Center: PISTA DE CARRERAS AMPLIADA (Máximo Espacio y Visibilidad Gamificada) */}
      <div className={`flex-1 flex flex-col gap-2 px-3 py-2 rounded-2xl overflow-hidden relative border-2 ${
        isLight
          ? 'bg-slate-100/90 border-slate-200/90 shadow-inner'
          : 'bg-slate-950/70 border-slate-800 shadow-inner'
      }`}>
        {/* Track Lane 1 (Jugador 1 - Azul Neón #2563eb) */}
        <div className={`relative ${isSolo ? 'h-9 sm:h-11' : 'h-7 sm:h-9'} w-full rounded-xl border-2 overflow-hidden flex items-center px-1.5 transition-all ${
          isLight
            ? 'bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border-blue-300 shadow-xs'
            : 'bg-gradient-to-r from-blue-950/40 via-sky-950/40 to-slate-900 border-blue-500/40'
        }`}>
          {/* Progress fill */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-500/30 via-sky-400/40 to-blue-600/30 transition-all duration-300 ease-out"
            style={{ width: `${p1Progress}%` }}
          />

          {/* Road asphalt dashed center line */}
          <div className="absolute left-0 right-8 top-1/2 -translate-y-1/2 border-b border-dashed border-blue-300/40 dark:border-blue-400/20 pointer-events-none" />

          {/* Distance checkpoints (25%, 50%, 75%) */}
          <div className="absolute left-1/4 top-0 bottom-0 w-px border-r border-dotted border-blue-300/50 pointer-events-none" />
          <div className="absolute left-2/4 top-0 bottom-0 w-px border-r border-dotted border-blue-300/50 pointer-events-none" />
          <div className="absolute left-3/4 top-0 bottom-0 w-px border-r border-dotted border-blue-300/50 pointer-events-none" />

          {/* Checkered Start indicator */}
          <span className="absolute left-1.5 text-[10px] font-black opacity-35 select-none pointer-events-none text-blue-700 dark:text-blue-300">
            🏁 SALIDA
          </span>

          {/* Avatar Racer P1 */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-1.5 transition-all duration-300 ease-out z-10 filter drop-shadow animate-racer ${
              isSolo ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl md:text-3xl'
            }`}
            style={{
              left: `calc(${p1Progress}% * 0.88)`,
            }}
          >
            {score1 > 0 && (
              <span className="text-xs sm:text-sm -mr-1 animate-pulse select-none filter drop-shadow">
                {p1IsLeading ? '🔥' : '💨'}
              </span>
            )}
            <div className="relative flex items-center justify-center">
              {p1IsLeading && (
                <span className="absolute -top-3 sm:-top-4 text-xs sm:text-sm animate-bounce filter drop-shadow">
                  👑
                </span>
              )}
              <span className="hover:scale-125 transition-transform inline-block filter drop-shadow-md">
                {p1.avatar}
              </span>
            </div>
            {/* High contrast Player Score Pill */}
            <span className="px-2 py-0.5 rounded-lg bg-[#2563eb] text-white text-[11px] sm:text-xs font-black tabular-nums shadow-sm border border-blue-300/80">
              {score1}
            </span>
          </div>

          {/* Finish Line Checkered Flag */}
          <span className="absolute right-1.5 text-base sm:text-xl filter drop-shadow animate-pulse" title="Meta">
            🏁
          </span>
        </div>

        {/* Track Lane 2 (Jugador 2 - Visible en Duelo - Rojo Coral #dc2626) */}
        {!isSolo && (
          <div className={`relative h-7 sm:h-9 w-full rounded-xl border-2 overflow-hidden flex items-center px-1.5 transition-all ${
            isLight
              ? 'bg-gradient-to-r from-red-50 via-rose-50 to-pink-50 border-red-300 shadow-xs'
              : 'bg-gradient-to-r from-red-950/40 via-rose-950/40 to-slate-900 border-red-500/40'
          }`}>
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-red-500/30 via-rose-400/40 to-red-600/30 transition-all duration-300 ease-out"
              style={{ width: `${p2Progress}%` }}
            />

            {/* Road asphalt dashed center line */}
            <div className="absolute left-0 right-8 top-1/2 -translate-y-1/2 border-b border-dashed border-red-300/40 dark:border-red-400/20 pointer-events-none" />

            {/* Distance checkpoints */}
            <div className="absolute left-1/4 top-0 bottom-0 w-px border-r border-dotted border-red-300/50 pointer-events-none" />
            <div className="absolute left-2/4 top-0 bottom-0 w-px border-r border-dotted border-red-300/50 pointer-events-none" />
            <div className="absolute left-3/4 top-0 bottom-0 w-px border-r border-dotted border-red-300/50 pointer-events-none" />

            <span className="absolute left-1.5 text-[10px] font-black opacity-35 select-none pointer-events-none text-red-700 dark:text-red-300">
              🏁 SALIDA
            </span>

            {/* Avatar Racer P2 */}
            <div
              className="absolute top-1/2 -translate-y-1/2 flex items-center gap-1.5 transition-all duration-300 ease-out z-10 filter drop-shadow animate-racer text-xl sm:text-2xl md:text-3xl"
              style={{
                left: `calc(${p2Progress}% * 0.88)`,
              }}
            >
              {score2 > 0 && (
                <span className="text-xs sm:text-sm -mr-1 animate-pulse select-none filter drop-shadow">
                  {p2IsLeading ? '🔥' : '💨'}
                </span>
              )}
              <div className="relative flex items-center justify-center">
                {p2IsLeading && (
                  <span className="absolute -top-3 sm:-top-4 text-xs sm:text-sm animate-bounce filter drop-shadow">
                    👑
                  </span>
                )}
                <span className="hover:scale-125 transition-transform inline-block filter drop-shadow-md">
                  {p2.avatar}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-lg bg-[#dc2626] text-white text-[11px] sm:text-xs font-black tabular-nums shadow-sm border border-red-300/80">
                {score2}
              </span>
            </div>

            {/* Finish Line Checkered Flag */}
            <span className="absolute right-1.5 text-base sm:text-xl filter drop-shadow animate-pulse" title="Meta">
              🏁
            </span>
          </div>
        )}
      </div>

      {/* Right Area: Simplificación de la Barra Central (Solo 2 o 3 Botones Centrales) */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Botón 1: ⚙️ Menú de Opciones (Un solo botón para sonido, reinicio, modo de vista, créditos y reglas) */}
        <button
          type="button"
          onClick={onOpenSettings}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer shadow-sm active:translate-y-0.5 border ${
            isLight
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-100'
          }`}
          title="Menú de Opciones: Sonido, Reinicio, Modo de Vista, Créditos y Ajustes"
        >
          <SettingsIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 animate-spin-slow shrink-0" />
          <span className="hidden xs:inline">Opciones</span>
        </button>

        {/* Botón 2: ⛶ Pantalla Completa */}
        <button
          type="button"
          onClick={onToggleFullscreen}
          className={`p-2 sm:p-2.5 rounded-2xl transition-all cursor-pointer shadow-sm active:translate-y-0.5 border ${
            isLight
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
          }`}
          title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa (⛶)'}
        >
          {isFullscreen ? (
            <Minimize className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
          ) : (
            <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>
    </div>
  );
};
