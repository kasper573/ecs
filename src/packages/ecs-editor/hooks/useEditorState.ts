import { useMemo, useReducer } from "react";
import { ensureSelectionReducer } from "../reducers/ensureSelectionReducer";
import { ensureNativeComponentsReducer } from "../reducers/ensureNativeComponentsReducer";
import { createActionReducer } from "../functions/createActionReducer";
import { actionToReducer } from "../actionToReducer";
import { EditorState } from "../types/EditorState";
import { NativeComponents } from "../../ecs-serializable/types/NativeComponents";
import { combineReducers } from "../functions/combineReducers";
import { EditorStateReducer } from "../types/EditorStateReducer";

export const useEditorState = (
  nativeComponents: NativeComponents,
  defaultState: EditorState
) => {
  // Filters are reducers that are applied to the state after any action
  // We use filterUntilNoChange to keep running all filters until the state has stabilized.
  // (This allows a filter to have recursive effects)
  const filterState = useMemo(() => {
    const filter = combineReducers(
      (state: EditorState) =>
        ensureNativeComponentsReducer(state, nativeComponents),
      ensureSelectionReducer
    );
    return (state: EditorState) => filterUntilNoChange(filter, state);
  }, [nativeComponents]);

  const filteredDefaultState = useMemo(() => filterState(defaultState), [
    filterState,
    defaultState,
  ]);

  const rootReducer = useMemo(
    () => createActionReducer(actionToReducer, filterState),
    [filterState]
  );

  return useReducer(rootReducer, filteredDefaultState);
};

const filterUntilNoChange = (
  filter: EditorStateReducer<void>,
  initialState: EditorState
) => {
  let previousState = undefined;
  let state = initialState;
  while (state !== previousState) {
    previousState = state;
    state = filter(state);
  }
  return state;
};
