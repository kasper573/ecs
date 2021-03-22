import { range } from "lodash";
import { EditorState } from "../types/EditorState";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { uuid } from "../functions/uuid";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { LibraryDefinition } from "../../ecs-serializable/types/LibraryDefinition";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import {
  LibraryComponentNode,
  LibraryEntityNode,
  LibraryFolderNode,
} from "../../ecs-serializable/types/LibraryNode";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { createComponentPropertiesDefinition } from "../../ecs-serializable/factories/createComponentPropertiesDefinition";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { getDefinitionsInLibrary } from "../../ecs-serializable/functions/getDefinitionsInLibrary";

/**
 * Mocks a fixed number of instances of all object types belonging to EditorState
 */
export const mockEditorState = (): EditorState => {
  const systems = fixedAmount().map(mockSystem);
  return {
    systems,
    selection: {
      system: systems[0].id,
      scene: systems[0].scenes[0].id,
      inspected: {
        type: "entityInitializer",
        id: systems[0].scenes[0].entities[0].id,
      },
    },
  };
};

const mockSystem = (nr: number): SystemDefinition => {
  const library = mockLibrary();
  const { entities, components } = getDefinitionsInLibrary(library);
  return {
    id: id(`system${nr}`),
    scenes: fixedAmount().map((nr) => mockScene(nr, entities, components)),
    library,
    name: `System ${nr}`,
  };
};

const mockLibrary = (): LibraryDefinition => {
  const componentDefinitions = fixedAmount().map(mockComponentDefinition);
  const entityDefinitions = fixedAmount().map((nr) =>
    mockEntityDefinition(nr, componentDefinitions)
  );

  return [
    ...entityDefinitions.map(
      (entity): LibraryEntityNode => ({
        id: id("library-entity-node"),
        type: "entity",
        entity,
      })
    ),
    ...componentDefinitions.map(
      (component): LibraryComponentNode => ({
        id: id("library-component-node"),
        type: "component",
        component,
      })
    ),
    ...fixedAmount().map(
      (nr): LibraryFolderNode => ({
        id: id(`library-folder-node`),
        type: "folder",
        name: `Folder ${nr}`,
      })
    ),
  ];
};

const mockEntityDefinition = (
  nr: number,
  definitions: ComponentDefinition[]
): EntityDefinition => ({
  id: id(`entity-definition${nr}`),
  name: `Entity${nr}`,
  components: definitions.map(mockComponentInitializer),
});

const mockComponentDefinition = (nr: number): ComponentDefinition => ({
  id: id(`component-definition${nr}`),
  name: `Component ${nr}`,
  nativeComponent: `NativeComponent${nr}`,
});

const mockComponentInitializer = (
  definition: ComponentDefinition,
  index: number
): ComponentInitializer => ({
  id: id(`component-initializer${index}`),
  definitionId: definition.id,
  properties: createComponentPropertiesDefinition({
    foo: 123,
    bar: "hello",
    baz: true,
  }),
});

const mockScene = (
  nr: number,
  entityDefinitions: EntityDefinition[],
  componentDefinitions: ComponentDefinition[]
): SceneDefinition => ({
  id: id(`scene${nr}`),
  name: `Scene ${nr}`,
  entities: entityDefinitions.map((entityDefinition) =>
    mockEntityInitializer(entityDefinition, componentDefinitions)
  ),
});

const mockEntityInitializer = (
  definition: EntityDefinition,
  componentDefinitions: ComponentDefinition[]
): EntityInitializer => ({
  id: id("entity-initializer"),
  definitionId: definition.id,
  name: definition.name,
  components: componentDefinitions.map(mockComponentInitializer),
});

const fixedAmount = () => range(0, 3);

const id = <T extends string>(name: string) => `${name} (${uuid()})` as T;
