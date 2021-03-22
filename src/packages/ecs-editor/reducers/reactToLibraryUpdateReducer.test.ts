import { without } from "lodash";
import { getDefinitionsInLibrary } from "../../ecs-serializable/functions/getDefinitionsInLibrary";
import { mockEditorState } from "../mocks/mockEditorState";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { LibraryEntityNode } from "../../ecs-serializable/types/LibraryNode";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { createComponentInitializer } from "../../ecs-serializable/factories/createComponentInitializer";
import { uuid } from "../functions/uuid";
import { createComponentPropertiesDefinition } from "../../ecs-serializable/factories/createComponentPropertiesDefinition";
import { updateLibraryNodeReducer } from "./updateLibraryNodeReducer";

test("removing a component from an entity definition removes that component from its corresponding entity initializers", () => {
  let removedComponent: ComponentInitializer | undefined;
  const affectedInitializers = testUpdateEntityDefinition((targetEntity) => {
    removedComponent = targetEntity.components[0];
    return {
      ...targetEntity,
      components: without(targetEntity.components, removedComponent),
    };
  });

  // Make sure they no longer contain the removed component
  for (const initializer of affectedInitializers) {
    const componentIds = initializer.components.map(
      ({ definitionId }) => definitionId
    );
    expect(componentIds).not.toContain(removedComponent?.definitionId);
  }
});

test("adding a component to an entity definition adds a copy of that component to corresponding entity initializers", () => {
  let addedComponent: ComponentInitializer | undefined;
  const affectedInitializers = testUpdateEntityDefinition(
    (targetEntity, { library }) => {
      const definitionId = getDefinitionsInLibrary(library).components[0].id;
      addedComponent = createComponentInitializer({
        id: uuid(),
        definitionId,
        properties: createComponentPropertiesDefinition({}),
      });
      return {
        ...targetEntity,
        components: [...targetEntity.components, addedComponent],
      };
    }
  );

  // Make sure they now contain the added component
  for (const initializer of affectedInitializers) {
    expect(initializer.components).toContainEqual(addedComponent);
  }
});

const testUpdateEntityDefinition = (
  entityChange: (
    targetEntity: EntityDefinition,
    targetSystem: SystemDefinition
  ) => EntityDefinition
) => {
  // Prepare state
  const initialState = mockEditorState();
  const targetSystem = initialState.systems[0];
  const targetEntity = getDefinitionsInLibrary(targetSystem.library)
    .entities[0];

  // Perform update
  const libraryNode = targetSystem.library.find(
    (node): node is LibraryEntityNode =>
      node.type === "entity" && node.entity.id === targetEntity.id
  )!;
  const updatedState = updateLibraryNodeReducer(initialState, {
    systemId: targetSystem.id,
    nodeId: libraryNode.id,
    replacement: {
      ...libraryNode,
      entity: entityChange(targetEntity, targetSystem),
    },
  });

  // Find all entity initializers that should have been affected
  return updatedState.systems[0].scenes.reduce(
    (initializers, scene) => [
      ...initializers,
      ...scene.entities.filter(
        (candidate) => candidate.definitionId === targetEntity.id
      ),
    ],
    [] as EntityInitializer[]
  );
};
