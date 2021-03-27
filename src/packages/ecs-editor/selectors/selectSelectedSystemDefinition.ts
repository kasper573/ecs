import { EditorState } from "../types/EditorState";
import { get } from "../../nominal";

export const selectSelectedSystemDefinition = ({
  selection,
  ecs: { systems },
}: EditorState) =>
  selection.system ? get(systems, selection.system) : undefined;
