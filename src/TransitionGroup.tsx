import {
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { type TransitionProps } from "./Transition";
import { isKeyedTransitionChild, type TransitionChild } from "./utils/children";

export type TransitionGroupProps = {
  children?: ReactNode | ReactNode[];
} & Pick<TransitionProps, "appear" | "enter" | "exit">;

// TODO: Ignore children without 'key', print warning in console
// TODO: Add support for 'in' prop from children
// TODO: Fix 'onExited' callback nested? calls
export const TransitionGroup = ({
  children,
  appear,
  enter,
  exit,
}: TransitionGroupProps) => {
  const activeChildKeysRef = useRef(new Set<any>());
  const [renderableChildren, setRenderableChildren] = useState<
    TransitionChild[]
  >([]);

  const createRenderableChild = useCallback(
    (child: TransitionChild, isExiting?: boolean) => {
      activeChildKeysRef.current.add(child.key);
      return cloneElement(child, {
        in: isExiting ? false : child.props.in,
        appear: appear ?? child.props.appear,
        enter: enter ?? child.props.enter,
        exit: exit ?? child.props.exit,
        onExited: (node) => {
          child.props.onExited?.(node);
          if (activeChildKeysRef.current.has(child.key)) {
            activeChildKeysRef.current.delete(child.key);
            setRenderableChildren((prevChildren) =>
              prevChildren.filter((prevChild) => prevChild.key !== child.key),
            );
          }
        },
      }) as TransitionChild;
    },
    [appear, enter, exit],
  );

  useEffect(() => {
    const currChildren = (
      Array.isArray(children) ? children : [children]
    ).filter((child) => isKeyedTransitionChild(child));

    const currChildrenIndexes = new Map<any, number>();
    for (let i = 0; i < currChildren.length; i++) {
      currChildrenIndexes.set(currChildren[i].key, i);
    }

    setRenderableChildren((prevChildren) => {
      activeChildKeysRef.current = new Set();
      const nextChildren: TransitionChild[] = [];

      let lastCurrChildAdded = 0;
      for (const prevChild of prevChildren) {
        const prevKey = prevChild.key;
        const currIndex = currChildrenIndexes.get(prevKey);

        if (currIndex === undefined) {
          // Child removed, render it in exiting state
          nextChildren.push(createRenderableChild(prevChild, true));
        } else {
          // Child persisted, render it after new children
          for (let i = lastCurrChildAdded; i <= currIndex; i++) {
            nextChildren.push(createRenderableChild(currChildren[i]));
          }

          // Ensure that already added children won't be duplicated
          lastCurrChildAdded = Math.max(lastCurrChildAdded, currIndex + 1);
        }
      }

      // Child added, render it after all other children
      for (let i = lastCurrChildAdded; i < currChildren.length; i++) {
        nextChildren.push(createRenderableChild(currChildren[i]));
      }

      return nextChildren;
    });
  }, [children, createRenderableChild]);

  return renderableChildren;
};
