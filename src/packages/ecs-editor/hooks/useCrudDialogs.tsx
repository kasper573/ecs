import { DeleteDialog } from "../components/DeleteDialog";
import { NameDialog } from "../components/NameDialog";
import { useRenderProxy } from "./useRenderProxy";

export type UseCrudDialogsProps<T> = {
  /**
   * The title for the create dialog
   */
  createDialogTitle: string;
  /**
   * Gets the name for a given item
   */
  getItemName: (item: T) => string;
  /**
   * Called when the create dialog flow has finished successfully
   * @param name The specified name to create an item for
   */
  onCreateItem: (name: string) => void;
  /**
   * Called when the rename dialog flow has finished successfully
   * @param item The item selected to be renamed
   * @param name The specified name to rename the item to
   */
  onRenameItem: (item: T, newName: string) => void;
  /**
   * Called when the delete dialog flow has finished successfully
   * @param item The item selected to be deleted
   */
  onDeleteItem: (item: T) => void;
};

/**
 * Provides create, rename and delete dialogs
 * and emits results via event properties.
 */
export function useCrudDialogs<T>({
  createDialogTitle,
  getItemName,
  onCreateItem,
  onRenameItem,
  onDeleteItem,
}: UseCrudDialogsProps<T>) {
  const [setNameDialogProps, nameDialog] = useRenderProxy(NameDialog, {
    open: false,
  });
  const [setDeleteDialogProps, deleteDialog] = useRenderProxy(DeleteDialog, {
    open: false,
  });

  const events = {
    onCreateItem: () => {
      setNameDialogProps({
        open: true,
        title: createDialogTitle,
        defaultValue: "",
        onSave: onCreateItem,
        onClose: () => setNameDialogProps({ open: false }),
      });
    },
    onUpdateItem: (item: T) => {
      setNameDialogProps({
        open: true,
        title: `Edit ${getItemName(item)}`,
        defaultValue: getItemName(item),
        onSave: (name) => onRenameItem(item, name),
        onClose: () => setNameDialogProps({ open: false }),
      });
    },
    onDeleteItem: (item: T) => {
      setDeleteDialogProps({
        open: true,
        name: getItemName(item),
        onDelete: () => onDeleteItem(item),
        onClose: () => setDeleteDialogProps({ open: false }),
      });
    },
  };

  const dialogs = (
    <>
      {nameDialog}
      {deleteDialog}
    </>
  );

  return [events, dialogs] as const;
}
