import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../../ecs-serializable/types/EntityInitializer";
import {
  EntityDefinition,
  EntityDefinitionId,
} from "../../ecs-serializable/types/EntityDefinition";
import {
  ComponentDefinition,
  ComponentDefinitionId,
} from "../../ecs-serializable/types/ComponentDefinition";
import {
  ComponentInitializer,
  ComponentInitializerId,
} from "../../ecs-serializable/types/ComponentInitializer";
import { createComponentPropertiesDefinition } from "../../ecs-serializable/factories/createComponentPropertiesDefinition";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { LibraryDefinition } from "../../ecs-serializable/types/LibraryDefinition";
import { createEntityInitializerReducer } from "./createEntityInitializerReducer";

test("creating an entity initializer copies all components from definition (without properties)", () => {
  // The component that the system has in the library
  const componentDefinition: ComponentDefinition = {
    id: "componentDefinition" as ComponentDefinitionId,
    nativeComponent: "foo",
    name: "componentDefinition",
  };

  // The library contains an entity with its own component
  const definitionComponent: ComponentInitializer = {
    id: "definitionComponent" as ComponentInitializerId,
    definitionId: componentDefinition.id,
    properties: createComponentPropertiesDefinition({ definitionProp: "123" }),
  };
  const entityDefinition: EntityDefinition = {
    id: "definitionId" as EntityDefinitionId,
    name: "definition",
    components: [definitionComponent],
  };

  // The user initializes that entity with its own new component
  const initializerComponent: ComponentInitializer = {
    id: "initializerComponent" as ComponentInitializerId,
    definitionId: componentDefinition.id,
    properties: createComponentPropertiesDefinition({ initializerProp: 123 }),
  };
  const entityInitializer: EntityInitializer = {
    id: "initializerId" as EntityInitializerId,
    name: "initializer",
    components: [initializerComponent],
    definitionId: entityDefinition.id,
  };

  // Set up EntityState
  const library: LibraryDefinition = [
    {
      id: "componentNode" as LibraryNodeId,
      type: "component",
      component: componentDefinition,
    },
    {
      id: "entityNode" as LibraryNodeId,
      type: "entity",
      entity: entityDefinition,
    },
  ];
  const scene = {
    id: "sceneId" as SceneDefinitionId,
    name: "scene",
    entities: [],
  };
  const system = {
    id: "system" as SystemDefinitionId,
    library,
    scenes: [scene],
    name: "system",
  };
  const initialState = {
    selection: {
      system: system.id,
      scene: scene.id,
    },
    systems: [system],
  };

  // Perform test
  const updatedState = createEntityInitializerReducer(
    initialState,
    entityInitializer
  );
  const updatedComponents =
    updatedState.systems[0].scenes[0].entities[0].components;

  // Should maintain the component passed in while creating entity
  expect(updatedComponents).toContainEqual(initializerComponent);

  // But should also copy the components in the definition
  expect(updatedComponents).toContainEqual({
    ...definitionComponent,
    properties: createComponentPropertiesDefinition({}),
  });
});
