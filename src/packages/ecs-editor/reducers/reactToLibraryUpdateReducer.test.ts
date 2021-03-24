import { without } from "lodash";
import { getDefinitionsInLibrary } from "../../ecs-serializable/functions/getDefinitionsInLibrary";
import { mockEditorState } from "../mocks/mockEditorState";
import {
  LibraryEntityNode,
  LibraryNode,
} from "../../ecs-serializable/types/LibraryNode";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { createComponentInitializer } from "../../ecs-serializable/factories/createComponentInitializer";
import { uuid } from "../functions/uuid";
import { createComponentPropertiesDefinition } from "../../ecs-serializable/factories/createComponentPropertiesDefinition";
import { values } from "../../nominal";
import { core } from "../slices/core";
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
    (targetEntity, library) => {
      const definitionId = values(
        getDefinitionsInLibrary(library).components
      )[0].id;
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
    targetLibrary: LibraryNode[]
  ) => EntityDefinition
) => {
  // Prepare state
  const state = mockEditorState();
  const targetSystem = values(state.ecs.systems)[0];
  const targetSystemLibrary = values(state.ecs.library).filter(
    (node) => node.systemId === targetSystem.id
  );
  const targetEntity = values(
    getDefinitionsInLibrary(targetSystemLibrary).entities
  )[0];

  // Perform update
  const libraryNode = targetSystemLibrary.find(
    (node): node is LibraryEntityNode =>
      node.type === "entity" && node.entity.id === targetEntity.id
  )!;
  updateLibraryNodeReducer(
    state,
    core.actions.UPDATE_LIBRARY_NODE({
      nodeId: libraryNode.id,
      replacement: {
        ...libraryNode,
        entity: entityChange(targetEntity, targetSystemLibrary),
      },
    })
  );

  // Find all entity initializers that should have been affected
  return values(state.ecs.entities).filter(
    (entity) => entity.definitionId === targetEntity.id
  );
};
