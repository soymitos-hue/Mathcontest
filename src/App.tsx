/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PlayerArena } from './components/PlayerArena';
import { RaceTrack } from './components/RaceTrack';
import { SettingsModal } from './components/SettingsModal';
import { CreditsModal } from './components/CreditsModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { HistoryModal } from './components/HistoryModal';
import { CountdownOverlay } from './components/CountdownOverlay';
import { VictoryModal } from './components/VictoryModal';
import { GameSettings, DEFAULT_SETTINGS, PlayerStats, MatchRecord } from './types/game';
import { generateProblem, MathProblem } from './utils/mathGenerator';
import { sound } from './utils/audio';
import { loadMatchHistory, saveMatchRecord, clearMatchHistory } from './utils/historyStorage';

const EMPTY_STATS: PlayerStats = {
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  totalAttempts: 0,
  accuracy: 100,
  maxStreak: 0,
  avgResponseTimeSec: 0,
};

export default function App() {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [gameStatus, setGameStatus] = useState<'idle' | 'countdown' | 'playing' | 'finished'>('idle');

  // Player 1 state
  const [p1Score, setP1Score] = useState(0);
  const [p1Buffer, setP1Buffer] = useState('');
  const [p1Problem, setP1Problem] = useState<MathProblem | null>(null);
  const [p1Streak, setP1Streak] = useState(0);
  const [p1Flash, setP1Flash] = useState<'correct' | 'wrong' | null>(null);

  // Player 2 state (used in duel mode)
  const [p2Score, setP2Score] = useState(0);
  const [p2Buffer, setP2Buffer] = useState('');
  const [p2Problem, setP2Problem] = useState<MathProblem | null>(null);
  const [p2Streak, setP2Streak] = useState(0);
  const [p2Flash, setP2Flash] = useState<'correct' | 'wrong' | null>(null);

  // Analytical stats tracking
  const p1ProblemStartTime = useRef<number>(0);
  const p2ProblemStartTime = useRef<number>(0);
  const p1ResponseTimes = useRef<number[]>([]);
  const p2ResponseTimes = useRef<number[]>([]);
  const p1Correct = useRef<number>(0);
  const p1Wrong = useRef<number>(0);
  const p1MaxStreak = useRef<number>(0);
  const p2Correct = useRef<number>(0);
  const p2Wrong = useRef<number>(0);
  const p2MaxStreak = useRef<number>(0);

  const [p1FinalStats, setP1FinalStats] = useState<PlayerStats>(EMPTY_STATS);
  const [p2FinalStats, setP2FinalStats] = useState<PlayerStats>(EMPTY_STATS);

  // Live stopwatch for solo mode
  const [liveElapsedSec, setLiveElapsedSec] = useState<number>(0);
  const liveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState<MatchRecord[]>(() => loadMatchHistory());
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Winner metadata
  const [winner, setWinner] = useState<'p1' | 'p2' | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [matchDuration, setMatchDuration] = useState<number>(0);

  // Flash reset timers
  const p1FlashTimer = useRef<NodeJS.Timeout | null>(null);
  const p2FlashTimer = useRef<NodeJS.Timeout | null>(null);

  // Helper to trigger new problem for a player
  const newProblem = useCallback(
    (currentSettings: GameSettings) => {
      return generateProblem(currentSettings.operations, currentSettings.difficulty);
    },
    []
  );

  // Reset or start match
  const startMatch = useCallback(
    (customSettings?: GameSettings) => {
      const activeSettings = customSettings || settings;
      setP1Score(0);
      setP2Score(0);
      setP1Buffer('');
      setP2Buffer('');
      setP1Streak(0);
      setP2Streak(0);
      setP1Flash(null);
      setP2Flash(null);
      setWinner(null);
      setLiveElapsedSec(0);

      if (liveTimerRef.current) {
        clearInterval(liveTimerRef.current);
        liveTimerRef.current = null;
      }

      // Reset statistics tracking
      p1ResponseTimes.current = [];
      p2ResponseTimes.current = [];
      p1Correct.current = 0;
      p1Wrong.current = 0;
      p1MaxStreak.current = 0;
      p2Correct.current = 0;
      p2Wrong.current = 0;
      p2MaxStreak.current = 0;

      setP1Problem(newProblem(activeSettings));
      setP2Problem(newProblem(activeSettings));
      setGameStatus('countdown');
    },
    [settings, newProblem]
  );

  // Initial problem setup
  useEffect(() => {
    setP1Problem(newProblem(settings));
    setP2Problem(newProblem(settings));
  }, [newProblem, settings]);

  // Handle countdown complete & start timer
  const handleCountdownFinish = useCallback(() => {
    const now = Date.now();
    setStartTime(now);
    p1ProblemStartTime.current = now;
    p2ProblemStartTime.current = now;
    setGameStatus('playing');

    if (liveTimerRef.current) clearInterval(liveTimerRef.current);
    liveTimerRef.current = setInterval(() => {
      setLiveElapsedSec(parseFloat(((Date.now() - now) / 1000).toFixed(1)));
    }, 100);
  }, []);

  // Clear live timer on unmount or finished
  useEffect(() => {
    if (gameStatus !== 'playing' && liveTimerRef.current) {
      clearInterval(liveTimerRef.current);
      liveTimerRef.current = null;
    }
  }, [gameStatus]);

  // Compute final statistics
  const finalizeStats = (
    winningPlayer: 'p1' | 'p2',
    finalP1Score: number,
    finalP2Score: number,
    durationSec?: number
  ) => {
    if (liveTimerRef.current) {
      clearInterval(liveTimerRef.current);
      liveTimerRef.current = null;
    }

    const p1Times = p1ResponseTimes.current;
    const p2Times = p2ResponseTimes.current;

    const p1TotalAttempts = p1Correct.current + p1Wrong.current;
    const p2TotalAttempts = p2Correct.current + p2Wrong.current;

    const p1AvgSec =
      p1Times.length > 0
        ? parseFloat((p1Times.reduce((a, b) => a + b, 0) / p1Times.length).toFixed(1))
        : 0;
    const p2AvgSec =
      p2Times.length > 0
        ? parseFloat((p2Times.reduce((a, b) => a + b, 0) / p2Times.length).toFixed(1))
        : 0;

    const p1Accuracy =
      p1TotalAttempts > 0 ? Math.round((p1Correct.current / p1TotalAttempts) * 100) : 100;
    const p2Accuracy =
      p2TotalAttempts > 0 ? Math.round((p2Correct.current / p2TotalAttempts) * 100) : 100;

    const p1Stats: PlayerStats = {
      score: finalP1Score,
      correctAnswers: p1Correct.current,
      wrongAnswers: p1Wrong.current,
      totalAttempts: p1TotalAttempts,
      accuracy: p1Accuracy,
      maxStreak: p1MaxStreak.current,
      avgResponseTimeSec: p1AvgSec,
    };

    const p2Stats: PlayerStats = {
      score: finalP2Score,
      correctAnswers: p2Correct.current,
      wrongAnswers: p2Wrong.current,
      totalAttempts: p2TotalAttempts,
      accuracy: p2Accuracy,
      maxStreak: p2MaxStreak.current,
      avgResponseTimeSec: p2AvgSec,
    };

    setP1FinalStats(p1Stats);
    setP2FinalStats(p2Stats);

    const actualDuration =
      durationSec ?? Math.max(1, Math.round((Date.now() - startTime) / 1000));

    // Persist to LocalStorage (last 5 records)
    const newRecord: Omit<MatchRecord, 'id' | 'timestamp' | 'dateStr'> = {
      gameType: settings.gameType,
      difficulty: settings.difficulty,
      targetScore: settings.targetScore,
      durationSec: actualDuration,
      p1: {
        name: settings.p1.name,
        avatar: settings.p1.avatar,
        score: finalP1Score,
        accuracy: p1Accuracy,
        avgTime: p1AvgSec,
        maxStreak: p1MaxStreak.current,
        isWinner: winningPlayer === 'p1',
      },
      p2:
        settings.gameType === 'duel'
          ? {
              name: settings.p2.name,
              avatar: settings.p2.avatar,
              score: finalP2Score,
              accuracy: p2Accuracy,
              avgTime: p2AvgSec,
              maxStreak: p2MaxStreak.current,
              isWinner: winningPlayer === 'p2',
            }
          : undefined,
    };

    const updated = saveMatchRecord(newRecord);
    setHistory(updated);
  };

  const handleClearHistory = () => {
    clearMatchHistory();
    setHistory([]);
  };

  // Sync fullscreen change
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const toggleSound = () => {
    sound.enabled = !sound.enabled;
    setSettings((prev) => ({ ...prev, soundEnabled: sound.enabled }));
  };

  const toggleViewMode = () => {
    setSettings((prev) => ({
      ...prev,
      viewMode: prev.viewMode === 'face-to-face' ? 'side-by-side' : 'face-to-face',
    }));
  };

  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  // Player 1 input handlers
  const handleP1Digit = (digit: string) => {
    if (gameStatus !== 'playing') return;
    if (p1Buffer.length < 5) {
      setP1Buffer((prev) => prev + digit);
    }
  };

  const handleP1Clear = () => {
    if (gameStatus !== 'playing') return;
    setP1Buffer('');
  };

  const handleP1Submit = () => {
    if (gameStatus !== 'playing' || !p1Buffer || !p1Problem) return;
    const answerInt = parseInt(p1Buffer, 10);
    const elapsedSec = (Date.now() - p1ProblemStartTime.current) / 1000;
    p1ResponseTimes.current.push(elapsedSec);

    if (answerInt === p1Problem.answer) {
      // Correct!
      sound.playCorrect();
      setP1Flash('correct');
      if (p1FlashTimer.current) clearTimeout(p1FlashTimer.current);
      p1FlashTimer.current = setTimeout(() => setP1Flash(null), 350);

      const nextScore = p1Score + 1;
      const nextStreak = p1Streak + 1;
      p1Correct.current += 1;
      p1MaxStreak.current = Math.max(p1MaxStreak.current, nextStreak);

      setP1Score(nextScore);
      setP1Streak(nextStreak);
      setP1Buffer('');
      p1ProblemStartTime.current = Date.now();

      if (nextScore >= settings.targetScore) {
        setWinner('p1');
        const duration = Math.round((Date.now() - startTime) / 1000);
        setMatchDuration(duration);
        finalizeStats('p1', nextScore, p2Score, duration);
        setGameStatus('finished');
      } else {
        setP1Problem(newProblem(settings));
      }
    } else {
      // Wrong!
      sound.playWrong();
      setP1Flash('wrong');
      if (p1FlashTimer.current) clearTimeout(p1FlashTimer.current);
      p1FlashTimer.current = setTimeout(() => setP1Flash(null), 350);

      p1Wrong.current += 1;
      setP1Streak(0);
      setP1Buffer('');
      p1ProblemStartTime.current = Date.now();
    }
  };

  // Player 2 input handlers (used in duel mode)
  const handleP2Digit = (digit: string) => {
    if (gameStatus !== 'playing' || settings.gameType === 'solo') return;
    if (p2Buffer.length < 5) {
      setP2Buffer((prev) => prev + digit);
    }
  };

  const handleP2Clear = () => {
    if (gameStatus !== 'playing' || settings.gameType === 'solo') return;
    setP2Buffer('');
  };

  const handleP2Submit = () => {
    if (gameStatus !== 'playing' || settings.gameType === 'solo' || !p2Buffer || !p2Problem) return;
    const answerInt = parseInt(p2Buffer, 10);
    const elapsedSec = (Date.now() - p2ProblemStartTime.current) / 1000;
    p2ResponseTimes.current.push(elapsedSec);

    if (answerInt === p2Problem.answer) {
      // Correct!
      sound.playCorrect();
      setP2Flash('correct');
      if (p2FlashTimer.current) clearTimeout(p2FlashTimer.current);
      p2FlashTimer.current = setTimeout(() => setP2Flash(null), 350);

      const nextScore = p2Score + 1;
      const nextStreak = p2Streak + 1;
      p2Correct.current += 1;
      p2MaxStreak.current = Math.max(p2MaxStreak.current, nextStreak);

      setP2Score(nextScore);
      setP2Streak(nextStreak);
      setP2Buffer('');
      p2ProblemStartTime.current = Date.now();

      if (nextScore >= settings.targetScore) {
        setWinner('p2');
        const duration = Math.round((Date.now() - startTime) / 1000);
        setMatchDuration(duration);
        finalizeStats('p2', p1Score, nextScore, duration);
        setGameStatus('finished');
      } else {
        setP2Problem(newProblem(settings));
      }
    } else {
      // Wrong!
      sound.playWrong();
      setP2Flash('wrong');
      if (p2FlashTimer.current) clearTimeout(p2FlashTimer.current);
      p2FlashTimer.current = setTimeout(() => setP2Flash(null), 350);

      p2Wrong.current += 1;
      setP2Streak(0);
      setP2Buffer('');
      p2ProblemStartTime.current = Date.now();
    }
  };

  const handleSaveSettingsAndStart = (newSettings: GameSettings) => {
    setSettings(newSettings);
    sound.enabled = newSettings.soundEnabled;
    setIsSettingsOpen(false);
    startMatch(newSettings);
  };

  const isSolo = settings.gameType === 'solo';
  const isF2F = settings.viewMode === 'face-to-face';
  const isLight = settings.theme === 'light';

  return (
    <div
      className={`relative flex flex-col h-full w-full select-none touch-none transition-colors duration-300 ${
        isLight ? 'bg-[#f4f7fb] text-slate-800' : 'bg-slate-950 text-slate-100'
      }`}
      style={{ touchAction: 'none' }}
    >
      {/* Countdown overlay */}
      <CountdownOverlay
        isActive={gameStatus === 'countdown'}
        onFinish={handleCountdownFinish}
      />

      {/* How to Play Modal */}
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
        theme={settings.theme}
      />

      {/* Settings & Options Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        settings={settings}
        soundEnabled={settings.soundEnabled}
        onToggleSound={toggleSound}
        onRestart={() => {
          setIsSettingsOpen(false);
          startMatch();
        }}
        onToggleViewMode={toggleViewMode}
        onOpenCredits={() => {
          setIsSettingsOpen(false);
          setIsCreditsOpen(true);
        }}
        onSaveAndStart={handleSaveSettingsAndStart}
        onClose={() => setIsSettingsOpen(false)}
        onOpenHowToPlay={() => {
          setIsSettingsOpen(false);
          setIsHowToPlayOpen(true);
        }}
        onOpenHistory={() => {
          setIsSettingsOpen(false);
          setIsHistoryOpen(true);
        }}
      />

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        history={history}
        onClearHistory={handleClearHistory}
        onClose={() => setIsHistoryOpen(false)}
        theme={settings.theme}
      />

      {/* Credits Modal */}
      <CreditsModal
        isOpen={isCreditsOpen}
        onClose={() => setIsCreditsOpen(false)}
        theme={settings.theme}
      />

      {/* Victory & Detailed Stats Modal */}
      {gameStatus === 'finished' && winner && (
        <VictoryModal
          gameType={settings.gameType}
          winner={winner === 'p1' ? settings.p1 : settings.p2}
          loser={isSolo ? undefined : winner === 'p1' ? settings.p2 : settings.p1}
          winnerStats={winner === 'p1' ? p1FinalStats : p2FinalStats}
          loserStats={isSolo ? undefined : winner === 'p1' ? p2FinalStats : p1FinalStats}
          targetScore={settings.targetScore}
          matchDurationSec={matchDuration}
          theme={settings.theme}
          onRematch={() => startMatch()}
          onOpenSettings={() => {
            setGameStatus('idle');
            setIsSettingsOpen(true);
          }}
          onOpenHistory={() => setIsHistoryOpen(true)}
        />
      )}

      {/* VIEWPORT LAYOUT */}
      {isSolo ? (
        /* MODO ENTRENAMIENTO (1 JUGADOR CONTRARRELOJ - UN SOLO PANEL) */
        <div className="flex flex-col h-full w-full">
          {/* Top RaceTrack Bar with Solo Lane & Live Stopwatch */}
          <RaceTrack
            gameType="solo"
            p1={settings.p1}
            p2={settings.p2}
            score1={p1Score}
            score2={0}
            targetScore={settings.targetScore}
            viewMode="side-by-side"
            soundEnabled={settings.soundEnabled}
            isFullscreen={isFullscreen}
            elapsedSec={liveElapsedSec}
            theme={settings.theme}
            onToggleTheme={toggleTheme}
            onToggleViewMode={toggleViewMode}
            onToggleSound={toggleSound}
            onToggleFullscreen={toggleFullscreen}
            onRestart={() => startMatch()}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenCredits={() => setIsCreditsOpen(true)}
            onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
            onOpenHistory={() => setIsHistoryOpen(true)}
          />

          {/* Single Game Arena Panel */}
          <div className="flex-1 min-h-0 w-full flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
            <div className="w-full max-w-2xl h-full flex flex-col justify-center">
              <PlayerArena
                player={settings.p1}
                problem={p1Problem}
                inputBuffer={p1Buffer}
                score={p1Score}
                targetScore={settings.targetScore}
                streak={p1Streak}
                flashState={p1Flash}
                viewMode="side-by-side"
                isRotated180={false}
                theme={settings.theme}
                onDigit={handleP1Digit}
                onClear={handleP1Clear}
                onSubmit={handleP1Submit}
                gameActive={gameStatus === 'playing'}
              />
            </div>
          </div>
        </div>
      ) : isF2F ? (
        /* MODO DUELO: 180° ENFRENTADO EN MESA */
        <div className="flex flex-col h-full w-full">
          <div className="flex-1 min-h-0 overflow-hidden">
            <PlayerArena
              player={settings.p1}
              problem={p1Problem}
              inputBuffer={p1Buffer}
              score={p1Score}
              targetScore={settings.targetScore}
              streak={p1Streak}
              flashState={p1Flash}
              viewMode="face-to-face"
              isRotated180={true}
              theme={settings.theme}
              onDigit={handleP1Digit}
              onClear={handleP1Clear}
              onSubmit={handleP1Submit}
              gameActive={gameStatus === 'playing'}
            />
          </div>

          <RaceTrack
            gameType="duel"
            p1={settings.p1}
            p2={settings.p2}
            score1={p1Score}
            score2={p2Score}
            targetScore={settings.targetScore}
            viewMode={settings.viewMode}
            soundEnabled={settings.soundEnabled}
            isFullscreen={isFullscreen}
            elapsedSec={liveElapsedSec}
            theme={settings.theme}
            onToggleTheme={toggleTheme}
            onToggleViewMode={toggleViewMode}
            onToggleSound={toggleSound}
            onToggleFullscreen={toggleFullscreen}
            onRestart={() => startMatch()}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenCredits={() => setIsCreditsOpen(true)}
            onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
            onOpenHistory={() => setIsHistoryOpen(true)}
          />

          <div className="flex-1 min-h-0 overflow-hidden">
            <PlayerArena
              player={settings.p2}
              problem={p2Problem}
              inputBuffer={p2Buffer}
              score={p2Score}
              targetScore={settings.targetScore}
              streak={p2Streak}
              flashState={p2Flash}
              viewMode="face-to-face"
              isRotated180={false}
              theme={settings.theme}
              onDigit={handleP2Digit}
              onClear={handleP2Clear}
              onSubmit={handleP2Submit}
              gameActive={gameStatus === 'playing'}
            />
          </div>
        </div>
      ) : (
        /* MODO DUELO: LADO A LADO EN PIZARRA */
        <div className="flex flex-col h-full w-full">
          <RaceTrack
            gameType="duel"
            p1={settings.p1}
            p2={settings.p2}
            score1={p1Score}
            score2={p2Score}
            targetScore={settings.targetScore}
            viewMode={settings.viewMode}
            soundEnabled={settings.soundEnabled}
            isFullscreen={isFullscreen}
            elapsedSec={liveElapsedSec}
            theme={settings.theme}
            onToggleTheme={toggleTheme}
            onToggleViewMode={toggleViewMode}
            onToggleSound={toggleSound}
            onToggleFullscreen={toggleFullscreen}
            onRestart={() => startMatch()}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenCredits={() => setIsCreditsOpen(true)}
            onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
            onOpenHistory={() => setIsHistoryOpen(true)}
          />

          <div className={`flex-1 min-h-0 flex flex-row w-full divide-x ${isLight ? 'divide-slate-200' : 'divide-slate-800'}`}>
            <div className="flex-1 min-h-0 h-full overflow-hidden">
              <PlayerArena
                player={settings.p1}
                problem={p1Problem}
                inputBuffer={p1Buffer}
                score={p1Score}
                targetScore={settings.targetScore}
                streak={p1Streak}
                flashState={p1Flash}
                viewMode="side-by-side"
                isRotated180={false}
                theme={settings.theme}
                onDigit={handleP1Digit}
                onClear={handleP1Clear}
                onSubmit={handleP1Submit}
                gameActive={gameStatus === 'playing'}
              />
            </div>

            <div className="flex-1 min-h-0 h-full overflow-hidden">
              <PlayerArena
                player={settings.p2}
                problem={p2Problem}
                inputBuffer={p2Buffer}
                score={p2Score}
                targetScore={settings.targetScore}
                streak={p2Streak}
                flashState={p2Flash}
                viewMode="side-by-side"
                isRotated180={false}
                theme={settings.theme}
                onDigit={handleP2Digit}
                onClear={handleP2Clear}
                onSubmit={handleP2Submit}
                gameActive={gameStatus === 'playing'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
