import { EditorState } from "../types/EditorState";
import { get } from "../../ecs-common/nominal";

export const selectSelectedSystemDefinition = ({
  selection,
  ecs: { systems },
}: EditorState) =>
  selection.system ? get(systems, selection.system) : undefined;
