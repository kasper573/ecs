import { mockEditorState } from "../functions/mockEditorState";
import { getECSDefinitionForSystem } from "../../ecs-serializable/functions/getECSDefinitionForSystem";
import { core } from "../core";
import { deleteComponentInitializer } from "./deleteComponentInitializer";

test("removing a component from an entity definition removes that component from its corresponding entity initializers", () => {
  // Prepare state
  const state = mockEditorState();
  const targetSystem = Object.values(state.ecs.systems)[0];
  const targetECS = getECSDefinitionForSystem(state.ecs, targetSystem.id);
  const targetEntity = Object.values(targetECS.entityDefinitions)[0];

  // Perform update
  const removedComponent = targetEntity.components[0];
  const nextState = deleteComponentInitializer(
    state,
    core.actions.deleteComponentInitializer({
      target: "definition",
      componentId: removedComponent.id,
      id: targetEntity.id,
    })
  );

  // Find all entity initializers that should have been affected
  const affectedInitializers = Object.values(
    nextState.ecs.entityInitializers
  ).filter((entity) => entity.definitionId === targetEntity.id);

  // Make sure they no longer contain the removed component
  for (const initializer of affectedInitializers) {
    const componentIds = initializer.components.map(
      ({ definitionId }) => definitionId
    );
    expect(componentIds).not.toContain(removedComponent?.definitionId);
  }
});
