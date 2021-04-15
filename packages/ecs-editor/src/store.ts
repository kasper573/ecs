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
  routerMiddleware,
  RouterState,
} from "connected-react-router";
import { History } from "history";
import { EditorState } from "./types/EditorState";
import { core, noUndoActions } from "./core";

export const createRootReducer = (
  history: History<unknown>
): Reducer<EditorRootState> =>
  combineReducers({
    router: connectRouter(history),
    editor: undoable(core.reducer, {
      filter: excludeAction(["@@INIT", ...noUndoActions]),
      limit: 30,
    }),
  });

export const createStore = (
  history: History<unknown>,
  initialState: EditorState
) =>
  configureStore({
    reducer: createRootReducer(history),
    middleware: (defaults) => defaults().concat(routerMiddleware(history)),
    preloadedState: {
      router: {
        action: history.action,
        location: history.location,
      },
      editor: {
        past: [],
        present: initialState,
        future: [],
      },
    },
  });

type EditorStore = ReturnType<typeof createStore>;
type EditorDispatch = EditorStore["dispatch"];
type EditorRootState = {
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
