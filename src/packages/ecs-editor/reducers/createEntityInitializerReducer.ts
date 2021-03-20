import { EditorStateReducer } from "../types/EditorStateReducer";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { selectSelectedScene } from "../selectors/selectSelectedScene";
import { selectSelectedSystem } from "../selectors/selectSelectedSystem";
import { getEntityDefinitionInLibrary } from "../../ecs-serializable/functions/getEntityDefinitionInLibrary";
import { inheritEntityDefinitionComponents } from "../../ecs-serializable/factories/inheritEntityDefinitionComponents";
import { updateSceneReducer } from "./updateSceneReducer";

export const createEntityInitializerReducer: EditorStateReducer<EntityInitializer> = (
  state,
  entityInitializer
) => {
  const scene = selectSelectedScene(state);
  const system = selectSelectedSystem(state);
  if (!scene || !system) {
    console.warn(
      "Cannot create entity initializer without a scene and system selected"
    );
    return state;
  }

  const entityDefinition = getEntityDefinitionInLibrary(
    system.library,
    entityInitializer.definitionId
  );
  if (!entityDefinition) {
    console.warn(
      `Cannot create entity initializer: Could not find entity definition by id "${entityInitializer.definitionId}"`
    );
    return state;
  }

  return updateSceneReducer(state, {
    scene,
    update: {
      entities: [
        ...scene.entities,
        inheritEntityDefinitionComponents(entityInitializer, entityDefinition),
      ],
    },
  });
};
