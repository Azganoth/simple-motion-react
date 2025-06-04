import { isValidElement, type ReactElement } from "react";
import { CSSTransition, CSSTransitionProps } from "../CSSTransition";
import { Transition, TransitionProps } from "../Transition";

export type TransitionChild =
  | ReactElement<TransitionProps, typeof Transition>
  | ReactElement<CSSTransitionProps, typeof CSSTransition>;

/* istanbul ignore next */
export const isKeyedTransitionChild = (
  child: unknown,
): child is TransitionChild =>
  isValidElement(child) &&
  child.key != null &&
  (child.type === Transition || child.type === CSSTransition);
