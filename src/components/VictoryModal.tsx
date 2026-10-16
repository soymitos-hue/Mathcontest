import React, { useEffect, useState } from 'react';
import {
  Trophy,
  RotateCcw,
  Settings as SettingsIcon,
  Zap,
  Target,
  Flame,
  Clock,
  BarChart3,
  CheckCircle2,
  XCircle,
  Timer,
  History,
} from 'lucide-react';
import { PlayerConfig, PlayerStats, GamePlayType, AppTheme } from '../types/game';
import { sound } from '../utils/audio';

interface VictoryModalProps {
  gameType: GamePlayType;
  winner: PlayerConfig;
  loser?: PlayerConfig;
  winnerStats: PlayerStats;
  loserStats?: PlayerStats;
  targetScore: number;
  matchDurationSec: number;
  theme?: AppTheme;
  onRematch: () => void;
  onOpenSettings: () => void;
  onOpenHistory: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  gameType,
  winner,
  loser,
  winnerStats,
  loserStats,
  targetScore,
  matchDurationSec,
  theme = 'light',
  onRematch,
  onOpenSettings,
  onOpenHistory,
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'stats'>('stats');

  useEffect(() => {
    sound.playVictory();
  }, []);

  const isSolo = gameType === 'solo';
  const isWinnerBlue = winner.colorScheme === 'blue';
  const isLight = theme === 'light';

