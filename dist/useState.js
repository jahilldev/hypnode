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
    callIndex += 1;
    callState = initial;
    const { state } = (context[callIndex] = {
        state: initial,
    });
    return [state, setValue(callIndex)];
}
exports.useState = useState;
/* -----------------------------------
 *
 * Set
 *
 * -------------------------------- */
function setValue(index) {
    const reference = context[index];
    return (value) => {
        reference.state = value;
    };
}
/* -----------------------------------
 *
 * Index
 *
 * -------------------------------- */
function setIndex(tag, attrs, node) {
    if (!callState) {
        return;
    }
    context[callIndex] = {
        tag,
        attrs,
        node,
        state: callState,
    };
    callState = null;
}
exports.setIndex = setIndex;
//# sourceMappingURL=useState.js.map