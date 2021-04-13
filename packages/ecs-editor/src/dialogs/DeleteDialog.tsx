import { DialogProps } from "@material-ui/core";
import { ConfirmDialog } from "./ConfirmDialog";

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
  onClose,
  onDelete,
  name,
  ...dialogProps
}: DeleteDialogProps) => (
  <ConfirmDialog
    title={`Delete "${name}"`}
    onClose={onClose}
    confirmLabel="Delete"
    message={`Are you sure you want to delete "${name}"`}
    onConfirm={onDelete}
    {...dialogProps}
  />
);
