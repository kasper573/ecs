import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from "@material-ui/core";

export type DeleteDialogProps = Pick<DialogProps, "open" | "onClose"> & {
  /**
   * The dialog title and confirm message will use this value
   * to help clarify to the user what is being deleted.
   */
  name: string;
  /**
   * Called when the user has confirmed the delete
   */
  onDelete: () => void;
};

/**
 * A dialog that asks to confirm a delete.
 */
export const DeleteDialog = ({
  onClose = noop,
  onDelete,
  name,
  ...dialogProps
}: DeleteDialogProps) => {
  const manualClose = () => onClose({}, "backdropClick");
  const closeAndDelete = () => {
    manualClose();
    onDelete();
  };
  return (
    <Dialog {...dialogProps} onClose={onClose}>
      <DialogTitle>Delete "{name}"</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete "{name}"
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={manualClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={closeAndDelete} autoFocus color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const noop = () => {};
