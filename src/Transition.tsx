import {
  cloneElement,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import mergeRefs from "./utils/mergeRefs";
import reflow from "./utils/reflow";

const getDuration = (
  duration: TransitionProps["duration"] = 150,
  isAppearing: boolean,
): { enter: number; exit: number } => {
  if (typeof duration === "number") {
    return { enter: duration, exit: duration };
  }
  const { appear = 150, enter = 150, exit = 150 } = duration;
  return {
    enter: isAppearing ? appear : enter,
    exit,
  };
};

export type TransitionPhase = "entering" | "entered" | "exiting" | "exited";

export type TransitionProps = {
  children?: ((phase: TransitionPhase) => ReactNode) | ReactNode;
  in?: boolean;
  appear?: boolean;
  enter?: boolean;
  exit?: boolean;
  duration?: number | { appear?: number; enter?: number; exit?: number };
  unmount?: boolean;
  onEnter?: (node?: HTMLElement, isAppearing?: boolean) => void;
  onEntering?: (node?: HTMLElement, isAppearing?: boolean) => void;
  onEntered?: (node?: HTMLElement, isAppearing?: boolean) => void;
  onExit?: (node?: HTMLElement) => void;
  onExiting?: (node?: HTMLElement) => void;
  onExited?: (node?: HTMLElement) => void;
};

// TODO: Add a function prop that manually triggers end phase
// TODO: Add support for state change via conditional render
export const Transition = ({
  children,
  in: inProp = true,
  appear = false,
  enter = true,
  exit = true,
  duration,
  unmount = false,
  ...eventHandlers
}: TransitionProps) => {
  const eventHandlersRef = useRef(eventHandlers);
  useLayoutEffect(() => {
    eventHandlersRef.current = eventHandlers;
  });

  const nodeRef = useRef<HTMLElement>();

  const [phase, setPhase] = useState<TransitionPhase>(() =>
    inProp && !appear ? "entered" : "exited",
  );

  const isFirstMountRef = useRef(true);
  const isAppearingRef = useRef(appear);

  const durationRef = useRef(getDuration(duration, isAppearingRef.current));

  useEffect(() => {
    let timeoutId: number | undefined;
    const { onEnter, onEntering, onEntered, onExit, onExiting, onExited } =
      eventHandlersRef.current;
    switch (phase) {
      case "entering": {
        onEnter?.(nodeRef.current, isAppearingRef.current);
        reflow(nodeRef.current);
        onEntering?.(nodeRef.current, isAppearingRef.current);

        timeoutId = window.setTimeout(
          () => setPhase("entered"),
          durationRef.current.enter,
        );
        break;
      }
      case "exiting": {
        onExit?.(nodeRef.current);
        reflow(nodeRef.current);
        onExiting?.(nodeRef.current);

        timeoutId = window.setTimeout(
          () => setPhase("exited"),
          durationRef.current.exit,
        );
        break;
      }
      case "entered": {
        onEntered?.(nodeRef.current, isAppearingRef.current);
        isAppearingRef.current = false;
        break;
      }
      case "exited": {
        if (!isFirstMountRef.current) {
          onExited?.(nodeRef.current);
        }
        break;
      }
      default:
        break;
    }

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [phase]);

  useLayoutEffect(() => {
    const isAppearing = isFirstMountRef.current && appear;
    durationRef.current = getDuration(duration, isAppearing);
    isAppearingRef.current = isAppearing;

    setPhase((prevPhase) => {
      if (inProp) {
        if (prevPhase !== "entering" && prevPhase !== "entered") {
          return enter ? "entering" : "entered";
        }
      } else {
        if (prevPhase !== "exiting" && prevPhase !== "exited") {
          return exit ? "exiting" : "exited";
        }
      }

      return prevPhase;
    });
  }, [inProp, appear, enter, exit, duration]);

  useEffect(() => {
    isFirstMountRef.current = false;
  }, []);

  const child = useMemo(() => {
    const nextChild =
      typeof children === "function" ? children(phase) : children;
    return isValidElement(nextChild)
      ? (nextChild as ReactElement & { ref?: Ref<unknown> })
      : null;
  }, [children, phase]);

  if (child == null || (unmount && phase === "exited")) return null;

  return cloneElement(child, {
    ref: mergeRefs(nodeRef, child.ref),
  });
};
