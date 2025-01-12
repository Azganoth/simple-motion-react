import { useEffect, useState } from "react";

export const useAutoToggle = (interval: number, initial = true) => {
  const [state, setState] = useState(initial);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setState((prevState) => !prevState);
    }, interval);
    return () => clearInterval(intervalId);
  }, [interval]);

  return state;
};
