import { IAttrs } from './attributes';
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [element: string]: IAttrs;
        }
    }
}
declare type Hypnode = (tag: Tag, attrs?: IAttrs, ...children: any[]) => HTMLElement;
declare type Tag = string | ((attrs?: IAttrs) => HTMLElement);
declare function h(tag: Tag, attrs?: IAttrs, ...children: any[]): HTMLElement;
export { h, Hypnode };
