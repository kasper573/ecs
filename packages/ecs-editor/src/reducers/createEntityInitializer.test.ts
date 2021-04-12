import { mockEditorState } from "../functions/mockEditorState";
import { EntityInitializerId } from "../../../ecs-serializable/src/definition/EntityInitializer";
import { uuid } from "../../../ecs-common/src/uuid";
import { ComponentInitializer } from "../../../ecs-serializable/src/definition/ComponentInitializer";
import { getECSDefinitionForSystem } from "../../../ecs-serializable/src/functions/getECSDefinitionForSystem";
import { createEntityInitializer } from "./createEntityInitializer";

test("creating an entity initializer copies all components from definition (without properties)", () => {
  const initialState = mockEditorState();
  const system = Object.values(initialState.ecs.systems)[0];
  const selectedECS = getECSDefinitionForSystem(initialState.ecs, system.id);
  const entityDefinition = Object.values(selectedECS.entityDefinitions)[0];
  const componentDefinition = Object.values(
    selectedECS.componentDefinitions
  )[0];
  const definitionComponent = entityDefinition.components[0];

  const initializerComponent: ComponentInitializer = {
    definitionId: componentDefinition.id,
    properties: { foo: 123 },
    id: uuid(),
  };

  const entityInitializer = {
    systemId: system.id,
    id: uuid() as EntityInitializerId,
    definitionId: entityDefinition.id,
    name: entityDefinition.name,
    components: [initializerComponent],
  };

  // Perform test
  const updatedState = createEntityInitializer(initialState, {
    type: "",
    payload: entityInitializer,
  });

  const updatedEntityInitializer =
    updatedState.ecs.entityInitializers[entityInitializer.id];

  // Should maintain the component passed in while creating entity
  expect(updatedEntityInitializer?.components).toContainEqual(
    initializerComponent
  );

  // But should also copy the components in the definition
  expect(updatedEntityInitializer?.components).toContainEqual({
    ...definitionComponent,
    properties: {},
  });
});
