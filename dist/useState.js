"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */
const context = {};
let callIndex = -1;
let callRender = null;
/* -----------------------------------
 *
 * Use
 *
 * -------------------------------- */
function useState(initial) {
    let index = callIndex;
    let state = initial;
    if (callRender !== null) {
        index = callRender;
        state = context[index].state;
    }
    return [state, setValue(index)];
}
exports.useState = useState;
/* -----------------------------------
 *
 * Index
 *
 * -------------------------------- */
function setIndex(tag, attrs) {
    if (callRender !== null) {
        return callRender;
    }
    const index = (callIndex += 1);
    context[index] = {
        tag,
        attrs,
        node: null,
        state: null,
    };
    return index;
}
exports.setIndex = setIndex;
/* -----------------------------------
 *
 * Element
 *
 * -------------------------------- */
function setElement(node, index) {
    context[index].node = node;
    return node;
}
exports.setElement = setElement;
/* -----------------------------------
 *
 * Set
 *
 * -------------------------------- */
function setValue(index) {
    return (value) => {
        context[index].state = value;
        reRender(index);
    };
}
/* -----------------------------------
 *
 * Render
 *
 * -------------------------------- */
function reRender(index) {
    const { tag, attrs, node } = context[index];
    callRender = index;
    const result = tag(attrs);
    callRender = null;
    setTimeout(() => node.parentNode.replaceChild(result, node), 0);
    context[index].node = result;
}
//# sourceMappingURL=useState.js.map