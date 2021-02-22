import React, { useState } from "react";
import { DeleteDialog } from "./dialogs/DeleteDialog";
import { NameDialog } from "./dialogs/NameDialog";

export type CrudListWithActionUIProps<T> = {
  createDialogTitle: string;
  getItemName: (item: T) => string;
  onCreateItem: (name: string) => void;
  onRenameItem: (item: T, newName: string) => void;
  onDeleteItem: (item: T) => void;
};

type DialogKind = "create" | "rename" | "delete";

export function useCrudDialogs<T>({
  createDialogTitle,
  getItemName,
  onCreateItem,
  onRenameItem,
  onDeleteItem,
}: CrudListWithActionUIProps<T>) {
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
