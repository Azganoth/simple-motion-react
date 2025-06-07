# @simple-motion/react

[![codecov](https://codecov.io/gh/Azganoth/simple-motion-react/graph/badge.svg?token=EMUCLMP1PU)](https://codecov.io/gh/Azganoth/simple-motion-react)

A lightweight React transition library for animating component lifecycle changes.

---

## Features

- **Declarative API**: Simple and intuitive API for handling transitions.
- **Lifecycle Control**: Hooks for each phase of the transition (`entering`, `entered`, `exiting`, `exited`).
- **CSS Transitions**: Easily apply CSS classes for animations.
- **Group Animations**: Animate a list of components as they are added or removed.
- **Switchable Animations**: Seamlessly transition between two components.
- **Lightweight**: Small and efficient with zero runtime dependencies, ensuring a minimal impact on your bundle size.

[Documentation](https://simple-motion-react.vercel.app/)

## Installation

```bash
npm install @simple-motion/react
```

```bash
pnpm add @simple-motion/react
```

## Usage

### Transition

The `Transition` component is the foundation of the library, allowing you to animate a component's mount and unmount lifecycle.

```typescript
import { Transition } from '@simple-motion/react';

function App() {
  const [inProp, setInProp] = useState(true);

  return (
    <>
      <button onClick={() => setInProp(!inProp)}>
        Click to {inProp ? 'Exit' : 'Enter'}
      </button>
      <Transition in={inProp} timeout={300}>
        {phase => (
          <div style={{
            transition: `opacity 300ms`,
            opacity: phase === 'exiting' || phase === 'exited' ? 0 : 1
          }}>
            I'm a fade Transition!
          </div>
        )}
      </Transition>
    </>
  );
}
```

### CSSTransition

The `CSSTransition` component extends the `Transition` component, providing a way to apply CSS classes for animations.

```typescript
import { CSSTransition } from '@simple-motion/react';
import './styles.css';

function App() {
  const [inProp, setInProp] = useState(true);

  return (
    <>
      <button onClick={() => setInProp(!inProp)}>
        Click to {inProp ? 'Exit' : 'Enter'}
      </button>
      <CSSTransition in={inProp} timeout={300} classNames="fade">
        <div>I'm a CSS Transition!</div>
      </CSSTransition>
    </>
  );
}
```

And in your CSS file:

```css
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  opacity: 1;
  transition: opacity 300ms;
}
.fade-exit {
  opacity: 1;
}
.fade-exit-active {
  opacity: 0;
  transition: opacity 300ms;
}
```

### TransitionGroup

The `TransitionGroup` component manages a set of `Transition` or `CSSTransition` components in a list.

```typescript
import { TransitionGroup, CSSTransition } from '@simple-motion/react';
import './styles.css';

function App() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' }
  ]);

  const addItem = () => {
    const id = Date.now();
    setItems(prevItems => [...prevItems, { id, text: `Item ${id}` }]);
  };

  const removeItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <>
      <button onClick={addItem}>Add Item</button>
      <TransitionGroup>
        {items.map(({ id, text }) => (
          <CSSTransition key={id} timeout={500} classNames="fade">
            <div>
              {text}
              <button onClick={() => removeItem(id)}>Remove</button>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
}
```

### TransitionSwitch

The `TransitionSwitch` component is used to transition between two components.

```typescript
import { TransitionSwitch, CSSTransition } from '@simple-motion/react';
import './styles.css';

function App() {
  const [showFirst, setShowFirst] = useState(true);

  return (
    <>
      <button onClick={() => setShowFirst(!showFirst)}>
        Switch
      </button>
      <TransitionSwitch>
        <CSSTransition
          key={showFirst ? 'first' : 'second'}
          timeout={500}
          classNames="fade"
        >
          <div>{showFirst ? 'First Component' : 'Second Component'}</div>
        </CSSTransition>
      </TransitionSwitch>
    </>
  );
}
```

## Development

To get started with developing `simple-motion-react`:

1. **Clone the repository**
2. **Install dependencies**: `pnpm install`
3. **Run Storybook**: `pnpm storybook`
4. **Run tests**: `pnpm test`

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
