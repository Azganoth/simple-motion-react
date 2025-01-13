import type { Meta, StoryObj } from "@storybook/react";
import { CSSTransition, type CSSTransitionProps } from "./CSSTransition";
import { useAutoToggle } from "./test-utils/hooks";
import { formatCode, StoryWrapper } from "./test-utils/stories";

/**
 * The `CSSTransition` component builds on the `Transition` component to provide an easy and flexible way to animate elements using CSS classes. It simplifies the process of applying and managing CSS transitions during an element's lifecycle phases (entering, entered, exiting, and exited).
 *
 * **Inherits all props from `Transition`.**
 */
export default {
  component: CSSTransition,
  argTypes: {
    children: {
      description: "The content to render.",
      type: { name: "other", value: "ReactNode" },
      control: { disable: true },
    },
    name: {
      description:
        'The base name used to generate CSS class names for the transition. For example, a value of "fade" will generate "fade-enter-from", "fade-enter-active", "fade-enter-to", "fade-leave-from", "fade-leave-active" and "fade-leave-to".',
      type: { name: "string" },
    },
    fromClass: {
      description:
        "Class applied at the start of enter transition and at the end of exit transition.",
      type: { name: "string" },
    },
    toClass: {
      description:
        "Class class applied at the end of enter transition and at the start of exit transition.",
      type: { name: "string" },
    },
    activeClass: {
      description:
        "Class applied during the active phase of both enter and exit transitions.",
      type: { name: "string" },
    },
    enterFromClass: {
      description: "Class applied before the start of the enter transition.",
      type: { name: "string" },
    },
    enterToClass: {
      description: "Class applied at the start of the enter transition.",
      type: { name: "string" },
    },
    enterActiveClass: {
      description: "Class applied during the enter transition.",
      type: { name: "string" },
    },
    leaveFromClass: {
      description: "Class applied before the start of the exit transition.",
      type: { name: "string" },
    },
    leaveToClass: {
      description: "Class applied at the start of the exit transition.",
      type: { name: "string" },
    },
    leaveActiveClass: {
      description: "Class applied during the exit transition.",
      type: { name: "string" },
    },
  },
} satisfies Meta<CSSTransitionProps>;

type Story = StoryObj<CSSTransitionProps>;

export const Default = {
  args: {
    children: <div className="box box--fixed box--space text">Transition</div>,
  },
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: formatCode(`
          <CSSTransition>
            <div>Transition</div>
          </CSSTransition>
          `),
      },
    },
  },
} satisfies Story;

export const Fade = {
  args: {
    children: <div className="emoji-box">😉</div>,
    name: "transition--fade",
    duration: 500,
  },
  decorators: [
    ...Default.decorators,
    (Story, ctx) => {
      const shouldEnter = useAutoToggle(3500);

      return Story({
        args: {
          ...ctx.args,
          in: shouldEnter,
        },
      });
    },
  ],
  parameters: {
    docs: {
      source: {
        code: formatCode(`
          <CSSTransition in={toggle} name="transition--fade" duration={500}>
            <div>😉</div>
          </CSSTransition>

          <style>
            .transition--fade-enter-active,
            .transition--fade-leave-active {
              transition:
                opacity 0.5s ease;
            }

            .transition--fade-enter-from,
            .transition--fade-leave-to {
              opacity: 0;
            }

            .transition--fade-enter-to,
            .transition--fade-leave-from {
              opacity: 1;
            }
          </style>
          `),
      },
    },
  },
} satisfies Story;

export const SlideDownUp = {
  args: {
    children: <div className="emoji-box">👽</div>,
    activeClass: "transition",
    fromClass: "transition--slide-up-from",
    toClass: "transition--slide-up-to",
    duration: 500,
  },
  decorators: Fade.decorators,
  parameters: {
    docs: {
      source: {
        code: formatCode(`
          <CSSTransition
            in={toggle}
            activeClass="transition"
            fromClass="transition--slide-up-from"
            toClass="transition--slide-up-to"
            duration={500}
          >
            <div>👽</div>
          </CSSTransition>

          <style>
            .transition {
              transition:
                opacity 0.5s ease,
                transform 0.5s ease;
            }

            .transition--slide-up-from {
              transform: translateY(-20px);
              opacity: 0;
            }

            .transition--slide-up-to {
              transform: translateY(0);
              opacity: 1;
            }
          </style>
          `),
      },
    },
  },
} satisfies Story;

export const SlideUp = {
  args: {
    children: <div className="emoji-box">🥶</div>,
    activeClass: "transition",
    enterFromClass: "transition--slide-down-from",
    enterToClass: "transition--slide-down-to",
    leaveFromClass: "transition--slide-up-to",
    leaveToClass: "transition--slide-up-from",
    duration: 500,
  },
  decorators: Fade.decorators,
  parameters: {
    docs: {
      source: {
        code: formatCode(`
          <CSSTransition
            in={toggle}
            activeClass="transition"
            enterFromClass="transition--slide-down-from"
            enterToClass="transition--slide-down-to"
            leaveFromClass="transition--slide-up-to"
            leaveToClass="transition--slide-up-from"
            duration={500}
          >
            <div>🥶</div>
          </CSSTransition>

          <style>
            .transition {
              transition:
                opacity 0.5s ease,
                transform 0.5s ease;
            }

            .transition--slide-down-from {
              transform: translateY(20px);
              opacity: 0;
            }

            .transition--slide-down-to {
              transform: translateY(0);
              opacity: 1;
            }

            .transition--slide-up-from {
              transform: translateY(-20px);
              opacity: 0;
            }

            .transition--slide-up-to {
              transform: translateY(0);
              opacity: 1;
            }
          </style>
          `),
      },
    },
  },
} satisfies Story;

export const ZoomInOut = {
  args: {
    children: <div className="emoji-box">😁</div>,
    activeClass: "transition",
    enterFromClass: "transition--zoom-in",
    leaveToClass: "transition--zoom-out",
    duration: 500,
  },
  decorators: Fade.decorators,
  parameters: {
    docs: {
      source: {
        code: formatCode(`
          <CSSTransition
            in={toggle}
            activeClass="transition"
            enterFromClass="transition--zoom-in"
            leaveToClass="transition--zoom-out"
            duration={500}
          >
            <div>😁</div>
          </CSSTransition>

          <style>
            .transition {
              transition:
                opacity 0.5s ease,
                transform 0.5s ease;
            }

            .transition--zoom-in {
              transform: scale(0.9);
              opacity: 0;
            }

            .transition--zoom-out {
              transform: scale(1.1);
              opacity: 0;
            }
          </style>
          `),
      },
    },
  },
} satisfies Story;
