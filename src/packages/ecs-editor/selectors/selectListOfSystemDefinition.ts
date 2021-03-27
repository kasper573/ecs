import { createSelector } from "@reduxjs/toolkit";
import { values } from "../../nominal";
import { EditorState } from "../types/EditorState";

export const selectListOfSystemDefinition = createSelector(
  (state: EditorState) => state.ecs.systems,
  values
);
