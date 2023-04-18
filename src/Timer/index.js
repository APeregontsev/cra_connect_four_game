import { useEffect, useRef, useState } from "react";

const maxSeconds = 10;

export function useTimer(gameProps, setGameProps) {
  const timer_Id = useRef(null);
  const [leftSeconds, setLeftSeconds] = useState(maxSeconds);

  function updateTimerAction() {
    setLeftSeconds((state) => {
      return state - 1;
    });
  }

  // Main function ---------------------------------
  function stop({ needReset }) {
    clearInterval(timer_Id.current);
    timer_Id.current = null;

    if (needReset) {
      setLeftSeconds(maxSeconds);
    }
  }

  // Main function ---------------------------------
  function reStart({ needReset }) {
    stop({ needReset });
    timer_Id.current = setInterval(updateTimerAction, 1000);
  }

  // Small functions ---------------------------------
  function start() {
    reStart({ needReset: true });
  }

  function stopAndClear() {
    stop({ needReset: false });
  }

  function pause() {
    stop({ needReset: false });
  }

  function continueTimer() {
    reStart({ needReset: false });
  }

  function reset() {
    reStart({ needReset: true });
  }

  useEffect(() => {
    if (leftSeconds === 0) {
      reStart({ needReset: true });
      setGameProps({ ...gameProps, playerOneTurn: !gameProps.playerOneTurn });
    }
  }, [leftSeconds]);

  return {
    start,
    stopAndClear,
    pause,
    continueTimer,
    reset,
    leftSeconds,
  };
}
