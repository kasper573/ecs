import { ReactElement, useCallback } from "react";
import { DialogProps } from "@material-ui/core";
import { useRenderProxy } from "./useRenderProxy";

export function useDialog(Dialog: (props: DialogProps) => ReactElement) {
  const [setProps, dialog] = useRenderProxy(Dialog, { open: false, onClose });
  const close = useCallback(() => setProps({ open: false }), [setProps]);
  const open = useCallback(() => setProps({ open: true }), [setProps]);

  function onClose() {
    close();
  }

  return [open, dialog] as const;
}
