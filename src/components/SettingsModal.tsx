import React, { useState } from 'react';
import {
  X,
  Play,
  Check,
  Smartphone,
  Tv,
  HelpCircle,
  Swords,
  Timer,
  History,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  RotateCcw,
  Info,
} from 'lucide-react';
import {
  GameSettings,
  AVATAR_LIST,
  GameViewMode,
  GamePlayType,
  AppTheme,
} from '../types/game';
import { DifficultyLevel, OperationType } from '../utils/mathGenerator';

interface SettingsModalProps {
  isOpen: boolean;
  settings: GameSettings;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  onRestart?: () => void;
  onToggleViewMode?: () => void;
  onOpenCredits?: () => void;
  onSaveAndStart: (newSettings: GameSettings) => void;
  onClose: () => void;
  onOpenHowToPlay: () => void;
  onOpenHistory?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  settings,
  soundEnabled = true,
  onToggleSound,
  onRestart,
  onToggleViewMode,
  onOpenCredits,
  onSaveAndStart,
  onClose,
  onOpenHowToPlay,
  onOpenHistory,
}) => {
  const [localSettings, setLocalSettings] = useState<GameSettings>(settings);

  if (!isOpen) return null;

  const isLight = localSettings.theme === 'light';

  const setGameType = (type: GamePlayType) => {
    setLocalSettings({ ...localSettings, gameType: type });
  };

  const setTheme = (theme: AppTheme) => {
    setLocalSettings({ ...localSettings, theme });
  };

  const toggleOp = (op: OperationType) => {
    let current = [...localSettings.operations];
    if (current.includes(op)) {
      if (current.length > 1) {
        current = current.filter((o) => o !== op);
      }
    } else {
      current.push(op);
    }
    setLocalSettings({ ...localSettings, operations: current });
  };

  const setDifficulty = (diff: DifficultyLevel) => {
    setLocalSettings({ ...localSettings, difficulty: diff });
  };

  const setViewMode = (mode: GameViewMode) => {
    setLocalSettings({ ...localSettings, viewMode: mode });
  };

  const setTargetScore = (score: number) => {
    setLocalSettings({ ...localSettings, targetScore: score });
  };

  const handleStart = () => {
    onSaveAndStart(localSettings);
  };

  const isSolo = localSettings.gameType === 'solo';

  const OPERATION_ITEMS: { id: OperationType; label: string; symbol: string; badge: string }[] = [
    { id: 'add', label: 'Suma', symbol: '➕', badge: '1º Ciclo' },
    { id: 'sub', label: 'Resta', symbol: '➖', badge: '1º Ciclo' },
    { id: 'mul', label: 'Multiplicación', symbol: '✖️', badge: '2º Ciclo' },
    { id: 'div', label: 'División', symbol: '➗', badge: 'Exacta' },
    { id: 'power', label: 'Potencias', symbol: 'xⁿ', badge: 'x², x³' },
    { id: 'root', label: 'Raíces', symbol: '√', badge: 'Exacta' },
    { id: 'equation', label: 'Ecuaciones 1º', symbol: 'x', badge: 'Álgebra' },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto ${
        isLight ? 'bg-slate-900/40 backdrop-blur-sm' : 'bg-slate-950/80 backdrop-blur-md'
      }`}
      style={{ touchAction: 'auto' }}
    >
      <div className={`relative w-full max-w-2xl border rounded-3xl shadow-2xl p-4 sm:p-6 max-h-[92vh] overflow-y-auto my-auto transition-colors ${
        isLight
          ? 'bg-white border-slate-200 text-slate-800'
          : 'bg-slate-900 border-slate-700/70 text-slate-100'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between pb-3 sm:pb-4 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">⚙️</span>
            <div>
              <h2 className={`text-lg sm:text-xl font-black tracking-wide ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Menú de Opciones y Configuración
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Control de partida, sonido, vista, créditos y reglas
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onOpenHistory && (
              <button
                type="button"
                onClick={onOpenHistory}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  isLight
                    ? 'bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800'
                    : 'bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-400/30 text-indigo-200'
                }`}
                title="Historial de Partidas"
              >
                <History className="w-4 h-4 text-indigo-500" />
                <span className="hidden xs:inline">Historial</span>
              </button>
            )}
            <button
              type="button"
              onClick={onOpenHowToPlay}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                isLight
                  ? 'bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800'
                  : 'bg-amber-500/15 hover:bg-amber-500/25 border border-amber-300/30 text-amber-200'
              }`}
              title="¿Cómo Jugar?"
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span className="hidden xs:inline">¿Cómo Jugar?</span>
            </button>
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

        <div className="space-y-4 sm:space-y-5 pt-3 sm:pt-4 text-xs sm:text-sm">
          {/* Section: Acciones Rápidas (Sonido, Reinicio, Modo de Vista, Créditos) */}
          <div className={`p-3.5 rounded-2xl border ${
            isLight ? 'bg-slate-50 border-slate-200 shadow-xs' : 'bg-slate-800/50 border-slate-700/60'
          }`}>
            <label className={`block font-black mb-2 uppercase tracking-wider text-[11px] ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              ⚡ Acciones Rápidas de Partida
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* Sonido Toggle */}
              <button
                type="button"
                onClick={onToggleSound}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                  soundEnabled
                    ? isLight
                      ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-800'
                      : 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-400/40 text-emerald-200'
                    : isLight
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-600'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-400'
                }`}
                title="Activar o silenciar efectos sonoros"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span>{soundEnabled ? 'Sonido: SÍ' : 'Sonido: NO'}</span>
              </button>

              {/* Reiniciar Partida */}
              <button
                type="button"
                onClick={onRestart}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                  isLight
                    ? 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-400/40 text-amber-200'
                }`}
                title="Reiniciar partida actual a 0 puntos"
              >
                <RotateCcw className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Reiniciar</span>
              </button>

              {/* Modo de Vista Toggle */}
              <button
                type="button"
                onClick={() => {
                  const nextMode = localSettings.viewMode === 'face-to-face' ? 'side-by-side' : 'face-to-face';
                  setViewMode(nextMode);
                  if (onToggleViewMode) onToggleViewMode();
                }}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                  isLight
                    ? 'bg-sky-50 hover:bg-sky-100 border-sky-300 text-sky-900'
                    : 'bg-sky-500/20 hover:bg-sky-500/30 border-sky-400/40 text-sky-200'
                }`}
                title="Alternar entre modo Mesa (180°) y Pantalla/Pizarra (0°)"
              >
                {localSettings.viewMode === 'face-to-face' ? (
                  <>
                    <Smartphone className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>180° Mesa</span>
                  </>
                ) : (
                  <>
                    <Tv className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>0° Pizarra</span>
                  </>
                )}
              </button>

              {/* Créditos Institucionales REDA */}
              <button
                type="button"
                onClick={onOpenCredits}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                  isLight
                    ? 'bg-indigo-50 hover:bg-indigo-100 border-indigo-300 text-indigo-900'
                    : 'bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-400/40 text-indigo-200'
                }`}
                title="Ver autores, institución y créditos REDA"
              >
                <Info className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Créditos</span>
              </button>
            </div>
          </div>
          {/* Section 0: Selector de Apariencia / Tema */}
          <div>
            <label className={`block font-bold mb-1.5 uppercase tracking-wider text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              🎨 Estilo Visual y Colores
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex items-center justify-center gap-2.5 p-3 rounded-2xl border transition-all cursor-pointer ${
                  isLight
                    ? 'bg-amber-50 border-amber-400/80 text-amber-950 shadow-sm ring-1 ring-amber-300 font-bold'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <Sun className="w-5 h-5 text-amber-500 shrink-0" />
                <div className="text-left">
                  <div className="font-black text-sm flex items-center gap-1.5">
                    <span>☀️ Pastel Claro (Aula / Día)</span>
                    {isLight && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </div>
                  <div className="text-[11px] opacity-75">Luminoso, descansado y divertido</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center gap-2.5 p-3 rounded-2xl border transition-all cursor-pointer ${
                  !isLight
                    ? 'bg-sky-500/15 border-sky-400/60 text-white shadow-md shadow-sky-950/40 ring-1 ring-sky-300/50 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Moon className="w-5 h-5 text-sky-400 shrink-0" />
                <div className="text-left">
                  <div className="font-black text-sm flex items-center gap-1.5">
                    <span>🌙 Neón Oscuro (Noche)</span>
                    {!isLight && <Check className="w-3.5 h-3.5 text-sky-400" />}
                  </div>
                  <div className="text-[11px] opacity-75">Fondo negro de alto contraste</div>
                </div>
              </button>
            </div>
          </div>

          {/* Section 1: Selector de Modalidad (Duelo vs Entrenamiento) */}
          <div>
            <label className={`block font-bold mb-1.5 uppercase tracking-wider text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Modalidad de Juego
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setGameType('duel')}
                className={`flex items-center justify-center gap-2.5 p-3 rounded-2xl border transition-all cursor-pointer ${
                  !isSolo
                    ? isLight
                      ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-sm ring-1 ring-sky-300 font-bold'
                      : 'bg-sky-500/15 border-sky-400/60 text-white shadow-md shadow-sky-950/40 ring-1 ring-sky-300/50'
                    : isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <Swords className="w-5 h-5 text-sky-500 shrink-0" />
                <div className="text-left">
                  <div className="font-black text-sm flex items-center gap-1.5">
                    <span>⚔️ Duelo</span>
                    {!isSolo && <Check className="w-3.5 h-3.5 text-sky-500" />}
                  </div>
                  <div className="text-[11px] opacity-75">2 Jugadores en vivo</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setGameType('solo')}
                className={`flex items-center justify-center gap-2.5 p-3 rounded-2xl border transition-all cursor-pointer ${
                  isSolo
                    ? isLight
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-sm ring-1 ring-emerald-300 font-bold'
                      : 'bg-emerald-500/15 border-emerald-400/60 text-white shadow-md shadow-emerald-950/40 ring-1 ring-emerald-300/50'
                    : isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <Timer className="w-5 h-5 text-emerald-500 shrink-0" />
                <div className="text-left">
                  <div className="font-black text-sm flex items-center gap-1.5">
                    <span>⏱️ Entrenamiento</span>
                    {isSolo && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                  </div>
                  <div className="text-[11px] opacity-75">1 Jugador vs Cronómetro</div>
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Modo de Dispositivo (visible solo en Duelo) */}
          {!isSolo && (
            <div>
              <label className={`block font-bold mb-1.5 uppercase tracking-wider text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Orientación de Pantalla (2 Jugadores)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setViewMode('face-to-face')}
                  className={`flex items-start gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    localSettings.viewMode === 'face-to-face'
                      ? isLight
                        ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-sm ring-1 ring-sky-300'
                        : 'bg-sky-500/15 border-sky-400/60 text-white shadow-md shadow-sky-950/40 ring-1 ring-sky-300/50'
                      : isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm flex items-center gap-1.5">
                      <span>Móvil / Mesa (180°)</span>
                      {localSettings.viewMode === 'face-to-face' && (
                        <Check className="w-4 h-4 text-sky-500 inline" />
                      )}
                    </div>
                    <div className="text-[11px] opacity-75 mt-0.5 leading-snug">
                      Campo superior rotado 180° para jugar uno frente al otro sobre una mesa compartida.
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('side-by-side')}
                  className={`flex items-start gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    localSettings.viewMode === 'side-by-side'
                      ? isLight
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-sm ring-1 ring-emerald-300'
                        : 'bg-emerald-500/15 border-emerald-400/60 text-white shadow-md shadow-emerald-950/40 ring-1 ring-emerald-300/50'
                      : isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <Tv className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm flex items-center gap-1.5">
                      <span>Pantalla Interactiva (Lado a Lado 0°)</span>
                      {localSettings.viewMode === 'side-by-side' && (
                        <Check className="w-4 h-4 text-emerald-500 inline" />
                      )}
                    </div>
                    <div className="text-[11px] opacity-75 mt-0.5 leading-snug">
                      División vertical 0° para Smart Boards o monitores táctiles de pared.
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Section 3: Jugadores y Avatares */}
          <div
            className={`grid gap-3 sm:gap-4 p-3 rounded-2xl border ${
              isSolo ? 'grid-cols-1 max-w-md mx-auto w-full' : 'grid-cols-1 sm:grid-cols-2'
            } ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800'
            }`}
          >
            {/* Jugador 1 (Azul) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`font-bold flex items-center gap-1.5 ${isLight ? 'text-sky-800' : 'text-sky-300'}`}>
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
                  {isSolo ? 'Tu Jugador' : 'Equipo Azul (P1)'}
                </span>
                <span className="text-xl">{localSettings.p1.avatar}</span>
              </div>
              <input
                type="text"
                value={localSettings.p1.name}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    p1: { ...localSettings.p1, name: e.target.value },
                  })
                }
                className={`w-full px-2.5 py-1.5 border rounded-xl font-bold text-xs sm:text-sm focus:outline-none focus:border-sky-500 ${
                  isLight
                    ? 'bg-white border-slate-300 text-sky-950'
                    : 'bg-slate-900 border-slate-700/80 text-sky-100'
                }`}
                placeholder={isSolo ? 'Tu Nombre' : 'Nombre Equipo Azul'}
                maxLength={18}
              />
              <div className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Elige avatar:</div>
              <div className={`grid grid-cols-6 gap-1 max-h-24 overflow-y-auto p-1 rounded-xl border ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'
              }`}>
                {AVATAR_LIST.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() =>
                      setLocalSettings({
                        ...localSettings,
                        p1: { ...localSettings.p1, avatar: av.emoji },
                      })
                    }
                    className={`h-7 flex items-center justify-center rounded-lg text-base transition-colors ${
                      localSettings.p1.avatar === av.emoji
                        ? isLight
                          ? 'bg-sky-100 ring-2 ring-sky-400'
                          : 'bg-sky-500/30 ring-2 ring-sky-300'
                        : isLight
                        ? 'hover:bg-slate-100'
                        : 'hover:bg-slate-800'
                    }`}
                    title={av.label}
                  >
                    {av.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Jugador 2 (Visible solo en modo Duelo) */}
            {!isSolo && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`font-bold flex items-center gap-1.5 ${isLight ? 'text-rose-800' : 'text-rose-300'}`}>
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                    Equipo Rojo (P2)
                  </span>
                  <span className="text-xl">{localSettings.p2.avatar}</span>
                </div>
                <input
                  type="text"
                  value={localSettings.p2.name}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      p2: { ...localSettings.p2, name: e.target.value },
                    })
                  }
                  className={`w-full px-2.5 py-1.5 border rounded-xl font-bold text-xs sm:text-sm focus:outline-none focus:border-rose-500 ${
                    isLight
                      ? 'bg-white border-slate-300 text-rose-950'
                      : 'bg-slate-900 border-slate-700/80 text-rose-100'
                  }`}
                  placeholder="Nombre Equipo Rojo"
                  maxLength={18}
                />
                <div className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Elige avatar:</div>
                <div className={`grid grid-cols-6 gap-1 max-h-24 overflow-y-auto p-1 rounded-xl border ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'
                }`}>
                  {AVATAR_LIST.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() =>
                        setLocalSettings({
                          ...localSettings,
                          p2: { ...localSettings.p2, avatar: av.emoji },
                        })
                      }
                      className={`h-7 flex items-center justify-center rounded-lg text-base transition-colors ${
                        localSettings.p2.avatar === av.emoji
                          ? isLight
                            ? 'bg-rose-100 ring-2 ring-rose-400'
                            : 'bg-rose-500/30 ring-2 ring-rose-300'
                          : isLight
                          ? 'hover:bg-slate-100'
                          : 'hover:bg-slate-800'
                      }`}
                      title={av.label}
                    >
                      {av.emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Operaciones Matemáticas Ampliadas */}
          <div>
            <label className={`block font-bold mb-1.5 uppercase tracking-wider text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Categorías Matemáticas (Selección múltiple)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {OPERATION_ITEMS.map((op) => {
                const active = localSettings.operations.includes(op.id);
                return (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => toggleOp(op.id)}
                    className={`flex flex-col items-center justify-center py-2 px-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      active
                        ? isLight
                          ? 'bg-sky-50 border-sky-400 text-sky-950 shadow-xs ring-1 ring-sky-300 font-bold'
                          : 'bg-sky-500/15 border-sky-400/60 text-sky-100 shadow-sm ring-1 ring-sky-300/40'
                        : isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-black text-sm text-amber-500">{op.symbol}</span>
                      <span className="font-bold text-xs">{op.label}</span>
                    </div>
                    <span className="text-[10px] opacity-75 mt-0.5">{op.badge}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Dificultad y Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className={`block font-bold mb-1.5 uppercase tracking-wider text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Nivel de Dificultad
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'easy' as DifficultyLevel, label: 'Fácil', sub: '1 dig · eq + -' },
                  { id: 'medium' as DifficultyLevel, label: 'Medio', sub: '2 dig · x², √ · eq × ÷' },
                  { id: 'hard' as DifficultyLevel, label: 'Difícil', sub: 'Avanzado · Álgebra' },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDifficulty(d.id)}
                    className={`py-2 px-1.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      localSettings.difficulty === d.id
                        ? isLight
                          ? 'bg-amber-50 border-amber-400 text-amber-950 ring-1 ring-amber-300 font-black shadow-xs'
                          : 'bg-amber-500/20 border-amber-300/60 text-amber-100 ring-1 ring-amber-300/50 font-black'
                        : isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold">{d.label}</div>
                    <div className="text-[9px] opacity-75">{d.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`block font-bold mb-1.5 uppercase tracking-wider text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {isSolo ? 'Meta de Aciertos (Entrenamiento)' : 'Meta para Ganar (Duelo)'}
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[5, 10, 15, 20].map((pts) => (
                  <button
                    key={pts}
                    type="button"
                    onClick={() => setTargetScore(pts)}
                    className={`py-2 px-2 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                      localSettings.targetScore === pts
                        ? isLight
                          ? 'bg-indigo-50 border-indigo-400 text-indigo-950 ring-1 ring-indigo-300 font-black shadow-xs'
                          : 'bg-indigo-500/25 border-indigo-300/60 text-indigo-100 ring-1 ring-indigo-300/40 font-black'
                        : isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {pts} pts
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={`pt-4 sm:pt-6 mt-4 sm:mt-5 border-t flex items-center justify-end gap-3 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-colors ${
              isLight ? 'text-slate-500 hover:text-slate-800 hover:bg-slate-100' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleStart}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-sm sm:text-base border border-emerald-600 border-b-4 border-b-emerald-700 shadow-md active:translate-y-0.5 active:border-b-2 transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>{isSolo ? '¡INICIAR ENTRENAMIENTO!' : '¡INICIAR DUELO!'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
