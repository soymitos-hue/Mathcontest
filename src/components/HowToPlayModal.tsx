import React from 'react';
import { X, BookOpen, Smartphone, Tv, Sparkles, Flame, CheckCircle, ShieldCheck, Swords, Timer } from 'lucide-react';
import { AppTheme } from '../types/game';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: AppTheme;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose, theme = 'light' }) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 select-none overflow-y-auto ${
        isLight ? 'bg-slate-900/40 backdrop-blur-sm' : 'bg-slate-950/80 backdrop-blur-md'
      }`}
      style={{ touchAction: 'auto' }}
    >
      <div className={`relative w-full max-w-xl border rounded-3xl shadow-2xl p-5 sm:p-7 max-h-[92vh] overflow-y-auto flex flex-col my-auto transition-colors ${
        isLight
          ? 'bg-white border-slate-200 text-slate-800'
          : 'bg-slate-900/95 border-slate-700/70 text-slate-100'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between pb-3.5 border-b shrink-0 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${
              isLight ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-amber-400/15 border-amber-300/30 text-amber-300'
            }`}>
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className={`text-base sm:text-lg font-black leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                ¿Cómo Jugar a Carrera Matemática?
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Reglas, modalidades y consejos para ganar la carrera
              </p>
            </div>
          </div>
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

        {/* Content body with pastel cards */}
        <div className={`py-4 space-y-3.5 overflow-y-auto text-xs sm:text-sm ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          {/* Card 0: Modalidades de Juego */}
          <div className={`p-3.5 rounded-2xl border space-y-2 ${
            isLight ? 'bg-amber-50/80 border-amber-200' : 'bg-amber-500/10 border-amber-400/20'
          }`}>
            <div className={`flex items-center gap-2 font-bold text-sm ${isLight ? 'text-amber-900' : 'text-amber-300'}`}>
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>1. Modalidades de Juego</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className={`p-2.5 rounded-xl border ${
                isLight ? 'bg-white border-amber-200/80' : 'bg-slate-950/40 border-amber-400/15'
              }`}>
                <div className={`font-bold flex items-center gap-1.5 ${isLight ? 'text-sky-800' : 'text-sky-200'}`}>
                  <Swords className="w-4 h-4 text-sky-500" />
                  <span>⚔️ Modo Duelo (2P)</span>
                </div>
                <p className={`mt-1 leading-snug ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Dos jugadores compiten simultáneamente en la misma pantalla en modo mesa (180°) o pizarra (0°).
                </p>
              </div>

              <div className={`p-2.5 rounded-xl border ${
                isLight ? 'bg-white border-amber-200/80' : 'bg-slate-950/40 border-amber-400/15'
              }`}>
                <div className={`font-bold flex items-center gap-1.5 ${isLight ? 'text-emerald-800' : 'text-emerald-200'}`}>
                  <Timer className="w-4 h-4 text-emerald-500" />
                  <span>⏱️ Entrenamiento (1P)</span>
                </div>
                <p className={`mt-1 leading-snug ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Un solo panel de juego centrado y espacioso para practicar contra reloj y superar tu récord de velocidad.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Modos Duales (para Duelo) */}
          <div className={`p-3.5 rounded-2xl border space-y-2 ${
            isLight ? 'bg-sky-50/80 border-sky-200' : 'bg-sky-500/10 border-sky-400/20'
          }`}>
            <div className={`flex items-center gap-2 font-bold text-sm ${isLight ? 'text-sky-900' : 'text-sky-300'}`}>
              <Smartphone className="w-4 h-4 text-sky-500" />
              <span>2. Modos de Pantalla (En Duelo)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className={`p-2.5 rounded-xl border ${
                isLight ? 'bg-white border-sky-200/80' : 'bg-slate-950/40 border-sky-400/15'
              }`}>
                <div className={`font-bold flex items-center gap-1.5 ${isLight ? 'text-sky-800' : 'text-sky-200'}`}>
                  <span>📱 Modo Mesa (180°)</span>
                </div>
                <p className={`mt-1 leading-snug ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Para compartir un teléfono o tableta sobre una mesa. El jugador de arriba lee rotado 180°.
                </p>
              </div>

              <div className={`p-2.5 rounded-xl border ${
                isLight ? 'bg-white border-sky-200/80' : 'bg-slate-950/40 border-sky-400/15'
              }`}>
                <div className={`font-bold flex items-center gap-1.5 ${isLight ? 'text-sky-800' : 'text-sky-200'}`}>
                  <span>🖥️ Modo Pizarra (0°)</span>
                </div>
                <p className={`mt-1 leading-snug ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Para pizarras interactivas (Smart Boards) con división vertical lado a lado.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Operaciones Disponibles */}
          <div className={`p-3.5 rounded-2xl border space-y-2 ${
            isLight ? 'bg-indigo-50/80 border-indigo-200' : 'bg-indigo-500/10 border-indigo-400/20'
          }`}>
            <div className={`flex items-center gap-2 font-bold text-sm ${isLight ? 'text-indigo-900' : 'text-indigo-300'}`}>
              <span>🧮 3. Operaciones Matemáticas Disponibles</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className={`p-2 rounded-xl border ${
                isLight ? 'bg-white border-indigo-200/80' : 'bg-slate-950/40 border-indigo-400/15'
              }`}>
                <span className={`font-bold ${isLight ? 'text-indigo-900' : 'text-indigo-200'}`}>➕ ➖ Suma / Resta</span>
                <p className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Sin resultados negativos.</p>
              </div>
              <div className={`p-2 rounded-xl border ${
                isLight ? 'bg-white border-indigo-200/80' : 'bg-slate-950/40 border-indigo-400/15'
              }`}>
                <span className={`font-bold ${isLight ? 'text-indigo-900' : 'text-indigo-200'}`}>✖️ ➗ Multi / Div</span>
                <p className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Divisiones enteras exactas.</p>
              </div>
              <div className={`p-2 rounded-xl border ${
                isLight ? 'bg-white border-indigo-200/80' : 'bg-slate-950/40 border-indigo-400/15'
              }`}>
                <span className={`font-bold ${isLight ? 'text-indigo-900' : 'text-indigo-200'}`}>⚡ Potencias</span>
                <p className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Cuadrados y cubos (ej. 4², 2³).</p>
              </div>
              <div className={`p-2 rounded-xl border ${
                isLight ? 'bg-white border-indigo-200/80' : 'bg-slate-950/40 border-indigo-400/15'
              }`}>
                <span className={`font-bold ${isLight ? 'text-indigo-900' : 'text-indigo-200'}`}>🌿 Raíces</span>
                <p className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Raíces exactas (ej. √25 = 5).</p>
              </div>
              <div className={`p-2 rounded-xl border col-span-2 sm:col-span-2 ${
                isLight ? 'bg-white border-indigo-200/80' : 'bg-slate-950/40 border-indigo-400/15'
              }`}>
                <span className={`font-bold ${isLight ? 'text-indigo-900' : 'text-indigo-200'}`}>🎯 Ecuaciones de 1er Grado</span>
                <p className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Halla el valor de x: en básico con sumas/restas (ej. x + 4 = 9), en medio/difícil con multiplicaciones y potencias.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Multitouch y Controles */}
          <div className={`p-3.5 rounded-2xl border space-y-1.5 ${
            isLight ? 'bg-emerald-50/80 border-emerald-200' : 'bg-emerald-500/10 border-emerald-400/20'
          }`}>
            <div className={`flex items-center gap-2 font-bold text-sm ${isLight ? 'text-emerald-900' : 'text-emerald-300'}`}>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>4. Teclado Táctil Multitouch</span>
            </div>
            <p className={`leading-relaxed text-xs ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Usa los dígitos del 0 al 9. Presiona <strong className={isLight ? 'text-emerald-700' : 'text-emerald-300'}>✓ OK</strong> para validar tu respuesta o <strong className={isLight ? 'text-amber-700' : 'text-amber-300'}>✕ Borrar</strong> si necesitas corregir.
            </p>
          </div>

          {/* Card 5: Rachas */}
          <div className={`p-3.5 rounded-2xl border space-y-1.5 ${
            isLight ? 'bg-rose-50/80 border-rose-200' : 'bg-rose-500/10 border-rose-400/20'
          }`}>
            <div className={`flex items-center gap-2 font-bold text-sm ${isLight ? 'text-rose-900' : 'text-rose-300'}`}>
              <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>5. Modo Racha (Turbo)</span>
            </div>
            <p className={`leading-relaxed text-xs ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              ¡Cada acierto seguido activa el turbo de fuego y tu avatar corre aún más rápido hacia la bandera a cuadros!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`pt-3 border-t flex items-center justify-between text-xs shrink-0 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <span className={`flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Recurso Educativo Abierto (REDA)</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-colors cursor-pointer shadow-md"
          >
            ¡Entendido, a jugar!
          </button>
        </div>
      </div>
    </div>
  );
};
