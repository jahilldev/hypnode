"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */
const context = {};
let callIndex = -1;
let callState = null;
let callRender = null;
/* -----------------------------------
 *
 * Use
 *
 * -------------------------------- */
function useState(initial) {
    let index = (callIndex += 1);
    let state = initial;
    if (callRender !== null) {
        index = callRender;
        state = context[index].state;
    }
    callState = initial;
    return [state, setValue(index)];
}
exports.useState = useState;
/* -----------------------------------
 *
 * Index
 *
 * -------------------------------- */
function setIndex(tag, attrs, node) {
    const state = callState;
    if (state === null || callRender !== null) {
        return;
    }
    context[callIndex] = {
        tag,
        attrs,
        node,
        state,
    };
    callState = null;
}
exports.setIndex = setIndex;
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