import { EditorStateReducer } from "../types/EditorStateReducer";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { getEntityDefinitionInLibrary } from "../../ecs-serializable/functions/getEntityDefinitionInLibrary";
import { inheritEntityDefinitionComponents } from "../../ecs-serializable/factories/inheritEntityDefinitionComponents";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { selectSelectedSystem } from "../selectors/selectSelectedSystem";
import { selectSelectedScene } from "../selectors/selectSelectedScene";
import { updateSceneReducer } from "./updateSceneReducer";

export const createEntityInitializerReducer: EditorStateReducer<{
  system?: SystemDefinition;
  scene?: SceneDefinition;
  entityInitializer: EntityInitializer;
}> = (
  state,
  {
    system = selectSelectedSystem(state),
    scene = selectSelectedScene(state, system),
    entityInitializer,
  }
) => {
  if (!system || !scene) {
    throw new Error(`System and scene must be specified`);
  }
  const entityDefinition = getEntityDefinitionInLibrary(
    system.library,
    entityInitializer.definitionId
  );
  if (!entityDefinition) {
    throw new Error(`Referenced entity definition not found`);
  }

  return updateSceneReducer(state, {
    system,
    scene,
    update: {
      entities: [
        ...scene.entities,
        inheritEntityDefinitionComponents(entityInitializer, entityDefinition),
      ],
    },
  });
};
