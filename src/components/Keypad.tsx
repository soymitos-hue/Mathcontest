import React from 'react';
import { Delete, Check } from 'lucide-react';
import { sound } from '../utils/audio';
import { AppTheme } from '../types/game';

interface KeypadProps {
  onDigit: (digit: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  colorScheme: 'blue' | 'red';
  theme?: AppTheme;
}

export const Keypad: React.FC<KeypadProps> = ({
  onDigit,
  onClear,
  onSubmit,
  disabled = false,
  colorScheme,
  theme = 'light',
}) => {
  const handleKeyTouch = (action: () => void) => (e: React.PointerEvent) => {
    e.preventDefault();
    if (disabled) return;
    sound.playKey();
    action();
  };

  const isLight = theme === 'light';

  const keyBaseClass = isLight
    ? 'flex items-center justify-center font-black rounded-xl sm:rounded-2xl transition-all select-none touch-none cursor-pointer active:translate-y-0.5 active:border-b-2 shadow-sm'
    : 'flex items-center justify-center font-black rounded-xl sm:rounded-2xl transition-all select-none touch-none active:scale-95 cursor-pointer shadow-sm';

  const digitClass = isLight
    ? colorScheme === 'blue'
      ? 'bg-white hover:bg-sky-50 active:bg-sky-100 border border-sky-200 border-b-4 border-b-sky-300 text-sky-900 text-xl sm:text-2xl md:text-3xl'
      : 'bg-white hover:bg-rose-50 active:bg-rose-100 border border-rose-200 border-b-4 border-b-rose-300 text-rose-900 text-xl sm:text-2xl md:text-3xl'
    : colorScheme === 'blue'
      ? 'bg-sky-500/20 hover:bg-sky-500/30 active:bg-sky-400/40 border border-sky-300/30 text-sky-100 text-xl sm:text-2xl md:text-3xl'
      : 'bg-rose-500/20 hover:bg-rose-500/30 active:bg-rose-400/40 border border-rose-300/30 text-rose-100 text-xl sm:text-2xl md:text-3xl';

  const clearClass = isLight
    ? 'bg-rose-100/90 hover:bg-rose-200 active:bg-rose-300 border border-rose-300 border-b-4 border-b-rose-400 text-rose-950 text-base sm:text-lg font-bold'
    : 'bg-rose-500/20 hover:bg-rose-500/30 active:bg-rose-400/40 border border-rose-300/30 text-rose-200 text-base sm:text-lg font-bold';

  // Prominent, tactile green OK button with preferred visual weight
  const okClass = isLight
    ? 'bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 active:from-emerald-600 active:to-emerald-700 border-2 border-emerald-300 border-b-6 border-b-emerald-800 text-white text-lg sm:text-2xl font-black shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400/50 scale-[1.03] z-10'
    : 'bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 active:from-emerald-600 active:to-emerald-700 border-2 border-emerald-300 border-b-6 border-b-emerald-900 text-white text-lg sm:text-2xl font-black shadow-lg shadow-emerald-500/40 ring-2 ring-emerald-300/60 scale-[1.03] z-10';

  return (
    <div
      className="grid grid-cols-3 gap-1.5 sm:gap-2.5 w-full flex-1 max-h-[290px] md:max-h-[380px] touch-none select-none"
      style={{ touchAction: 'none' }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          type="button"
          disabled={disabled}
          onPointerDown={handleKeyTouch(() => onDigit(num.toString()))}
          className={`${keyBaseClass} ${digitClass}`}
          style={{ touchAction: 'none' }}
        >
          {num}
        </button>
      ))}

      {/* 1. [ ✕ Borrar ] (Left) */}
      <button
        type="button"
        disabled={disabled}
        onPointerDown={handleKeyTouch(onClear)}
        className={`${keyBaseClass} ${clearClass}`}
        style={{ touchAction: 'none' }}
        title="Borrar dígito o respuesta"
      >
        <span className="flex items-center gap-1 sm:gap-1.5">
          <Delete className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          <span className="text-xs sm:text-sm font-extrabold uppercase">Borrar</span>
        </span>
      </button>

      {/* 2. [ 0 ] (Center) */}
      <button
        type="button"
        disabled={disabled}
        onPointerDown={handleKeyTouch(() => onDigit('0'))}
        className={`${keyBaseClass} ${digitClass}`}
        style={{ touchAction: 'none' }}
      >
        0
      </button>

      {/* 3. [ ✓ OK ] (Right - Destacado y Prominente) */}
      <button
        type="button"
        disabled={disabled}
        onPointerDown={handleKeyTouch(onSubmit)}
        className={`${keyBaseClass} ${okClass}`}
        style={{ touchAction: 'none' }}
        title="Confirmar respuesta (¡OK!)"
      >
        <span className="flex items-center gap-1 sm:gap-1.5">
          <Check className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3.5] drop-shadow-xs" />
          <span className="text-sm sm:text-base md:text-lg font-black tracking-wider uppercase">OK</span>
        </span>
      </button>
    </div>
  );
};
