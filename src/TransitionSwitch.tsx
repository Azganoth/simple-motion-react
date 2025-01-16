import { cloneElement, useEffect, useState, type ReactNode } from "react";
import { isKeyedTransitionChild, type TransitionChild } from "./utils/children";

export type TransitionSwitchProps = {
  children?: ReactNode;
};

// TODO: implement "out-in" and "in-out" modes
export const TransitionSwitch = ({ children }: TransitionSwitchProps) => {
  const [renderableChild, setRenderableChild] = useState<
    TransitionChild | undefined
  >(isKeyedTransitionChild(children) ? children : undefined);

  const switchChild = (prev: TransitionChild, next?: TransitionChild) =>
    cloneElement(prev, {
      in: false,
      onExited: (node) => {
        setRenderableChild(next);
        prev.props.onExited?.(node);
      },
    }) as TransitionChild;

  useEffect(() => {
    setRenderableChild((prevChild) => {
      if (!isKeyedTransitionChild(children)) {
        return isKeyedTransitionChild(prevChild)
          ? switchChild(prevChild)
          : undefined;
      }
      if (isKeyedTransitionChild(prevChild) && prevChild.key !== children.key) {
        return switchChild(prevChild, children);
      }

      return children;
    });
  }, [children]);

  return renderableChild;
};
