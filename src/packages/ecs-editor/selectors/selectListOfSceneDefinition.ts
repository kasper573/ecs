import { values } from "../../nominal";
import { EditorState } from "../types/EditorState";

export const selectListOfSceneDefinition = (state: EditorState) =>
  values(state.ecs.scenes).filter(
    (scene) => scene.systemId === state.selection.system
  );
