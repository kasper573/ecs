import useHotkeys from "react-use-hotkeys";
import { ActionCreators } from "redux-undo";
import { useDispatch } from "../store";
import { useDeleteDialog } from "../hooks/useDeleteDialog";

export const Hotkeys = () => {
  const dispatch = useDispatch();
  const [askToDelete, deleteDialog] = useDeleteDialog();

  useHotkeys("delete", askToDelete, []);
  useHotkeys("control+z", () => dispatch(ActionCreators.undo()), []);
  useHotkeys("control+shift+z", () => dispatch(ActionCreators.redo()), []);

  return deleteDialog;
};
