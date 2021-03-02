import { ActionToReducer } from "../actionToReducer";
import { EditorStateReducer } from "./EditorStateReducer";

/**
 * The actions you can dispatch when using the root reducer (see rootReducer.ts).
 * (Automatically derived from actionToReducer.ts)
 *
 * Example:
 * const [state, dispatch] = useReducer(rootReducer); // dispatch has the type React.Dispatch<EditorActions>
 */
export type EditorActions = EditorActionRecord[keyof EditorActionRecord];

type EditorAction<ActionName, Payload> = {
  type: ActionName;
  payload: Payload;
};

type EditorActionRecord = {
  [ActionName in keyof ActionToReducer]: EditorAction<
    ActionName,
    EditorActionPayloads[ActionName]
  >;
};

type EditorActionPayloads = {
  [ActionName in keyof ActionToReducer]: ReducerPayload<
    ActionToReducer[ActionName]
  >;
};

type ReducerPayload<T> = T extends EditorStateReducer<infer P> ? P : never;
