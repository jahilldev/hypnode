import { IAttrs } from './attributes';
declare type Component = (attrs?: IAttrs) => HTMLElement;
declare function useState(initial: any): any[];
declare function setIndex(tag: Component, attrs: IAttrs, node: HTMLElement): void;
export { useState, setIndex };
