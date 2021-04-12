import { getEmptyImage } from "react-dnd-html5-backend";
import { useEffect } from "react";
import { ConnectDragPreview } from "react-dnd";

/**
 * Used to disable the native drag and drop preview when using a custom drag layer.
 */
export const useEmptyDNDPreview = (preview: ConnectDragPreview) => {
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
};
