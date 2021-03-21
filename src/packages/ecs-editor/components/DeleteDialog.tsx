import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from "@material-ui/core";

export type DeleteDialogProps = Pick<DialogProps, "open"> & {
  /**
   * The dialog title and confirm message will use this value
   * to help clarify to the user what is being deleted.
   */
  name: string;
  /**
   * Called when the dialog wants to be closed
   * (either by selecting the close button or delete button)
   */
  onClose: () => void;
  /**
   * Called when the user has confirmed the delete
   */
  onDelete: () => void;
};

/**
 * A dialog that asks to confirm a delete.
 */
export const DeleteDialog = ({
  onClose,
  onDelete,
  name,
  ...dialogProps
}: DeleteDialogProps) => {
  const closeAndDelete = () => {
    onClose();
    onDelete();
  };
  return (
    <Dialog
      {...dialogProps}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Delete "{name}"</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete "{name}"
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={closeAndDelete} autoFocus color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
