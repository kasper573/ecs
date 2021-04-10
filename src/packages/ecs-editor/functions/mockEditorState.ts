import { range } from "lodash";
import { EditorState } from "../types/EditorState";
import {
  SystemDefinition,
  SystemDefinitionId,
} from "../../ecs-serializable/types/SystemDefinition";
import { uuid } from "../../ecs-common/uuid";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { ECSDefinition } from "../../ecs-serializable/types/ECSDefinition";
import { LibraryFolder } from "../../ecs-serializable/types/LibraryFolder";
import { NativeComponents } from "../../ecs-serializable/types/NativeComponents";
import { Component } from "../../ecs/Component";
import { getECSDefinitionForSystem } from "../../ecs-serializable/functions/getECSDefinitionForSystem";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { inheritComponentInitializer } from "../../ecs-serializable/functions/inheritComponentInitializer";
import { createEditorState } from "./createEditorState";

/**
 * Mocks a fixed number of instances of all object types belonging to EditorState
 */
export const mockEditorState = (
  nativeComponents: NativeComponents = mockNativeComponents(3),
  mockSize = 3
): EditorState => {
  const ecs = createEditorState().ecs;

  mock(mockSize).forEach((nr) =>
    mockSystem(ecs, nr, Object.keys(nativeComponents), mockSize)
  );

  const system = Object.values(ecs.systems)[0];
  const entity = Object.values(ecs.entityInitializers).find(
    (init) => init.systemId === system?.id
  );

  return {
    ...createEditorState(),
    ecs,
    selection: {
      system: system?.id,
      inspected: entity && {
        type: "entityInitializer",
        id: entity.id,
      },
    },
  };
};

const mockNativeComponents = (mockSize: number): NativeComponents =>
  mock(mockSize).reduce(
    (nativeComponents, nr) => ({
      ...nativeComponents,
      [`nativeComponent${nr}`]: Component,
    }),
    {} as NativeComponents
  );

const mockSystem = (
  ecs: ECSDefinition,
  nr: number,
  nativeComponentNames: string[],
  mockSize: number
) => {
  const system: SystemDefinition = {
    id: id(`system${nr}`),
    name: `System ${nr}`,
  };
  ecs.systems[system.id] = system;
  mockLibrary(ecs, system.id, nativeComponentNames, mockSize);
  mockEntityInitializers(ecs, system.id, mockSize);
};

const mockLibrary = (
  ecs: ECSDefinition,
  systemId: SystemDefinitionId,
  nativeComponentNames: string[],
  mockSize: number
) => {
  const folders = mock(mockSize).map((nr) => {
    const folder: LibraryFolder = {
      systemId,
      nodeId: id(`library-folder-node-id`),
      id: id(`library-folder-id`),
      name: `Folder ${nr}`,
    };
    ecs.libraryFolders[folder.id] = folder;
    return folder;
  });

  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i];
    const next = folders[i + 1];
    if (next) {
      next.parentNodeId = folder.nodeId;
    }
  }

  const componentDefinitions = mock(mockSize).map((nr) => {
    const def = mockComponentDefinition(
      nr,
      systemId,
      nativeComponentNames[nr % nativeComponentNames.length]
    );
    def.parentNodeId = folders[(nr + mockSize - 1) % folders.length].nodeId;
    ecs.componentDefinitions[def.id] = def;
    return def;
  });

  mock(mockSize).forEach((nr) => {
    const def = mockEntityDefinition(nr, systemId, componentDefinitions);
    def.parentNodeId = folders[(nr + mockSize - 1) % folders.length].nodeId;
    ecs.entityDefinitions[def.id] = def;
  });
};

const mockEntityInitializers = (
  ecs: ECSDefinition,
  systemId: SystemDefinitionId,
  mockSize: number
) => {
  const systemECS = getECSDefinitionForSystem(ecs, systemId);
  mock(mockSize).forEach((n) => {
    for (const def of Object.values(systemECS.entityDefinitions)) {
      const init: EntityInitializer = {
        systemId,
        id: id("entity-initializer"),
        order: 0,
        definitionId: def.id,
        name: `${def.name}${n}`,
        components: def.components.map(inheritComponentInitializer),
      };
      ecs.entityInitializers[init.id] = init;
    }
  });
};

const mockEntityDefinition = (
  nr: number,
  systemId: SystemDefinitionId,
  definitions: ComponentDefinition[]
): EntityDefinition => ({
  systemId,
  nodeId: id(`entity-definition-node-id${nr}`),
  id: id(`entity-definition${nr}`),
  name: `Entity${nr}`,
  components: definitions.map(mockComponentInitializer),
});

const mockComponentDefinition = (
  nr: number,
  systemId: SystemDefinitionId,
  nativeComponentName: string
): ComponentDefinition => ({
  systemId,
  nodeId: id(`component-definition-node-id${nr}`),
  id: id(`component-definition${nr}`),
  name: `Component ${nr}`,
  nativeComponent: nativeComponentName,
});

const mockComponentInitializer = (
  definition: ComponentDefinition,
  index: number
): ComponentInitializer => ({
  id: id(`component-initializer${index}`),
  definitionId: definition.id,
  properties: {
    foo: 123,
    bar: "hello",
    baz: true,
  },
});

const mock = (n: number) => range(1, n + 1);

const id = <T extends string>(name: string) => `${name} (${uuid()})` as T;
