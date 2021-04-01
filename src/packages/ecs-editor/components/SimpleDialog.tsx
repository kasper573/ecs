import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@material-ui/core";
import { PropsWithChildren } from "react";

export type SimpleDialogProps = Pick<DialogProps, "open" | "onClose"> &
  PropsWithChildren<{
    /**
     * The dialog title
     */
    title: string;
  }>;

/**
 * A dialog with a title and a single close button that displays children as content.
 */
export const SimpleDialog = ({
  title,
  onClose = () => {},
  children,
  ...dialogProps
}: SimpleDialogProps) => {
  const manualClose = () => onClose({}, "backdropClick");
  return (
    <Dialog {...dialogProps} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={manualClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
