import { values } from "../../nominal";
import { EditorState } from "../types/EditorState";

export const selectListOfSystemDefinition = (state: EditorState) =>
  values(state.ecs.systems);
