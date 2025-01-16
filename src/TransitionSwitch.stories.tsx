import type { Meta, StoryObj } from "@storybook/react";
import { CSSTransition } from "./CSSTransition";
import { useAutoToggle } from "./test-utils/hooks";
import { formatCode, StoryWrapper } from "./test-utils/stories";
import { Transition } from "./Transition";
import {
  TransitionSwitch,
  type TransitionSwitchProps,
} from "./TransitionSwitch";

/**
 * The `TransitionSwitch` component provides a mechanism for animating the transition between two child elements. When a new child is provided, the current child animatwes out before the new child animates in, ensuring smooth and sequential transitions.
 */
export default {
  component: TransitionSwitch,
  argTypes: {
    children: {
      description:
        "The child to be animated. The `key` property of the child must uniquely identify it to ensure proper transition behavior. If it is `undefined`, the previous child will animate out.",
      type: { name: "other", value: "VNode" },
      control: { disable: true },
    },
  },
} satisfies Meta<TransitionSwitchProps>;

type Story = StoryObj<TransitionSwitchProps>;

export const Default = {
  args: {
    children: (
      <Transition key="1" duration={500}>
        <div className="box box--fixed box--space text">Transition</div>
      </Transition>
    ),
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
          <TransitionSwitch>
            <Transition key="1" duration={500}>
              <div>Transition</div>
            </Transition>
          </TransitionSwitch>
          `),
      },
    },
  },
} satisfies Story;

const FadeItem1 = (
  <CSSTransition key="1" name="transition--fade" appear duration={500}>
    <div className="box box--fixed box--space text">Item 1</div>
  </CSSTransition>
);

const FadeItem2 = (
  <CSSTransition key="2" name="transition--fade" appear duration={500}>
    <div className="box box--fixed box--space text">Item 2</div>
  </CSSTransition>
);

export const Fade = {
  args: {
    children: FadeItem1,
  },
  decorators: [
    ...Default.decorators,
    (Story, ctx) => {
      const showItem1 = useAutoToggle(3000);

      return (
        <Story
          args={{
            ...ctx.args,
            children: showItem1 ? FadeItem1 : FadeItem2,
          }}
        />
      );
    },
  ],
  parameters: {
    docs: {
      source: {
        code: formatCode(`
          <TransitionSwitch>
            {showItem1 ? (
              <CSSTransition key="1" name="transition--fade" appear duration={500}>
                <div>Item 1</div>
              </CSSTransition>
            ) : (
              <CSSTransition key="2" name="transition--fade" appear duration={500}>
                <div>Item 2</div>
              </CSSTransition>
            )}
          </TransitionSwitch>

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

const SlideItem1 = (
  <CSSTransition
    key="1"
    appear
    duration={500}
    activeClass="transition"
    enterFromClass="transition--slide-left"
    leaveToClass="transition--slide-right"
  >
    <div className="box box--fixed box--ocean text">Item 1</div>
  </CSSTransition>
);

const SlideItem2 = (
  <CSSTransition
    key="2"
    appear
    duration={500}
    activeClass="transition"
    enterFromClass="transition--slide-left"
    leaveToClass="transition--slide-right"
  >
    <div className="box box--fixed box--ocean text">Item 2</div>
  </CSSTransition>
);

export const Slide = {
  ...Default,
  args: {
    ...Default.args,
    children: SlideItem1,
  },
  decorators: [
    ...Default.decorators,
    (Story, ctx) => {
      const showItem1 = useAutoToggle(3000);

      return (
        <Story
          args={{
            ...ctx.args,
            children: showItem1 ? SlideItem1 : SlideItem2,
          }}
        />
      );
    },
  ],
  parameters: {
    docs: {
      source: {
        code: formatCode(`
          <TransitionSwitch>
            {showItem1 ? (
              <CSSTransition
                key="1"
                appear
                duration={500}
                activeClass="transition"
                enterFromClass="transition--slide-left"
                leaveToClass="transition--slide-right"
              >
                <div>Item 1</div>
              </CSSTransition>
            ) : (
              <CSSTransition
                key="2"
                appear
                duration={500}
                activeClass="transition"
                enterFromClass="transition--slide-left"
                leaveToClass="transition--slide-right"
              >
                <div>Item 2</div>
              </CSSTransition>
            )}
          </TransitionSwitch>

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
