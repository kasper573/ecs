import useHotkeys from "react-use-hotkeys";
import { ActionCreators } from "redux-undo";
import { memo } from "react";
import { useDispatch, useStore } from "../store";
import { useDialog } from "../hooks/useDialog";
import {
  createDeleteAction,
  DeleteTarget,
} from "../actions/createDeleteAction";
import { isInputEvent } from "../functions/isInputEvent";
import { DeleteDialog } from "../dialogs/DeleteDialog";

export const Hotkeys = memo(() => {
  const store = useStore();
  const dispatch = useDispatch();

  const showDeleteDialog = useDialog((props, [action, name]: DeleteTarget) => (
    <DeleteDialog {...props} name={name} onDelete={() => dispatch(action)} />
  ));

  const tryDeleteSelected = (e: KeyboardEvent) => {
    if (isInputEvent(e)) {
      // Ignore deletes in input elements
      return;
    }
    const target = createDeleteAction(store.getState().present);
    if (target) {
      showDeleteDialog(target);
    }
  };

  useHotkeys("delete", tryDeleteSelected, []);
  useHotkeys("control+z", () => dispatch(ActionCreators.undo()), []);
  useHotkeys("control+shift+z", () => dispatch(ActionCreators.redo()), []);

  return null;
});
