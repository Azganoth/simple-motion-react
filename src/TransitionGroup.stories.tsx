import type { Meta, StoryObj } from "@storybook/react";
import { CSSTransition } from "./CSSTransition";
import { useMultiAutoToggle } from "./test-utils/hooks";
import { formatCode, StoryWrapper } from "./test-utils/stories";
import { Transition } from "./Transition";
import { TransitionGroup, type TransitionGroupProps } from "./TransitionGroup";

/**
 * The `TransitionGroup` component enables animation of a group of elements as they are added, updated, or removed from the DOM. It works in conjunction with the `Transition` and `CSSTransition` component to provide lifecycle-based animations for dynamic child elements.
 */
export default {
  component: TransitionGroup,
  argTypes: {
    children: {
      description:
        "The child or array of children to be animated. Each child must have a unique `key` property for proper identification and management.",
      type: {
        name: "union",
        value: [
          { name: "other", value: "ReactNode" },
          { name: "array", value: { name: "other", value: "ReactNode" } },
        ],
      },
      control: { disable: true },
    },
    appear: {
      description:
        "If `true`, the first render for each new child will trigger the enter transition. This overrides the individual 'appear' property for every child.",
      type: "boolean",
    },
    enter: {
      description:
        "If `false`, disables the entering phase of the transition for every child. This overrides the individual 'enter' property for every child.",
      type: "boolean",
    },
    exit: {
      description:
        "If `false`, disables the exiting phase of the transition for every child. This overrides the individual 'exit' property for every child.",
      type: "boolean",
    },
  },
} satisfies Meta<TransitionGroupProps>;

type Story = StoryObj<TransitionGroupProps>;

export const Default = {
  args: {
    children: [
      <Transition key="1">
        <div className="box box--fixed box--space text">Item 1</div>
      </Transition>,
      <CSSTransition key="2">
        <div className="box box--fixed box--space text">Item 2</div>
      </CSSTransition>,
    ],
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
          <TransitionGroup>
            <Transition key="1">
              <div>Item 1</div>
            </Transition>
            <CSSTransition key="2">
              <div>Item 2</div>
            </CSSTransition>
          </TransitionGroup>
          `),
      },
    },
  },
} satisfies Story;

const fadeChildren = ["1", "2", "3"].map((key) => (
  <CSSTransition key={key} name="transition--fade" duration={500}>
    <div className="box box--fixed box--city text">Item {key}</div>
  </CSSTransition>
));

export const Fade = {
  args: {
    children: fadeChildren,
  },
  decorators: [
    ...Default.decorators,
    (Story, ctx) => {
      const toggles = useMultiAutoToggle(1500, 2250, 3750);

      return (
        <Story
          args={{
            ...ctx.args,
            children: fadeChildren.filter((_, i) => toggles[i]),
          }}
        />
      );
    },
  ],
  parameters: {
    docs: {
      source: {
        code: formatCode(`
          <TransitionGroup>
            {["1", "2", "3"].filter((_, i) => toggles[i]).map((key) => (
              <CSSTransition key={key} name="transition--fade" duration={500}>
                <div>Item {key}</div>
              </CSSTransition>
            ))}
          </TransitionGroup>

          <style>
            .transition--fade-enter-active,
            .transition--fade-leave-active {
              transition: opacity 0.5s ease;
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

const zoomChildren = ["1", "2", "3"].map((key) => (
  <CSSTransition
    key={key}
    activeClass="transition"
    enterFromClass="transition--zoom-in"
    leaveToClass="transition--zoom-out"
    duration={500}
  >
    <div className="box box--fixed box--ocean text">Item {key}</div>
  </CSSTransition>
));

export const Zoom = {
  args: {
    appear: true,
    children: zoomChildren,
  },
  decorators: [
    ...Default.decorators,
    (Story, ctx) => {
      const toggles = useMultiAutoToggle(1500, 2250, 3750);

      return (
        <Story
          args={{
            ...ctx.args,
            children: zoomChildren.filter((_, i) => toggles[i]),
          }}
        />
      );
    },
  ],
  parameters: {
    docs: {
      source: {
        code: formatCode(`
          <TransitionGroup>
            {["1", "2", "3"].filter((_, i) => toggles[i]).map((key) => (
              <CSSTransition
                key={key}
                activeClass="transition"
                enterFromClass="transition--zoom-in"
                leaveToClass="transition--zoom-out"
                duration={500}
              >
                <div>Item {key}</div>
              </CSSTransition>
            ))}
          </TransitionGroup>

          <style>
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

const slideChildren = ["1", "2", "3", "4", "5", "6"].map((key) => (
  <CSSTransition
    key={key}
    activeClass="transition"
    enterFromClass="transition--slide-right"
    leaveToClass="transition--slide-left"
    duration={500}
  >
    <div className="box box--fixed box--space text">Item {key}</div>
  </CSSTransition>
));

export const Slide = {
  args: {
    appear: true,
    children: slideChildren,
  },
  decorators: [
    ...Default.decorators,
    (Story, ctx) => {
      const toggles = useMultiAutoToggle(4000, 3750, 3000, 2750, 2125, 1500);

      return (
        <Story
          args={{
            ...ctx.args,
            children: slideChildren.filter((_, i) => toggles[i]),
          }}
        />
      );
    },
  ],
  parameters: {
    docs: {
      source: {
        code: formatCode(`
          <TransitionGroup>
            {["1", "2", "3", "4", "5", "6"].filter((_, i) => toggles[i]).map((key) => (
              <CSSTransition
                key={key}
                activeClass="transition"
                enterFromClass="transition--slide-right"
                leaveToClass="transition--slide-left"
                duration={500}
              >
                <div>Item {key}</div>
              </CSSTransition>
            ))}
          </TransitionGroup>

          <style>
            .transition--slide-left {
              transform: translateX(-20px);
              opacity: 0;
            }

            .transition--slide-right {
              transform: translateX(20px);
              opacity: 0;
            }
          </style>
          `),
      },
    },
  },
} satisfies Story;
