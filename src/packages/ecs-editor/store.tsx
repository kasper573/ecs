import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { EditorState } from "./types/EditorState";
import { ensureSelection } from "./reducers/ensureSelection";
import { core } from "./slices/core";
import { createFilteredReducer } from "./functions/createFilteredReducer";
import { ensureNativeComponents } from "./reducers/ensureNativeComponents";

const rootReducer = createFilteredReducer(core.reducer, [
  ensureSelection,
  ensureNativeComponents,
]);

export const createStore = (preloadedState: EditorState) =>
  configureStore({
    preloadedState,
    reducer: rootReducer,
  });

type EditorStore = ReturnType<typeof createStore>;
type EditorRootState = ReturnType<EditorStore["getState"]>;
type EditorDispatch = EditorStore["dispatch"];

export const useDispatch: () => EditorDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<EditorRootState> = useReduxSelector;
