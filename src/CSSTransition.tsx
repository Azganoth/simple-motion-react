import {
  cloneElement,
  createElement,
  isValidElement,
  type ReactNode,
} from "react";
import {
  Transition,
  type TransitionPhase,
  type TransitionProps,
} from "./Transition";

const addClasses = (node: HTMLElement, classes?: string): void => {
  const classNames = classes?.split(" ").filter(Boolean);
  if (classNames && classNames.length > 0) {
    node.classList.add(...classNames);
  }
};

const delClasses = (node: HTMLElement, classes?: string): void => {
  const classNames = classes?.split(" ").filter(Boolean);
  if (classNames && classNames.length > 0) {
    node.classList.remove(...classNames);
  }
};

export type CSSTransitionProps = Omit<TransitionProps, "children"> & {
  children?: ReactNode;
  name?: string;
} & CSSTransitionClasses;

export type CSSTransitionClasses = {
  activeClass?: string;
  fromClass?: string;
  toClass?: string;
  enterFromClass?: string;
  enterActiveClass?: string;
  enterToClass?: string;
  leaveFromClass?: string;
  leaveActiveClass?: string;
  leaveToClass?: string;
};

// TODO: Add support for function children
// TODO: Add custom classes for `appear`
export const CSSTransition = ({
  children,
  name,
  activeClass,
  fromClass,
  toClass,
  enterFromClass = fromClass,
  enterActiveClass = activeClass,
  enterToClass = toClass,
  leaveFromClass = toClass,
  leaveActiveClass = activeClass,
  leaveToClass = fromClass,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  ...rest
}: CSSTransitionProps) => {
  const classes: Partial<
    Record<
      | "enterFrom"
      | "enterActive"
      | "enterTo"
      | "leaveFrom"
      | "leaveActive"
      | "leaveTo",
      string
    >
  > = name
    ? {
        enterFrom: `${name}-enter-from`,
        enterActive: `${name}-enter-active`,
        enterTo: `${name}-enter-to`,
        leaveFrom: `${name}-leave-from`,
        leaveActive: `${name}-leave-active`,
        leaveTo: `${name}-leave-to`,
      }
    : {
        enterFrom: enterFromClass,
        enterActive: enterActiveClass,
        enterTo: enterToClass,
        leaveFrom: leaveFromClass,
        leaveActive: leaveActiveClass,
        leaveTo: leaveToClass,
      };

  const phaseClassMap: Partial<Record<TransitionPhase, string>> = {
    entering: classes.enterFrom,
    exiting: classes.leaveFrom,
    entered: classes.enterTo,
    exited: classes.leaveTo,
  };

  // Hook into the underlying <Transition> component's lifecycle callbacks
  // to add and remove CSS classes at appropriate moments.
  // eslint-disable-next-line react/no-children-prop
  return createElement(Transition, {
    ...rest,
    onEnter: (node) => {
      if (node) {
        delClasses(node, classes.leaveTo);
        addClasses(node, classes.enterFrom);
      }
      onEnter?.(node);
    },
    onEntering: (node) => {
      if (node) {
        addClasses(node, classes.enterActive);
        delClasses(node, classes.enterFrom);
        addClasses(node, classes.enterTo);
      }
      onEntering?.(node);
    },
    onEntered: (node) => {
      if (node) {
        delClasses(node, classes.enterActive);
      }
      onEntered?.(node);
    },
    onExit: (node) => {
      if (node) {
        delClasses(node, classes.enterTo);
        addClasses(node, classes.leaveFrom);
      }
      onExit?.(node);
    },
    onExiting: (node) => {
      if (node) {
        addClasses(node, classes.leaveActive);
        delClasses(node, classes.leaveFrom);
        addClasses(node, classes.leaveTo);
      }
      onExiting?.(node);
    },
    onExited: (node) => {
      if (node) {
        delClasses(node, classes.leaveActive);
      }
      onExited?.(node);
    },
    children: children
      ? (phase) =>
          isValidElement<{ className?: string }>(children) &&
          cloneElement(children, {
            className: children.props.className
              ? `${children.props.className} ${phaseClassMap[phase]}`
              : phaseClassMap[phase],
          })
      : children,
  });
};
