import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { EntityInitializerId } from "../../ecs-serializable/types/EntityInitializer";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";
import { requireScene } from "../selectors/requireScene";
import { reactToDeleteReducer } from "./reactToDeleteReducer";
import { updateSceneReducer } from "./updateSceneReducer";

export const deleteEntityInitializerReducer: EditorStateReducer<{
  systemId: SystemDefinitionId;
  sceneId: SceneDefinitionId;
  entityId: EntityInitializerId;
}> = (state, { systemId, sceneId, entityId }) => {
  const entities = requireScene(state, systemId, sceneId).entities;
  const entity = entities.find(({ id }) => id === entityId);
  if (!entity) {
    throw new Error("Could not find entity");
  }
  const deletedState = updateSceneReducer(state, {
    systemId,
    sceneId,
    update: {
      entities: without(entities, entity),
    },
  });
  return reactToDeleteReducer(deletedState, {
    previousState: state,
    objectName: "inspected",
    didDelete: (selected) => selected?.object.id === entityId,
  });
};
