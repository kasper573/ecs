import { mockEditorState } from "../functions/mockEditorState";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { uuid } from "../../ecs-common/uuid";
import { values } from "../../ecs-common/nominal";
import { core } from "../core";
import { getECSDefinitionForSystem } from "../../ecs-serializable/functions/getECSDefinitionForSystem";
import { addComponentInitializer } from "./addComponentInitializer";

test("adding a component to an entity definition adds a copy of that component to corresponding entity initializers", () => {
  // Prepare state
  const state = mockEditorState();
  const targetSystem = values(state.ecs.systems)[0];
  const targetECS = getECSDefinitionForSystem(state.ecs, targetSystem.id);
  const targetEntity = values(targetECS.entityDefinitions)[0];

  // Perform update
  const definitionId = values(targetECS.componentDefinitions)[0].id;
  const addedComponent: ComponentInitializer = {
    id: uuid(),
    definitionId,
    properties: {},
  };
  const nextState = addComponentInitializer(
    state,
    core.actions.addComponentInitializer({
      target: "definition",
      component: addedComponent,
      id: targetEntity.id,
    })
  );

  // Find all entity initializers that should have been affected
  const affectedInitializers = values(nextState.ecs.entityInitializers).filter(
    (entity) => entity.definitionId === targetEntity.id
  );

  // Make sure they now contain the added component
  for (const initializer of affectedInitializers) {
    expect(initializer.components).toContainEqual(addedComponent);
  }
});
