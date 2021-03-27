import { EditorState } from "../types/EditorState";
import { get } from "../../ecs-common/nominal";

export const selectSelectedSceneDefinition = ({
  selection,
  ecs: { scenes },
}: EditorState) => (selection.scene ? get(scenes, selection.scene) : undefined);
