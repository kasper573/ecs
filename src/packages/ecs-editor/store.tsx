import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  useStore as useReduxStore,
} from "react-redux";
import undoable, { StateWithHistory } from "redux-undo";
import { NativeComponents } from "../ecs-serializable/types/NativeComponents";
import { EditorState } from "./types/EditorState";
import { ensureSelection } from "./reducers/ensureSelection";
import { core } from "./slices/core";
import { ensureNativeComponents } from "./reducers/ensureNativeComponents";

/**
 * Hacky way to ensure selection and native components are always present.
 */
const filterState = (
  state: EditorState,
  nativeComponents: NativeComponents
) => {
  state = ensureSelection(state);
  state = state = ensureNativeComponents(state, {
    type: "",
    payload: nativeComponents,
  });
  return state;
};

export const createStore = (
  initialState: EditorState,
  nativeComponents: NativeComponents
) => {
  const editorStateReducer = undoable(core.reducer);
  return configureStore<EditorRootState>({
    preloadedState: {
      past: [],
      present: initialState,
      future: [],
    },
    reducer: (state, action) => {
      state = editorStateReducer(state, action);
      return {
        ...state,
        present: filterState(state.present, nativeComponents),
      };
    },
  });
};

type EditorStore = ReturnType<typeof createStore>;
type EditorRootState = StateWithHistory<EditorState>;
type EditorDispatch = EditorStore["dispatch"];

export const useStore: () => EditorStore = useReduxStore;
export const useDispatch: () => EditorDispatch = useReduxDispatch;

/**
 * Select from the root state
 * (EditorState + undo/redo history)
 */
export const useRootSelector: TypedUseSelectorHook<EditorRootState> = useReduxSelector;

/**
 * Select from EditorState
 */
export const useSelector: TypedUseSelectorHook<EditorState> = (
  selectFromEditorState,
  equalityFn
) =>
  useRootSelector(
    (rootState) => selectFromEditorState(rootState.present),
    equalityFn
  );
