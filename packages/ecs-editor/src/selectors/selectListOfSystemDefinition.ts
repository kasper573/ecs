import { createSelector } from "@reduxjs/toolkit";
import { EditorState } from "../types/EditorState";

export const selectListOfSystemDefinition = createSelector(
  (state: EditorState) => state.ecs.systems,
  (systems) => Object.values(systems)
);
