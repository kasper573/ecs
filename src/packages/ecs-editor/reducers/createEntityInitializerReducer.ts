import { EditorStateReducer } from "../types/EditorStateReducer";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { getEntityDefinitionInLibrary } from "../../ecs-serializable/functions/getEntityDefinitionInLibrary";
import { inheritEntityDefinitionComponents } from "../../ecs-serializable/factories/inheritEntityDefinitionComponents";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";
import { requireSystem } from "../selectors/requireSystem";
import { requireScene } from "../selectors/requireScene";
import { updateSceneReducer } from "./updateSceneReducer";

export const createEntityInitializerReducer: EditorStateReducer<{
  systemId: SystemDefinitionId;
  sceneId: SceneDefinitionId;
  entityInitializer: EntityInitializer;
}> = (state, { systemId, sceneId, entityInitializer }) => {
  const system = requireSystem(state, systemId);
  const entityDefinition = getEntityDefinitionInLibrary(
    system.library,
    entityInitializer.definitionId
  );
  if (!entityDefinition) {
    throw new Error(`Referenced entity definition not found`);
  }

  const entities = requireScene(state, systemId, sceneId).entities;
  return updateSceneReducer(state, {
    systemId,
    sceneId,
    update: {
      entities: [
        ...entities,
        inheritEntityDefinitionComponents(entityInitializer, entityDefinition),
      ],
    },
  });
};
