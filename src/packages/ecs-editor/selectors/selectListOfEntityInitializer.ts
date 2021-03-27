import { values } from "../../nominal";
import { EditorState } from "../types/EditorState";
import { createShallowSelector } from "../functions/createShallowSelector";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";

export const selectListOfEntityInitializer = createShallowSelector(
  (
    state: EditorState,
    forSceneId: SceneDefinitionId | undefined = state.selection.scene
  ) => [state.ecs.entityInitializers, forSceneId] as const,
  ([entityInitializers, forSceneId]) =>
    values(entityInitializers).filter((entity) => entity.sceneId === forSceneId)
);
