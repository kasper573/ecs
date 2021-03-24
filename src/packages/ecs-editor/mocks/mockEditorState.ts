import { range } from "lodash";
import { EditorState } from "../types/EditorState";
import {
  SystemDefinition,
  SystemDefinitionId,
} from "../../ecs-serializable/types/SystemDefinition";
import { uuid } from "../functions/uuid";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
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
import { set, values } from "../../nominal";
import { SerializableECS } from "../../ecs-serializable/types/SerializableECS";

/**
 * Mocks a fixed number of instances of all object types belonging to EditorState
 */
export const mockEditorState = (): EditorState => {
  const ecs: SerializableECS = {
    entities: {},
    library: {},
    scenes: {},
    systems: {},
  };

  fixedAmount().forEach((nr) => mockSystem(ecs, nr));

  const system = values(ecs.systems)[0];
  const scene = values(ecs.scenes).filter(
    (scene) => scene.systemId === system.id
  )[0];
  const entity = values(ecs.entities).filter(
    (init) => init.sceneId === scene.id
  )[0];

  return {
    ecs,
    selection: {
      system: system.id,
      scene: scene.id,
      inspected: {
        type: "entityInitializer",
        id: entity.id,
      },
    },
  };
};

const mockSystem = (ecs: SerializableECS, nr: number) => {
  const system: SystemDefinition = {
    id: id(`system${nr}`),
    name: `System ${nr}`,
  };
  set(ecs.systems, system.id, system);
  mockLibrary(ecs, system.id);
  fixedAmount().map((nr) => mockScene(ecs, system.id, nr));
};

const mockLibrary = (ecs: SerializableECS, systemId: SystemDefinitionId) => {
  const componentDefinitions = fixedAmount().map(mockComponentDefinition);
  const entityDefinitions = fixedAmount().map((nr) =>
    mockEntityDefinition(nr, componentDefinitions)
  );

  const nodes = [
    ...entityDefinitions.map(
      (entity): LibraryEntityNode => ({
        systemId,
        id: id("library-entity-node"),
        type: "entity",
        entity,
      })
    ),
    ...componentDefinitions.map(
      (component): LibraryComponentNode => ({
        systemId,
        id: id("library-component-node"),
        type: "component",
        component,
      })
    ),
    ...fixedAmount().map(
      (nr): LibraryFolderNode => ({
        systemId,
        id: id(`library-folder-node`),
        type: "folder",
        name: `Folder ${nr}`,
      })
    ),
  ];

  for (const node of nodes) {
    set(ecs.library, node.id, node);
  }
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
  ecs: SerializableECS,
  systemId: SystemDefinitionId,
  nr: number
) => {
  const scene: SceneDefinition = {
    systemId,
    id: id(`scene${nr}`),
    name: `Scene ${nr}`,
  };
  set(ecs.scenes, scene.id, scene);
  const lib = getDefinitionsInLibrary(
    values(ecs.library).filter((node) => node.systemId === systemId)
  );
  for (const def of values(lib.entities)) {
    const init: EntityInitializer = {
      systemId,
      sceneId: scene.id,
      id: id("entity-initializer"),
      definitionId: def.id,
      name: def.name,
      components: values(lib.components).map(mockComponentInitializer),
    };
    set(ecs.entities, init.id, init);
  }
};

const fixedAmount = () => range(0, 3);

const id = <T extends string>(name: string) => `${name} (${uuid()})` as T;
