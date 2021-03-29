import { range } from "lodash";
import { EditorState } from "../types/EditorState";
import {
  SystemDefinition,
  SystemDefinitionId,
} from "../../ecs-serializable/types/SystemDefinition";
import { uuid } from "../../ecs-common/uuid";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { createComponentPropertiesDefinition } from "../../ecs-serializable/functions/createComponentPropertiesDefinition";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { set, values } from "../../ecs-common/nominal";
import { ECSDefinition } from "../../ecs-serializable/types/ECSDefinition";
import { getECSDefinitionForSystem } from "../../ecs-serializable/functions/getECSDefinitionForSystem";
import { LibraryFolder } from "../../ecs-serializable/types/LibraryFolder";
import { inheritComponentInitializer } from "../../ecs-serializable/functions/inheritComponentInitializer";
import { NativeComponents } from "../../ecs-serializable/types/NativeComponents";
import { Component } from "../../ecs/Component";
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

  const system = values(ecs.systems)[0];
  const scene = values(ecs.scenes).find(
    (scene) => scene.systemId === system.id
  );
  const entity = values(ecs.entityInitializers).find(
    (init) => init.sceneId === scene?.id
  );

  return {
    ecs,
    selection: {
      system: system?.id,
      scene: scene?.id,
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
  set(ecs.systems, system.id, system);
  mockLibrary(ecs, system.id, nativeComponentNames, mockSize);
  mock(mockSize).map((nr) => mockScene(ecs, system.id, nr));
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
    set(ecs.libraryFolders, folder.id, folder);
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
    set(ecs.componentDefinitions, def.id, def);
    return def;
  });

  mock(mockSize).forEach((nr) => {
    const def = mockEntityDefinition(nr, systemId, componentDefinitions);
    def.parentNodeId = folders[(nr + mockSize - 1) % folders.length].nodeId;
    set(ecs.entityDefinitions, def.id, def);
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
  properties: createComponentPropertiesDefinition({
    foo: 123,
    bar: "hello",
    baz: true,
  }),
});

const mockScene = (
  ecs: ECSDefinition,
  systemId: SystemDefinitionId,
  nr: number
) => {
  const systemECS = getECSDefinitionForSystem(ecs, systemId);
  const scene: SceneDefinition = {
    systemId,
    id: id(`scene${nr}`),
    name: `Scene ${nr}`,
  };
  set(ecs.scenes, scene.id, scene);
  for (const def of values(systemECS.entityDefinitions)) {
    const init: EntityInitializer = {
      systemId,
      sceneId: scene.id,
      id: id("entity-initializer"),
      definitionId: def.id,
      name: def.name,
      components: def.components.map(inheritComponentInitializer),
    };
    set(ecs.entityInitializers, init.id, init);
  }
};

const mock = (n: number) => range(1, n + 1);

const id = <T extends string>(name: string) => `${name} (${uuid()})` as T;
