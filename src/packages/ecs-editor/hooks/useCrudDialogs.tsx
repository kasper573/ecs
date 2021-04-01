import { IconButton, Tooltip } from "@material-ui/core";
import { NameDialog } from "../components/NameDialog";
import { DeleteDialog } from "../components/DeleteDialog";
import { AddIcon } from "../icons";
import { useDialog } from "./useDialog";

type UseCrudDialogHandlers<T> = {
  create: (name: string) => void;
  rename: (o: T, name: string) => void;
  remove: (o: T) => void;
};

export function useCrudDialogs<T>(
  noun: string,
  getName: (o: T) => string,
  {
    create = noop,
    rename = noop,
    remove = noop,
  }: Partial<UseCrudDialogHandlers<T>> = {}
) {
  const createTitle = `New ${noun}`;

  const showCreateDialog = useDialog((props) => (
    <NameDialog {...props} title={createTitle} onSave={create} />
  ));

  const showRenameDialog = useDialog((props, o: T) => (
    <NameDialog
      {...props}
      title={`Rename ${getName(o)}`}
      defaultValue={getName(o)}
      onSave={(name) => rename(o, name)}
    />
  ));

  const showDeleteDialog = useDialog((props, o: T) => (
    <DeleteDialog {...props} name={getName(o)} onDelete={() => remove(o)} />
  ));

  const createButton = (
    <Tooltip title={createTitle}>
      <IconButton
        edge="end"
        aria-label={createTitle}
        onClick={showCreateDialog}
      >
        <AddIcon />
      </IconButton>
    </Tooltip>
  );

  return [
    {
      showCreateDialog,
      showRenameDialog,
      showDeleteDialog,
      createTitle,
    },
    createButton,
  ] as const;
}

const noop = () => {};
