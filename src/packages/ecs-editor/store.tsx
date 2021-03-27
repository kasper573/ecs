import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { NativeComponents } from "../ecs-serializable/types/NativeComponents";
import { EditorState } from "./types/EditorState";
import { ensureSelection } from "./reducers/ensureSelection";
import { core } from "./slices/core";
import { createFilteredReducer } from "./functions/createFilteredReducer";
import { ensureNativeComponents } from "./reducers/ensureNativeComponents";

export const createStore = (
  preloadedState: EditorState,
  nativeComponents: NativeComponents
) =>
  configureStore({
    preloadedState,
    reducer: createFilteredReducer(core.reducer, [
      ensureSelection,
      (state: EditorState) =>
        ensureNativeComponents(state, { type: "", payload: nativeComponents }),
    ]),
  });

type EditorStore = ReturnType<typeof createStore>;
type EditorRootState = ReturnType<EditorStore["getState"]>;
type EditorDispatch = EditorStore["dispatch"];

export const useDispatch: () => EditorDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<EditorRootState> = useReduxSelector;
