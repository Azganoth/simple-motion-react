import type { Meta, StoryObj } from "@storybook/react";
import { useAutoToggle } from "./test-utils/hooks";
import { formatCode, StoryWrapper } from "./test-utils/stories";
import { Transition, type TransitionProps } from "./Transition";

/**
 * The `Transition` component streamlines animating an element's mounting and unmounting by introducing intermediate lifecycle phases: entering, entered, exiting, and exited. It provides a declarative way to manage animations, with hooks for precise control at each stage of the transition.
 *
 * The component supports the following phases:
 * - **entering**: The element begins transitioning in.
 * - **entered**: The element finishes transitioning in.
 * - **exiting**: The element begins transitioning out.
 * - **exited**: The element finishes transitioning out and unmounts if `unmount` is enabled.
 */
export default {
  component: Transition,
  argTypes: {
    children: {
      description:
        "The content to render, either a node or a function that receives the current transition phase and returns a node.",
      type: {
        name: "union",
        value: [{ name: "other", value: "ReactNode" }, { name: "function" }],
      },
    },
    in: {
      description:
        "Controls whether the element is entering or exiting. A value of `true` triggers the entering phases, while `false` triggers the exiting phases.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    appear: {
      description:
        "If `true`, the transition starts in the entering phase when the component is first rendered.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    enter: {
      description: "If `false`, disables the entering phase of the transition.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    exit: {
      description: "If `false`, disables the exiting phase of the transition.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    duration: {
      description:
        "Specifies the duration (in milliseconds) for the entering and exiting phases. Can be set individually for appear, enter and exit transitions.",
      table: {
        defaultValue: { summary: "150" },
      },
      type: {
        name: "union",
        value: [
          { name: "number" },
          {
            name: "object",
            value: {
              appear: { name: "number" },
              enter: { name: "number" },
              exit: { name: "number" },
            },
          },
        ],
      },
    },
    unmount: {
      description:
        "If `true`, the component unmounts once the exited phase is reached.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    onEnter: {
      description: "Called at the start of the entering phase.",
    },
    onEntering: {
      description:
        "Called after the `onEnter` callback and before the entering phase completes.",
    },
    onEntered: {
      description: "Called when the transition reaches the entered phase.",
    },
    onExit: {
      description: "Called at the start of the exiting phase.",
    },
    onExiting: {
      description:
        "Called after the `onExit` callback and before the exiting phase completes.",
    },
    onExited: {
      description: "Called when the transition reaches the exited phase.",
    },
  },
} satisfies Meta<TransitionProps>;

type Story = StoryObj<TransitionProps>;

export const Default = {
  args: {
    children: (phase) => (
      <div className="box box--fixed box--space text">{phase}</div>
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
          <Transition>
            <div>{phase}</div>
          </Transition>
          `),
      },
    },
  },
} satisfies Story;

export const Fade = {
  args: {
    children: (phase) => (
      <div
        className="text emoji-box"
        style={{
          transition: "opacity 0.5s ease",
          ...((phase === "exiting" || phase === "exited") && {
            opacity: 0.25,
          }),
        }}
      >
        {phase === "entered"
          ? "🙂"
          : phase === "exited"
            ? "😴"
            : phase === "exiting"
              ? "🥱"
              : "😌"}
      </div>
    ),
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
          <Transition in={toggle} duration={500}>
            {(phase) => (
              <div
                style={{
                  transition: "opacity 0.5s ease",
                  ...((phase === "exiting" || phase === "exited") && {
                    opacity: 0.25,
                  }),
                }}
              >
                {phase === "entered"
                  ? "🙂"
                  : phase === "exited"
                    ? "😴"
                    : phase === "exiting"
                      ? "🥱"
                      : "😌"}
              </div>
            )}
          </Transition>
          `),
      },
    },
  },
} satisfies Story;

export const NoTransitions = {
  args: {
    children: (phase) => (
      <div
        className="text emoji-box"
        style={{
          ...(phase === "exited" && { opacity: 0.25 }),
        }}
      >
        {phase === "entered" ? "😱" : "🤫"}
      </div>
    ),
    enter: false,
    exit: false,
  },
  decorators: Fade.decorators,
  parameters: {
    docs: {
      source: {
        code: formatCode(`
          <Transition in={toggle} duration={500}>
            {(phase) => (
              <div
                style={{
                  ...(phase === "exited" && { opacity: 0.25 }),
                }}
              >
                {phase === "entered" ? "😱" : "🤫"}
              </div>
            )}
          </Transition>
          `),
      },
    },
  },
} satisfies Story;
