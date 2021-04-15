import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  useStore as useReduxStore,
} from "react-redux";
import undoable, { excludeAction, StateWithHistory } from "redux-undo";
import {
  connectRouter,
  RouterLocation,
  routerMiddleware,
  RouterState,
} from "connected-react-router";
import { History } from "history";
import { EditorState } from "./types/EditorState";
import { core, noUndoActions } from "./core";

export const createRootReducer = (history: History): Reducer<EditorRootState> =>
  combineReducers({
    router: connectRouter(history),
    editor: undoable(core.reducer, {
      filter: excludeAction(["@@INIT", ...noUndoActions]),
      limit: 30,
    }),
  });

export const createRootState = (
  history: History,
  editorState: EditorState
): EditorRootState => ({
  router: {
    action: history.action,
    location: history.location as RouterLocation<unknown>,
  },
  editor: {
    past: [],
    present: editorState,
    future: [],
  },
});

export const createStore = (history: History, editorState: EditorState) =>
  configureStore({
    reducer: createRootReducer(history),
    middleware: (defaults) => defaults().concat(routerMiddleware(history)),
    preloadedState: createRootState(history, editorState),
  });

type EditorStore = ReturnType<typeof createStore>;
type EditorDispatch = EditorStore["dispatch"];

export type EditorRootState = {
  editor: StateWithHistory<EditorState>;
  router: RouterState;
};

export const useStore: () => EditorStore = useReduxStore;

export const useDispatch: () => EditorDispatch = useReduxDispatch;

export const useRootSelector: TypedUseSelectorHook<EditorRootState> = useReduxSelector;

export const useSelector: TypedUseSelectorHook<EditorState> = (
  selectFromEditorState,
  equalityFn
) =>
  useRootSelector(
    (rootState) => selectFromEditorState(rootState.editor.present),
    equalityFn
  );
