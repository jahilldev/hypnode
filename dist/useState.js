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
/* -----------------------------------
 *
 * Use
 *
 * -------------------------------- */
function useState(initial) {
    const index = (callIndex += 1);
    callState = initial;
    const { state } = (context[index] = {
        state: initial,
    });
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
    if (state === null) {
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
        reRender(context[index]);
    };
}
/* -----------------------------------
 *
 * Render
 *
 * -------------------------------- */
function reRender(reference) {
    console.log('reRender', reference);
}
//# sourceMappingURL=useState.js.map