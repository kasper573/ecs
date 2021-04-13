import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from "@material-ui/core";

export type ConfirmDialogProps = Pick<DialogProps, "open" | "onClose"> & {
  /**
   * The dialog title
   */
  title: string;
  /**
   * The dialog content message
   */
  message: string;
  /**
   * The label to use for the cancel button.
   * Defaults to "Cancel"
   */
  cancelLabel?: string;
  /**
   * The label to use for the confirm button.
   * Defaults to "Confirm"
   */
  confirmLabel?: string;
  /**
   * Called when the user has confirmed
   */
  onConfirm: () => void;
};

/**
 * A dialog that asks to confirm a confirm.
 */
export const ConfirmDialog = ({
  onClose = noop,
  onConfirm,
  title,
  message,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  ...dialogProps
}: ConfirmDialogProps) => {
  const manualClose = () => onClose({}, "backdropClick");
  const closeAndConfirm = () => {
    manualClose();
    onConfirm();
  };
  return (
    <Dialog {...dialogProps} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={manualClose} color="secondary">
          {cancelLabel}
        </Button>
        <Button onClick={closeAndConfirm} autoFocus color="primary">
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const noop = () => {};
