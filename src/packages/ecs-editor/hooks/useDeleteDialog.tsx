import { useState } from "react";
import {
  createDeleteAction,
  DeleteTarget,
} from "../actions/createDeleteAction";
import { useDispatch, useStore } from "../store";
import { DeleteDialog } from "../components/DeleteDialog";

export const useDeleteDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>();
  const dispatch = useDispatch();
  const store = useStore();
  const [deleteAction, targetName] = deleteTarget ?? [undefined, ""];

  const askToDelete = () => {
    setDeleteTarget(createDeleteAction(store.getState().present));
    setIsOpen(true);
  };
  const performDelete = () => {
    dispatch(deleteAction!);
    setIsOpen(false);
  };
  const cancelDelete = () => setIsOpen(false);

  const dialog = (
    <DeleteDialog
      open={isOpen}
      name={targetName}
      onDelete={performDelete}
      onClose={cancelDelete}
    />
  );

  return [askToDelete, dialog] as const;
};
