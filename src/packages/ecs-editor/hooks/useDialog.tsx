import React, { ReactElement, useCallback, useState } from "react";
import { DialogProps } from "@material-ui/core";

export function useDialog(
  Dialog: (props: Pick<DialogProps, "open" | "onClose">) => ReactElement
) {
  const [isOpen, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const open = useCallback(() => setOpen(true), []);
  return [open, <Dialog open={isOpen} onClose={close} />] as const;
}
