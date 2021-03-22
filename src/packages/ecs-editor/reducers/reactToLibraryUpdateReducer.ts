import { without } from "lodash";
import { EditorState } from "../types/EditorState";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { getDefinitionsInLibrary } from "../../ecs-serializable/functions/getDefinitionsInLibrary";
import { compareBy } from "../functions/compareBy";
import { inheritComponentInitializer } from "../../ecs-serializable/factories/inheritComponentInitializer";
import { updateEntityInitializerReducer } from "./updateEntityInitializerReducer";
import { deleteEntityInitializerReducer } from "./deleteEntityInitializerReducer";

/**
 * Diffs the state prior to and after updating a specific system
 * library and creates the state with the proper reactions:
 * - Components removed from entity definitions gets removed from corresponding initializers
 * - Components added to entity definitions gets added to corresponding initializers (with inherited props)
 * - Removed entity definitions gets corresponding initializers removed.
 */
export const reactToLibraryUpdateReducer: EditorStateReducer<{
  affectedSystemId: SystemDefinitionId;
  prevState: EditorState;
}> = (updatedState, { affectedSystemId, prevState }) => {
  let nextState = updatedState;

  const affectedSystem = ({ systems }: EditorState) =>
    systems.find(({ id }) => id === affectedSystemId);

  const prevLibrary = getDefinitionsInLibrary(
    affectedSystem(prevState)?.library ?? []
  );

  const nextLibrary = getDefinitionsInLibrary(
    affectedSystem(nextState)?.library ?? []
  );

  const [removedEntities, , sameEntities] = compareBy(
    prevLibrary.entities,
    nextLibrary.entities,
    getId
  );

  // Remove initializers for removed entity definitions
  for (const entityDefinition of removedEntities) {
    for (const scene of affectedSystem(nextState)?.scenes ?? []) {
      const affectedInitializers = scene.entities.filter(
        ({ definitionId }) => definitionId === entityDefinition.id
      );
      for (const entityInitializer of affectedInitializers) {
        nextState = deleteEntityInitializerReducer(nextState, {
          systemId: affectedSystemId,
          sceneId: scene.id,
          entityId: entityInitializer.id,
        });
      }
    }
  }

  // Diff components in entity initializers and definitions
  for (const entityDefinition of sameEntities) {
    for (const scene of affectedSystem(nextState)?.scenes ?? []) {
      const affectedInitializers = scene.entities.filter(
        ({ definitionId }) => definitionId === entityDefinition.id
      );
      for (const entityInitializer of affectedInitializers) {
        const [removedComponents, addedComponents] = compareBy(
          entityInitializer.components,
          entityDefinition.components,
          getId
        );
        const changes = removedComponents.length + addedComponents.length;
        if (changes === 0) {
          continue;
        }
        // Diff discovered, update initializes by removing and/or adding components
        nextState = updateEntityInitializerReducer(nextState, {
          systemId: affectedSystemId,
          sceneId: scene.id,
          entityId: entityInitializer.id,
          update: {
            components: [
              ...without(entityInitializer.components, ...removedComponents),
              ...addedComponents.map(inheritComponentInitializer),
            ],
          },
        });
      }
    }
  }
  return nextState;
};

const getId = <T extends { id: unknown }>(o: T): T["id"] => o.id;
