## Getting Started

These instructions will get you setup to use `hypnode` in your project.

`yarn add hypnode`
or
`npm install hypnode`

## Usage

`hypode` can be used in one of two ways, either as a target for JSX transpilation, or directly using the exposed function `h`.

### JSX Elements

TBD

### Direct Usage

The `h` function can be imported in the following ways:

`import { h } from 'hypnode`
or
`const { h } = require('hypnode');`

Once imported, you can use the function to generate a built tree of DOM Nodes, for example. The function takes 3 arguments, the last two of which are optional:

`h(type: string, attributes?: object, children?: array[]);`

## Simple Example

The following usage:

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
