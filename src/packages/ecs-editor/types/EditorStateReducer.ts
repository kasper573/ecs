import { EditorState } from "./EditorState";

export type EditorStateReducer<Payload> = (
  state: EditorState,
  payload: Payload
) => EditorState;
