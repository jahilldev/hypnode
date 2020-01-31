import { Hypnode } from './index';

/* -----------------------------------
 *
 * IAttrs
 *
 * -------------------------------- */

interface IAttrs {
  [index: string]: any;
  children?: string | Hypnode[];
  ref?: (el: HTMLElement) => void;
  id?: string;
  title?: string;
  class?: string;
  className?: string;
  style?: { [property: string]: string };
  onClick?: EventListener;
  onChange?: EventListener;
  onKeyUp?: EventListener;
  onKeyDown?: EventListener;
  onKeyPress?: EventListener;
  onMouseEnter?: EventListener;
  onMouseLeave?: EventListener;
  onMouseMove?: EventListener;
  onMouseOver?: EventListener;
  onMouseOut?: EventListener;
  onMouseUp?: EventListener;
  onMouseDown?: EventListener;
  onMouseWheel?: EventListener;
  onLoad?: EventListener;
  onLoadedData?: EventListener;
  onLoadedMetaData?: EventListener;
  onLoadStart?: EventListener;
  onAbort?: EventListener;
  onAfterPrint?: EventListener;
  onAnimationEnd?: EventListener;
  onAnimationIteration?: EventListener;
  onAnimationStart?: EventListener;
  onBeforePrint?: EventListener;
  onBeforeUnload?: EventListener;
  onBlur?: EventListener;
  onCanPlay?: EventListener;
  onCanPlayThrough?: EventListener;
  onContextMenu?: EventListener;
  onCopy?: EventListener;
  onCut?: EventListener;
  onDblClick?: EventListener;
  onDrag?: EventListener;
  onDragEnd?: EventListener;
  onDragEnter?: EventListener;
  onDragLeave?: EventListener;
  onDragOver?: EventListener;
  onDragStart?: EventListener;
  onDrop?: EventListener;
  onDurationChange?: EventListener;
  onEnded?: EventListener;
  onError?: EventListener;
  onFocus?: EventListener;
  onFocusIn?: EventListener;
  onFocusOut?: EventListener;
  onFullScreenChange?: EventListener;
  onFullScreenError?: EventListener;
  onHashChange?: EventListener;
  onInput?: EventListener;
  onInvalid?: EventListener;
  onMessage?: EventListener;
  onOffline?: EventListener;
  onOnline?: EventListener;
  onOpen?: EventListener;
  onPageHide?: EventListener;
  onPageShow?: EventListener;
  onPaste?: EventListener;
  onPause?: EventListener;
  onPlay?: EventListener;
  onPlaying?: EventListener;
  onPopState?: EventListener;
  onProgress?: EventListener;
  onRateChange?: EventListener;
  onResize?: EventListener;
  onReset?: EventListener;
  onScroll?: EventListener;
  onSearch?: EventListener;
  onSeeked?: EventListener;
  onSeeking?: EventListener;
  onSelect?: EventListener;
  onShow?: EventListener;
  onStalled?: EventListener;
  onStorage?: EventListener;
  onSubmit?: EventListener;
  onSuspend?: EventListener;
  onTimeUpdate?: EventListener;
  onToggle?: EventListener;
  onTouchCancel?: EventListener;
  onTouchEnd?: EventListener;
  onTouchMove?: EventListener;
  onTouchStart?: EventListener;
  onTransitionEnd?: EventListener;
  onUnload?: EventListener;
  onVolumeChange?: EventListener;
  onWaiting?: EventListener;
  onWheel?: EventListener;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IAttrs };
