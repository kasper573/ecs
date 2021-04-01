import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  useStore as useReduxStore,
} from "react-redux";
import undoable, { excludeAction, StateWithHistory } from "redux-undo";
import { EditorState } from "./types/EditorState";
import { core, noUndoActions } from "./core";

export const createStore = (initialState: EditorState) =>
  configureStore<EditorRootState>({
    reducer: undoable(core.reducer, {
      filter: excludeAction(["@@INIT", ...noUndoActions]),
    }),
    preloadedState: {
      past: [],
      present: initialState,
      future: [],
    },
  });

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
