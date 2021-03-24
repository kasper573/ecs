import { EditorState } from "../types/EditorState";
import { get } from "../../nominal";

export const selectSelectedSystem = ({
  selection,
  ecs: { systems },
}: EditorState) =>
  selection.system ? get(systems, selection.system) : undefined;
