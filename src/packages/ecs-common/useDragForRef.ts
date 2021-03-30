import { MutableRefObject } from "react";
import { useDrag } from "react-dnd";
import {
  DragSourceHookSpec,
  FactoryOrInstance,
} from "react-dnd/dist/types/hooks/types";

/**
 * Identical to react-dnd/useDrag but with refs support.
 * The same ref is used for both drag and dragPreview.
 */
export const useDragForRef = <
  T extends Element,
  DragObject,
  DropResult,
  CollectedProps
>(
  ref: MutableRefObject<T | undefined>,
  specArg: FactoryOrInstance<
    DragSourceHookSpec<DragObject, DropResult, CollectedProps>
  >,
  deps?: unknown[]
) => useDragForRefs({ drag: ref, dragPreview: ref }, specArg, deps);

/**
 * Identical to react-dnd/useDrag but with refs support.
 * Separate ref used for drag and dragPreview.
 */
export const useDragForRefs = <
  T extends Element,
  DragObject,
  DropResult,
  CollectedProps
>(
  refs: {
    drag: MutableRefObject<T | undefined>;
    dragPreview: MutableRefObject<T | undefined>;
  },
  specArg: FactoryOrInstance<
    DragSourceHookSpec<DragObject, DropResult, CollectedProps>
  >,
  deps?: unknown[]
) => {
  const [first, drag, dragPreview, ...rest] = useDrag(specArg, deps);

  const dragWrapped = (el: T) => {
    refs.drag.current = el;
    return drag(el);
  };
  const dragPreviewWrapped = (el: T) => {
    refs.dragPreview.current = el;
    return dragPreview(el);
  };

  return [first, dragWrapped, dragPreviewWrapped, ...rest] as const;
};
