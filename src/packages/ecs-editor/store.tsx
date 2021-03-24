import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { NativeComponents } from "../ecs-serializable/types/NativeComponents";
import { EditorState } from "./types/EditorState";
import { ensureSelection } from "./reducers/ensureSelection";
import {
  ensureNativeComponentsAction,
  ensureNativeComponents,
} from "./reducers/ensureNativeComponents";
import { core } from "./slices/core";

type RootReducer = typeof core.reducer;

const createRootReducer = (nativeComponents: NativeComponents): RootReducer => (
  state,
  action
) => {
  // Perform core action
  state = core.reducer(state, action);
  // React to state change with generic reducers that make
  // sure certain parts of the state is in a specific way
  state = ensureSelection(state);
  state = ensureNativeComponents(
    state,
    ensureNativeComponentsAction(nativeComponents)
  );
  return state;
};

export const createStore = (
  preloadedState: EditorState,
  nativeComponents: NativeComponents
) =>
  configureStore({
    preloadedState,
    reducer: createRootReducer(nativeComponents),
  });

type EditorStore = ReturnType<typeof createStore>;
type EditorRootState = ReturnType<EditorStore["getState"]>;
type EditorDispatch = EditorStore["dispatch"];

export const useDispatch: () => EditorDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<EditorRootState> = useReduxSelector;
