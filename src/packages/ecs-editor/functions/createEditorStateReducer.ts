import { PayloadAction } from "@reduxjs/toolkit";
import { EditorState } from "../types/EditorState";
import { createSingleCaseReducer } from "./createSingleCaseReducer";
import { createEditorState } from "./createEditorState";

export const createEditorStateReducer = <P>(
  reducer: (state: EditorState, action: PayloadAction<P>) => EditorState | void
) => createSingleCaseReducer(createEditorState(), reducer);
