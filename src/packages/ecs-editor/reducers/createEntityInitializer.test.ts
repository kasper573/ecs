import { mockEditorState } from "../mocks/mockEditorState";
import { createComponentPropertiesDefinition } from "../../ecs-serializable/factories/createComponentPropertiesDefinition";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { get, values } from "../../nominal";
import { uuid } from "../functions/uuid";
import {
  LibraryComponentNode,
  LibraryEntityNode,
} from "../../ecs-serializable/types/LibraryNode";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { createEntityInitializer } from "./createEntityInitializer";

test("creating an entity initializer copies all components from definition (without properties)", () => {
  const initialState = mockEditorState();
  const libraryEntityNode = values(initialState.ecs.library).find(
    (node): node is LibraryEntityNode => node.type === "entity"
  )!;
  const libraryComponentNode = values(initialState.ecs.library).find(
    (node): node is LibraryComponentNode => node.type === "component"
  )!;
  const scene = values(initialState.ecs.scenes).find(
    (scene) => scene.systemId === libraryEntityNode.systemId
  )!;

  const definitionComponent = libraryEntityNode.entity.components[0];

  const initializerComponent: ComponentInitializer = {
    definitionId: libraryComponentNode.component.id,
    properties: createComponentPropertiesDefinition({ foo: 123 }),
    id: uuid(),
  };

  const entityInitializer: EntityInitializer = {
    systemId: libraryEntityNode.systemId,
    sceneId: scene.id,
    id: uuid(),
    definitionId: libraryEntityNode.entity.id,
    name: libraryEntityNode.entity.name,
    components: [initializerComponent],
  };

  // Perform test
  const updatedState = createEntityInitializer(initialState, {
    type: "",
    payload: entityInitializer,
  });

  const updatedEntityInitializer = get(
    updatedState.ecs.entities,
    entityInitializer.id
  );

  // Should maintain the component passed in while creating entity
  expect(updatedEntityInitializer.components).toContainEqual(
    initializerComponent
  );

  // But should also copy the components in the definition
  expect(updatedEntityInitializer.components).toContainEqual({
    ...definitionComponent,
    properties: createComponentPropertiesDefinition({}),
  });
});
