import React, { useState } from "react";
import { DeleteDialog } from "../components/DeleteDialog";
import { NameDialog } from "../components/NameDialog";

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
  // State
  const [dialog, setDialog] = useState<DialogKind>();
  const [selectedItem, selectItem] = useState<T>();
  const selectedItemName = selectedItem ? getItemName(selectedItem) : "";

  // Event handlers
  const handleClose = () => setDialog(undefined);
  const handleRename = (newName: string) =>
    onRenameItem(selectedItem!, newName);
  const handleDelete = () => onDeleteItem(selectedItem!);

  // Actions
  const showCreateDialog = () => {
    selectItem(undefined);
    setDialog("create");
  };
  const showRenameDialog = (item: T) => {
    setDialog("rename");
    selectItem(item);
  };
  const showDeleteDialog = (item: T) => {
    setDialog("delete");
    selectItem(item);
  };

  const Dialogs = () => (
    <>
      <NameDialog
        open={dialog === "create"}
        title={createDialogTitle}
        defaultValue={selectedItemName}
        onClose={handleClose}
        onSave={onCreateItem}
      />
      <NameDialog
        open={dialog === "rename"}
        title={`Edit "${selectedItemName}"`}
        defaultValue={selectedItemName}
        onClose={handleClose}
        onSave={handleRename}
      />
      <DeleteDialog
        open={dialog === "delete"}
        onClose={handleClose}
        onDelete={handleDelete}
        name={selectedItemName}
      />
    </>
  );

  const events = {
    onCreateItem: showCreateDialog,
    onUpdateItem: showRenameDialog,
    onDeleteItem: showDeleteDialog,
  };

  return [events, Dialogs] as const;
}

type DialogKind = "create" | "rename" | "delete";
