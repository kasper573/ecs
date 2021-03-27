import useHotkeys from "react-use-hotkeys";
import { ActionCreators } from "redux-undo";
import { useDispatch } from "../store";

export const Hotkeys = () => {
  const dispatch = useDispatch();
  useHotkeys("control+z", () => dispatch(ActionCreators.undo()), []);
  useHotkeys("control+shift+z", () => dispatch(ActionCreators.redo()), []);
  return null;
};
