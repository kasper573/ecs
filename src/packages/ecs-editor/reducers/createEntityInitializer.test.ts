import { mockEditorState } from "../functions/mockEditorState";
import { createComponentPropertiesDefinition } from "../../ecs-serializable/functions/createComponentPropertiesDefinition";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { get, values } from "../../ecs-common/nominal";
import { uuid } from "../../ecs-common/uuid";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { getECSDefinitionForSystem } from "../../ecs-serializable/functions/getECSDefinitionForSystem";
import { createEntityInitializer } from "./createEntityInitializer";

test("creating an entity initializer copies all components from definition (without properties)", () => {
  const initialState = mockEditorState();
  const system = values(initialState.ecs.systems)[0];
  const selectedECS = getECSDefinitionForSystem(initialState.ecs, system.id);
  const entityDefinition = values(selectedECS.entityDefinitions)[0];
  const componentDefinition = values(selectedECS.componentDefinitions)[0];
  const scene = values(selectedECS.scenes)[0];
  const definitionComponent = entityDefinition.components[0];

  const initializerComponent: ComponentInitializer = {
    definitionId: componentDefinition.id,
    properties: createComponentPropertiesDefinition({ foo: 123 }),
    id: uuid(),
  };

  const entityInitializer: EntityInitializer = {
    systemId: system.id,
    sceneId: scene.id,
    id: uuid(),
    definitionId: entityDefinition.id,
    name: entityDefinition.name,
    components: [initializerComponent],
  };

  // Perform test
  const updatedState = createEntityInitializer(initialState, {
    type: "",
    payload: entityInitializer,
  });

  const updatedEntityInitializer = get(
    updatedState.ecs.entityInitializers,
    entityInitializer.id
  );

  // Should maintain the component passed in while creating entity
  expect(updatedEntityInitializer?.components).toContainEqual(
    initializerComponent
  );

  // But should also copy the components in the definition
  expect(updatedEntityInitializer?.components).toContainEqual({
    ...definitionComponent,
    properties: createComponentPropertiesDefinition({}),
  });
});
