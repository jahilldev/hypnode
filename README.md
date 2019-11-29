A super fast and lightweight (**492bytes**) utility function to build HTML node trees, either directly or from transpiled JSX.

## Getting Started

To install `hypnode`, you can use of the following in your project:

`yarn add hypnode` or `npm install hypnode`

## Usage

`hypode` can be used in one of two ways, either as a target for JSX transpilation, or directly using the exposed `h` function. It's exported as ES6, so if you need to support older environments there will need to be a transpilation stage to ES5 in your build tasks.

### JSX Elements

Coming soon!

### Direct Usage

The `h` function can be imported in the following ways:

```
import { h } from 'hypnode';
```

or

```
const { h } = require('hypnode');
```

Once imported, you can use the function to generate a built tree of DOM Nodes. The function takes 3 arguments, the last two of which are optional:

```
h(type: string, attributes?: object, children?: array[]);
```

## Simple Example

The below code:

```
const result = h('div', { title: 'A DIV!' }, [
   h('h1', { class: 'title' }, 'Hypnode'),
   h('p', { id: 'text'}, 'My text value'),
);

console.log(result.outerHTML);
```

Will produce the following:

```
<div title="A DIV!">
   <h1 class="title">Hypnode</h1>
   <p id="text">My text value</p>
</div>
```

## Event Binding

`hypnode` provides a simple set of properties for you to apply events to your built elements, all native DOM events are supported, formatted in camelCase. For example:

```
h('a', { onClick: (ev) => console.log(ev) }, 'Click Here');
```

## Element References

If you need access to a particular node in your built tree, you can use the `ref` property, similar to other libraries that use JSX. For example:

```
let myElement;
...
h('div', { id: 'container' }, [
   h('p', { class: 'description', ref: (el) => myElement = el }, 'Lorem ipsum dolor sit amet, consectetur')
]);
```

## Building Components

`hypnode` can also be used to create re-usable, functional components, below is a simple example:

```
function Button({ buttonText }) {
    return h('a', { class: 'button' }, buttonText);
}
...
const root = document.getElementById('root');
const button = Button({ buttonText: 'My Button' });

root.appendChild(button);
```

## TypeScript

This utility was created with TypeScript and comes pre-bundled with a definition file.
