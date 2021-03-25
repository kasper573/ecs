import { EditorState } from "../types/EditorState";
import { values } from "../../nominal";
import { selectSelectedObjects } from "./selectSelectedObjects";

export const selectTopLevelState = (state: EditorState) => {
  const { ecs, selection } = state;
  const selected = selectSelectedObjects(state);
  const selectedSystemLibrary = values(ecs.library).filter(
    (node) => node.systemId === selection.system
  );
  return {
    ecs,
    selection,
    selected,
    selectedSystemScenes: values(ecs.scenes).filter(
      (scene) => scene.systemId === selection.system
    ),
    selectedSceneEntities: values(ecs.entities).filter(
      (entity) => entity.sceneId === selection.scene
    ),
    selectedSystemLibrary,
  };
};
