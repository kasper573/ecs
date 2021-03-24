import { PayloadAction } from "@reduxjs/toolkit";
import { EditorState } from "./EditorState";

export type EditorStateReducer<Payload> = (
  state: EditorState,
  payload: PayloadAction<Payload>
) => void;
