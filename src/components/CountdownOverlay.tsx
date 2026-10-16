import React, { useEffect, useState } from 'react';
import { sound } from '../utils/audio';

interface CountdownOverlayProps {
  isActive: boolean;
  onFinish: () => void;
}

export const CountdownOverlay: React.FC<CountdownOverlayProps> = ({ isActive, onFinish }) => {
  const [count, setCount] = useState<number | string>(3);

  useEffect(() => {
    if (!isActive) return;

    setCount(3);
    sound.playCountdown(3);

    const t1 = setTimeout(() => {
      setCount(2);
      sound.playCountdown(2);
    }, 800);

    const t2 = setTimeout(() => {
      setCount(1);
      sound.playCountdown(1);
    }, 1600);

    const t3 = setTimeout(() => {
      setCount('¡A JUGAR!');
      sound.playCountdown(0);
    }, 2400);

    const t4 = setTimeout(() => {
      onFinish();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isActive, onFinish]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md pointer-events-none select-none">
      <div
        key={String(count)}
        className="animate-pop text-center font-black tracking-wider text-amber-400 drop-shadow-[0_10px_35px_rgba(251,191,36,0.6)] px-4"
        style={{
          fontSize: typeof count === 'number' ? 'clamp(5rem, 20vw, 14rem)' : 'clamp(3rem, 12vw, 8rem)',
        }}
      >
        {count}
      </div>
    </div>
  );
};
