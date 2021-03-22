import { EditorStateReducer } from "../types/EditorStateReducer";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../../ecs-serializable/types/EntityInitializer";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { requireScene } from "../selectors/requireScene";
import { updateSceneReducer } from "./updateSceneReducer";

export const updateEntityInitializerReducer: EditorStateReducer<{
  systemId: SystemDefinitionId;
  sceneId: SceneDefinitionId;
  entityId: EntityInitializerId;
  update: Partial<EntityInitializer>;
}> = (state, { systemId, sceneId, entityId, update }) => {
  const scene = requireScene(state, systemId, sceneId);
  const index = scene.entities.findIndex(({ id }) => id === entityId);
  if (index === -1) {
    throw new Error(`Entity initializer not found in scene`);
  }
  const updatedInstances = scene.entities.slice();
  const entityInitializer = updatedInstances[index];
  updatedInstances[index] = { ...entityInitializer, ...update };
  return updateSceneReducer(state, {
    systemId,
    sceneId,
    update: {
      entities: updatedInstances,
    },
  });
};
