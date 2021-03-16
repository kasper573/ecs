import { Dispatch, useEffect } from "react";
import { EditorState } from "../types/EditorState";
import { EditorActions } from "../types/EditorActions";
import { NativeComponents } from "../../ecs-serializable/types/NativeComponents";
import { ensureNativeComponentsReducer } from "../reducers/ensureNativeComponentsReducer";

/**
 * Hook version of ensureNativeComponents.ts
 */
export const useEnsureNativeComponents = (
  state: EditorState,
  dispatch: Dispatch<EditorActions>,
  nativeComponents: NativeComponents
) =>
  useEffect(() => {
    const update = ensureNativeComponentsReducer(state, nativeComponents);
    if (update !== state) {
      dispatch({ type: "UPDATE_STATE", payload: update });
    }
  }, [state, dispatch, nativeComponents]);
