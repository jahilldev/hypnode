A super fast and lightweight (roughly **1kb** gzipped) utility function to build HTML node trees and stateful functional components. Can be used either directly via the `h` function, or from transpiled `JSX`.

Due to it's size, `hypnode` is a useful companion utility for writing _WebComponents_, simplifying `HTML` structures, element references and state management. See section entitled "WebComponents" for an example.

# Getting Started

To install `hypnode`, you can use one of the following in your project:

`yarn add hypnode` or `npm install hypnode`

`hypode` can be used in one of two ways, either as a target for `JSX` transpilation, or directly using the exposed `h` function. It's exported as ES6, so if you need to support older environments, you'll need to transpile down to ES5 in your build tasks.

The `h` function can be imported in one of the following ways:

```javascript
import { h } from 'hypnode';
```

```javascript
const { h } = require('hypnode');
```

# Direct Usage

Once imported, use the function to generate your tree of DOM Nodes. The function takes 3 arguments, the last two of which are optional:

```
h([type]: string | Function, [attributes]?: object, [children]?: array[]);
```

## Simple Example

The code below:

```javascript
const result = h('div', { title: 'A DIV!' }, [
   h('h1', { class: 'title' }, 'Hypnode'),
   h('p', { id: 'text'}, 'My text value'),
);

console.log(result.outerHTML);
```

Will produce the following:

```html
<div title="A DIV!">
  <h1 class="title">Hypnode</h1>
  <p id="text">My text value</p>
</div>
```

# JSX Elements

`hypnode` can be used with `JSX` to provide a more familiar API when building DOM structures. This will need a transpilation step, see below for examples.

## TypeScript

Transpilation of `JSX` is provided out of the box by custom factories (TypeScript 1.8+), to apply this, add the following to your `tsconfig.json` file:

```json
"compilerOptions": {
   "jsx": "react",
   "jsxFactory": "h",
   /*[...]*/
}
```

This tells the TypeScript compiler to convert all `JSX` elements into function calls, in this case using our exported `h` function. You'll still need to import the `h` function in every file where you're using `JSX`.

To apply the correct types, all files that contain `JSX` must have the extension `.tsx`.

## Simple Example

The code below:

```javascript
const root = document.getElementId('root');

/*[...]*/

const result = (
  <div class="wrapper">
    <a id="link" onClick={(ev = console.log(ev))}>
      Click here
    </a>
  </div>
);

root.appendChild(result);
```

Will produce the following:

```html
<div class="wrapper">
  <a id="link">
    Click here
  </a>
</div>
```

# Rendering

As `hypnode` just returns a fully formed `HTMLElement`, you can handle it's output easily using native `DOM` API's like `root.appendChild` or `root.replaceChild`. There is, however, a helper function exported to aid with this:

```javascript
const root = document.getElementById('root');

/*[...]*/

const result = h('div', { class: 'wrapper' }, 'Lorem ipsum');

/*[...]*/

render(root, result);
```

or, with `JSX`:

```javascript
const root = document.getElementById('root');

/*[...]*/

const result = <div class="wrapper">Lorem ipsum</div>;

/*[...]*/

render(root, result);
```

# Event Binding

`hypnode` provides a set of properties for you to apply DOM events. All native events are supported, formatted in camelCase and prefixed with `on`. For example:

```javascript
h('a', { onClick: (ev) => console.log(ev) }, 'Click Here');
```

or, with `JSX`:

```javascript
<input onKeyUp={(ev) => console.log(ev)} />
```

# Element References

If you need access to a particular node in your tree, use the `ref` property. For example:

```javascript
let myElement;

/*[...]*/

h('div', { id: 'container' }, [
  h(
    'p',
    { ref: (el) => (myElement = el) },
    'Lorem ipsum dolor sit amet, consectetur'
  ),
]);
```

or with `JSX`:

```javascript
let myElement;

/*[...]*/

<div class="wrapper">
  <a href="//link.co" ref={(el) => (myElement = el)}>
    Click here
  </a>
</div>;
```

# Components

`hypnode` can be used to create re-usable, functional components, below is a simple example:

```javascript
const root = document.getElementById('root');

/*[...]*/

function Button({ className = '', children }) {
  return h('a', { class: `button ${className}` }, children);
}

/*[...]*/

const button = h(Button, { className: 'big' }, buttonText);

root.appendChild(button);
```

or with `JSX`:

```javascript
const root = document.getElementById('root');

/*[...]*/

function Button({ className = '', children }) {
  return <a class={`button ${className}`}>{children}</a>;
}

/*[...]*/

root.appendChild(<Button className="big">Click here</Button>);
```

# State

`hypnode` exposes a simple, declarative hook to provide state into your functional application.

First, you'll need to import the hook function:

```javascript
import { h, useState } from 'hypnode';
```

Once imported, you can initialize a state registry in your components by doing the following:

```javascript
const [state, setState] = useState(([value]: any));
```

The `useState` function takes a single argument, the initial value you wish to assign to the state. This can be anything, a primitive or something more complex like an object. For example:

```javascript
function Button({ buttonText }) {
  const [state, setState] = useState(10);

  return h(
    'button',
    { onClick: () => setState(state + 1) },
    `${buttonText}: ${state}`
  );
}
```

You provide mutations to your state via the `setState` function, this accepts a _new_ value you wish to assign. Whenever this function is called, the component will be re-rendered.

## WebComponents

Creating and managing complex HTML structures using _WebComponents_ can become tricky as their size increases. `hypnode` simplifies this by incorporating a familiar component and state pattern into your custom elements. You can find more info on _WebComponents_ [here](https://www.webcomponents.org/introduction). As `hypnode` is fast and lightweight, _WebComponents_ can be more easily shared between projects without significant dependency overhead.

A quick example can be found below:

```javascript
// myComponent.tsx (TypeScript + JSX)

import { h, useState, State } from  'hypnode';

/*[...]*/

class MyComponent extends HTMLElement {
   private state: State<number>;

   public connectedCallback() {
      const Button = () => this.renderButton();

      this.appendChild(<Button  />);
   }

   private  renderButton = () => {
      const [counter] = (this.state =  useState(0));

      return (
         <div class="my-component">
            <p>Counter: {counter}</p>
            <button onClick={this.onClick}>Click Here</button>
         </div>
      );
   }

   private onClick = (ev: Event) => {
      const [counter, setState] = this.state;

      setState(counter + 1);
   }
}
```

# SSR

`hypnode` provides a fallback Virtual `DOM` representation for server side rendering (universal rendering). You can use this output to generate a complete `HTML` representation of your app. This output depends on a `window.document` reference being undefined, if it is, `hypnode` will return a virtual `DOM` object. A prebuilt utility that can convert this into an `HTML` string can be found here: [`hypnode-server`](https://github.com/jhdevuk/hypnode-server)

# TypeScript

This utility was created with TypeScript and comes pre-bundled with a definition file.
