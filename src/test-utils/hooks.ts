import { useEffect, useState } from "react";

export const useAutoToggle = (interval: number, initial = true) => {
  const [state, setState] = useState(initial);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setState((prevState) => !prevState);
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);

  return state;
};

export const useMultiAutoToggle = (...intervals: number[]) => {
  const [states, setStates] = useState(() => intervals.map(() => true));

  useEffect(() => {
    const intervalIds = intervals.map((interval, index) =>
      setInterval(() => {
        setStates((currentStates) => {
          const newStates = [...currentStates];
          newStates[index] = !newStates[index];
          return newStates;
        });
      }, interval),
    );

    return () => {
      intervalIds.forEach(clearInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(intervals)]);

  return states;
};
