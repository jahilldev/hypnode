import { IAttrs } from './attributes';
declare type Component = (attrs?: IAttrs) => HTMLElement;
declare function useState(initial: any): any[];
declare function setIndex(tag: Component, attrs: IAttrs): number;
declare function setElement(node: HTMLElement, index: number): HTMLElement;
export { useState, setIndex, setElement };
