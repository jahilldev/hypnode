/* -----------------------------------
 *
 * IAttrs
 *
 * -------------------------------- */

interface IAttrs {
   [index: string]: any;
   onClick: EventListener;
   onMouseUp: EventListener;
   onMouseDown: EventListener;
   onMouseEnter: EventListener;
   onMouseLeave: EventListener;
   onMouseMove: EventListener;
   onMouseOver: EventListener;
   onMouseWheel: EventListener;
   onMouseOut: EventListener;
   onKeyUp: EventListener;
   onKeyDown: EventListener;
   onKeyPress: EventListener;
   onChange: EventListener;
   onSubmit: EventListener;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IAttrs };