  const fasterPlayer =
    loserStats && winnerStats.avgResponseTimeSec <= loserStats.avgResponseTimeSec ? winner : loser;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 select-none overflow-y-auto ${
        isLight ? 'bg-slate-900/40 backdrop-blur-md' : 'bg-black/90 backdrop-blur-xl'
      }`}
      style={{ touchAction: 'auto' }}
    >
      <div className={`relative w-full max-w-xl border rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-7 animate-pop overflow-hidden max-h-[92vh] flex flex-col my-auto transition-colors ${
        isLight
          ? 'bg-white border-slate-200 text-slate-800'
          : 'bg-slate-900 border-slate-700/80 text-slate-100'
      }`}>
        {/* Glow ambient backdrops */}
        <div
          className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
            isWinnerBlue ? 'bg-sky-500/20' : 'bg-rose-500/20'
          }`}
        />
        <div
          className={`absolute -bottom-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
            isWinnerBlue ? 'bg-sky-500/10' : 'bg-rose-500/10'
          }`}
        />

        {/* Modal Header */}
        <div className={`flex items-center justify-between pb-3.5 border-b shrink-0 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${
              isLight ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
            }`}>
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className={`text-[10px] sm:text-xs font-black tracking-widest uppercase ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                {isSolo ? 'Sesión de Entrenamiento' : 'Fin de la Carrera'}
              </span>
              <h2 className={`text-base sm:text-lg font-black leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {isSolo ? '¡Meta de Entrenamiento Cumplida!' : `¡${winner.name} es el Ganador!`}
              </h2>
            </div>
          </div>

          {!isSolo && (
            <div className={`flex items-center gap-1 p-1 rounded-xl border text-xs font-bold ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <button
                type="button"
                onClick={() => setActiveTab('stats')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  activeTab === 'stats'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Estadísticas</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('summary')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  activeTab === 'summary'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Podio</span>
              </button>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="py-4 space-y-4 overflow-y-auto flex-1 pr-1">
          {isSolo ? (
            /* VISTA DE ENTRENAMIENTO INDIVIDUAL (1 JUGADOR) */
            <div className="space-y-3.5">
              <div className="text-center py-1">
                <div className="text-5xl sm:text-6xl filter drop-shadow my-1 animate-racer inline-block">
                  {winner.avatar}
                </div>
                <h3 className={`text-xl sm:text-2xl font-black mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {winner.name}
                </h3>
                <p className={`text-xs sm:text-sm mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Completaste {targetScore} aciertos en {matchDurationSec} segundos contra reloj.
                </p>
              </div>

              {/* STAT 1: Cronómetro & Velocidad */}
              <div className={`p-3.5 rounded-2xl border space-y-2 ${
                isLight ? 'bg-amber-50/70 border-amber-200' : 'bg-slate-950/70 border-slate-800'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className={`flex items-center gap-1.5 ${isLight ? 'text-amber-900' : 'text-amber-300'}`}>
                    <Clock className="w-4 h-4" />
                    <span>Tiempo Total y Velocidad</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">
                    ⏱️ Registro contrarreloj
                  </span>
                </div>

                <div className={`grid grid-cols-2 gap-3 divide-x text-center ${isLight ? 'divide-amber-200' : 'divide-slate-800'}`}>
                  <div>
                    <div className={`text-2xl sm:text-3xl font-black font-mono tabular-nums ${isLight ? 'text-amber-900' : 'text-amber-300'}`}>
                      {matchDurationSec}s
                    </div>
                    <div className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Tiempo de sesión</div>
                  </div>
                  <div>
                    <div className={`text-2xl sm:text-3xl font-black font-mono tabular-nums ${isLight ? 'text-sky-900' : 'text-sky-300'}`}>
                      {winnerStats.avgResponseTimeSec.toFixed(1)}s
                    </div>
                    <div className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Promedio por respuesta</div>
                  </div>
                </div>
              </div>

              {/* STAT 2: Precisión (Aciertos vs Fallos) */}
              <div className={`p-3.5 rounded-2xl border space-y-2 ${
                isLight ? 'bg-sky-50/70 border-sky-200' : 'bg-slate-950/70 border-slate-800'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className={`flex items-center gap-1.5 ${isLight ? 'text-sky-900' : 'text-sky-300'}`}>
                    <Target className="w-4 h-4" />
                    <span>Precisión del Entrenamiento</span>
                  </span>
                  <span className={`text-[10px] font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {winnerStats.correctAnswers} aciertos · {winnerStats.wrongAnswers} fallos
                  </span>
                </div>

                <div className="flex items-center justify-between px-2">
                  <span className={`text-2xl sm:text-3xl font-black font-mono tabular-nums ${isLight ? 'text-sky-900' : 'text-sky-200'}`}>
                    {winnerStats.accuracy}%
                  </span>
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      {winnerStats.correctAnswers} correctas
                    </span>
                    <span className="text-rose-600 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      {winnerStats.wrongAnswers} erradas
                    </span>
                  </div>
                </div>

                <div className={`h-2.5 w-full rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`}>
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${winnerStats.accuracy}%` }}
                  />
                </div>
              </div>

              {/* STAT 3: Racha Máxima */}
              <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                isLight ? 'bg-rose-50/70 border-rose-200' : 'bg-slate-950/70 border-slate-800'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl ${isLight ? 'bg-rose-100 text-rose-700' : 'bg-rose-500/20 text-rose-300'}`}>
                    <Flame className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${isLight ? 'text-rose-900' : 'text-slate-300'}`}>Racha Máxima Consecutiva</div>
                    <div className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Respuestas seguidas sin cometer error</div>
                  </div>
                </div>

                <div className={`text-2xl sm:text-3xl font-black font-mono tabular-nums ${isLight ? 'text-rose-900' : 'text-rose-300'}`}>
                  🔥 {winnerStats.maxStreak}
                </div>
              </div>
            </div>
          ) : activeTab === 'summary' ? (
            /* PODIO & RESUMEN (DUELO) */
            <div className="text-center space-y-3">
              <div className="text-5xl sm:text-6xl filter drop-shadow my-2">
                {winner.avatar}
              </div>
              <h3 className={`text-xl sm:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {winner.name}
              </h3>
              <p className={`text-xs sm:text-sm max-w-sm mx-auto ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Alcanzó la meta de {targetScore} aciertos en {matchDurationSec} segundos con un desempeño extraordinario.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div
                  className={`p-3 rounded-2xl border ${
                    isWinnerBlue
                      ? isLight
                        ? 'bg-sky-50 border-sky-300 text-sky-950'
                        : 'bg-sky-950/40 border-sky-400/40'
                      : isLight
                      ? 'bg-rose-50 border-rose-300 text-rose-950'
                      : 'bg-rose-950/40 border-rose-400/40'
                  }`}
                >
                  <div className="text-2xl">{winner.avatar}</div>
                  <div className="font-extrabold text-sm truncate mt-1">{winner.name}</div>
                  <div className="text-xl font-black text-emerald-600 mt-0.5 tabular-nums">
                    {winnerStats.score} pts
                  </div>
                  <div className={`text-[10px] font-bold uppercase mt-1 ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>
                    Ganador 🏆
                  </div>
                </div>

                {loser && (
                  <div className={`p-3 rounded-2xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'
                  }`}>
                    <div className="text-2xl">{loser.avatar}</div>
                    <div className={`font-extrabold text-sm truncate mt-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{loser.name}</div>
                    <div className={`text-xl font-black mt-0.5 tabular-nums ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      {loserStats?.score ?? 0} pts
                    </div>
                    <div className={`text-[10px] font-bold uppercase mt-1 ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
                      Finalista
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* VISTA DE ESTADÍSTICAS DETALLADAS (DUELO) */
            <div className="space-y-3.5">
              <div className={`grid grid-cols-2 gap-2 text-center pb-2 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">{winner.avatar}</span>
                  <div className="text-left">
                    <div className={`text-xs font-black truncate max-w-[130px] ${isLight ? 'text-slate-900' : 'text-white'}`}>{winner.name}</div>
                    <div className="text-[10px] text-emerald-600 font-bold">Ganador 🏆</div>
                  </div>
                </div>

                {loser && (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xl">{loser.avatar}</span>
                    <div className="text-left">
                      <div className={`text-xs font-black truncate max-w-[130px] ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{loser.name}</div>
                      <div className={`text-[10px] font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Finalista</div>
                    </div>
                  </div>
                )}
              </div>

              {/* STAT 1: Tiempo promedio */}
              {loserStats && loser && (
                <div className={`p-3 rounded-xl border space-y-2 ${
                  isLight ? 'bg-amber-50/70 border-amber-200' : 'bg-slate-950/70 border-slate-800'
                }`}>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className={`flex items-center gap-1.5 ${isLight ? 'text-amber-900' : 'text-amber-400'}`}>
                      <Zap className="w-4 h-4 fill-amber-400" />
                      <span>Tiempo Promedio de Respuesta</span>
                    </span>
                    <span className={`text-[10px] font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      ⚡ Más veloz: {fasterPlayer?.name}
                    </span>
                  </div>

                  <div className={`grid grid-cols-2 gap-3 divide-x ${isLight ? 'divide-amber-200' : 'divide-slate-800'}`}>
                    <div className="flex flex-col items-center">
                      <span className={`text-2xl sm:text-3xl font-black font-mono tabular-nums ${isLight ? 'text-amber-900' : 'text-amber-300'}`}>
                        {winnerStats.avgResponseTimeSec.toFixed(1)}s
                      </span>
                      <span className={`text-[10px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>por operación</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className={`text-2xl sm:text-3xl font-black font-mono tabular-nums ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        {loserStats.avgResponseTimeSec.toFixed(1)}s
                      </span>
                      <span className={`text-[10px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>por operación</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAT 2: Precisión */}
              {loserStats && (
                <div className={`p-3 rounded-xl border space-y-2.5 ${
                  isLight ? 'bg-sky-50/70 border-sky-200' : 'bg-slate-950/70 border-slate-800'
                }`}>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className={`flex items-center gap-1.5 ${isLight ? 'text-sky-900' : 'text-sky-400'}`}>
                      <Target className="w-4 h-4" />
                      <span>Precisión y Efectividad</span>
                    </span>
                    <span className={`text-[10px] font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Aciertos vs Fallos
                    </span>
                  </div>

                  <div className={`grid grid-cols-2 gap-3 divide-x ${isLight ? 'divide-sky-200' : 'divide-slate-800'}`}>
                    <div className="flex flex-col items-center">
                      <span className={`text-2xl sm:text-3xl font-black font-mono tabular-nums ${isLight ? 'text-sky-900' : 'text-sky-300'}`}>
                        {winnerStats.accuracy}%
                      </span>
                      <div className="flex items-center gap-2 mt-1 text-[11px]">
                        <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                          {winnerStats.correctAnswers}
                        </span>
                        <span>·</span>
                        <span className="text-rose-600 font-bold flex items-center gap-0.5">
                          <XCircle className="w-3 h-3" />
                          {winnerStats.wrongAnswers}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className={`text-2xl sm:text-3xl font-black font-mono tabular-nums ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        {loserStats.accuracy}%
                      </span>
                      <div className="flex items-center gap-2 mt-1 text-[11px]">
                        <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                          {loserStats.correctAnswers}
                        </span>
                        <span>·</span>
                        <span className="text-rose-600 font-bold flex items-center gap-0.5">
                          <XCircle className="w-3 h-3" />
                          {loserStats.wrongAnswers}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAT 3: Racha Máxima */}
              {loserStats && (
                <div className={`p-3 rounded-xl border space-y-2 ${
                  isLight ? 'bg-rose-50/70 border-rose-200' : 'bg-slate-950/70 border-slate-800'
                }`}>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className={`flex items-center gap-1.5 ${isLight ? 'text-rose-900' : 'text-rose-400'}`}>
                      <Flame className="w-4 h-4 fill-rose-500 text-rose-500" />
                      <span>Racha Máxima Consecutiva</span>
                    </span>
                    <span className={`text-[10px] font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Respuestas correctas sin fallo
                    </span>
                  </div>

                  <div className={`grid grid-cols-2 gap-3 divide-x ${isLight ? 'divide-rose-200' : 'divide-slate-800'}`}>
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center gap-1 text-2xl sm:text-3xl font-black font-mono tabular-nums ${isLight ? 'text-rose-900' : 'text-rose-300'}`}>
                        <span>🔥</span>
                        <span>{winnerStats.maxStreak}</span>
                      </div>
                      <span className={`text-[10px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>aciertos seguidos</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className={`flex items-center gap-1 text-2xl sm:text-3xl font-black font-mono tabular-nums ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        <span>🔥</span>
                        <span>{loserStats.maxStreak}</span>
                      </div>
                      <span className={`text-[10px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>aciertos seguidos</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`pt-3 border-t flex flex-col sm:flex-row gap-2 shrink-0 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <button
            type="button"
            onClick={onRematch}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm border border-emerald-600 border-b-4 border-b-emerald-700 shadow-md active:translate-y-0.5 active:border-b-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 stroke-[3]" />
            <span>{isSolo ? '¡ENTRENAR DE NUEVO!' : '¡JUGAR REVANCHA!'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenHistory}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm border transition-colors cursor-pointer ${
              isLight
                ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-indigo-200'
                : 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border-indigo-400/30'
            }`}
            title="Ver Historial de Partidas"
          >
            <History className="w-4 h-4" />
            <span>Ver Historial</span>
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm border transition-colors cursor-pointer ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Ajustes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
