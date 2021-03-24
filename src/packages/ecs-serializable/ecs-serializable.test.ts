import * as fs from "fs";
import * as path from "path";
import * as zod from "zod";
import { Entity } from "../ecs/Entity";
import { Component } from "../ecs/Component";
import { set } from "../nominal";
import { createSystem } from "./factories/createSystem";
import {
  EntityInitializer,
  EntityInitializerId,
} from "./types/EntityInitializer";
import {
  ComponentDefinition,
  ComponentDefinitionId,
} from "./types/ComponentDefinition";
import { EntityDefinition, EntityDefinitionId } from "./types/EntityDefinition";
import { createComponentPropertiesDefinition } from "./factories/createComponentPropertiesDefinition";
import { LibraryNode, LibraryNodeId } from "./types/LibraryNode";
import { inheritComponentInitializer } from "./factories/inheritComponentInitializer";
import { SerializableECS } from "./types/SerializableECS";
import { SceneDefinition } from "./types/SceneDefinition";
import { SystemDefinition } from "./types/SystemDefinition";

class Foo extends Component.extend({
  fn: {
    type: zod.function(zod.tuple([]), zod.number()).optional(),
    defaultValue: undefined,
  },
}) {
  calculate(x: number) {
    return this.fn ? this.fn() * x : 0;
  }
}

const nativeComponents = {
  foo: Foo,
};

const serializedSystem = fs.readFileSync(
  path.resolve(__dirname, "./fixtures/serializedSystem.json"),
  "utf-8"
);

describe("instantiating a System using SystemDefinition", () => {
  it("succeeds when using one entity", () => {
    const entity: EntityDefinition = {
      name: "Entity A",
      id: uid(),
      components: [],
    };
    const system = mockSystem([entity]);
    expect(system.entities.length).toBe(1);
    expect(system.entities[0]).toBeInstanceOf(Entity);
  });

  it("succeeds when using one component", () => {
    const component: ComponentDefinition = {
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const entity: EntityDefinition = {
      id: uid(),
      name: "Entity A",
      components: [
        {
          id: uid(),
          definitionId: component.id,
          properties: createComponentPropertiesDefinition({}),
        },
      ],
    };
    const system = mockSystem([entity], [component]);
    expect(system.entities[0].components[0]).toBeInstanceOf(Foo);
  });

  it("succeeds when using a component with options", () => {
    const component: ComponentDefinition = {
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const entity: EntityDefinition = {
      id: uid(),
      name: "Entity A",
      components: [
        {
          id: uid(),
          definitionId: component.id,
          properties: createComponentPropertiesDefinition({ fn: () => 2 }),
        },
      ],
    };
    const system = mockSystem([entity], [component]);
    expect((system.entities[0].components[0] as Foo).calculate(5)).toBe(10);
  });

  it("succeeds when using serialized data", () => {
    const ecs: SerializableECS = JSON.parse(serializedSystem);
    const system = createSystem(ecs, nativeComponents);
    expect((system.entities[0].components[0] as Foo).calculate(5)).toBe(10);
  });

  it("succeeds when using two entities with different ids", () => {
    const entity1: EntityDefinition = {
      name: "Entity A",
      id: uid(),
      components: [],
    };
    const entity2: EntityDefinition = {
      name: "Entity A",
      id: uid(),
      components: [],
    };
    const system = mockSystem([entity1, entity2]);
    expect(system.entities.length).toBe(2);
  });

  it("throws error when referencing entity definition that doesn't exist", () => {
    const system: SystemDefinition = {
      id: uid(),
      name: "System A",
    };
    const scene: SceneDefinition = {
      id: uid(),
      name: "Scene A",
      systemId: system.id,
    };
    const entity: EntityInitializer = {
      id: uid(),
      sceneId: scene.id,
      systemId: system.id,
      definitionId: "bogus" as EntityDefinitionId,
      name: "entity",
      components: [],
    };
    const ecs: SerializableECS = {
      systems: [system],
      scenes: [scene],
      entities: [entity],
      library: [],
    };

    expect(() => createSystem(ecs, nativeComponents)).toThrow();
  });

  it("succeeds when using two components with different ids", () => {
    const component1: ComponentDefinition = {
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const component2: ComponentDefinition = {
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const entity: EntityDefinition = {
      id: uid(),
      name: "Entity A",
      components: [
        {
          id: uid(),
          definitionId: component1.id,
          properties: createComponentPropertiesDefinition({}),
        },
        {
          id: uid(),
          definitionId: component2.id,
          properties: createComponentPropertiesDefinition({}),
        },
      ],
    };
    const system = mockSystem([entity], [component1, component2]);
    expect(system.entities[0].components.length).toBe(2);
  });

  it("throws error when referencing component that doesn't exist", () => {
    const entity: EntityDefinition = {
      id: uid(),
      name: "Entity A",
      components: [
        {
          id: uid(),
          definitionId: "bogus" as ComponentDefinitionId,
          properties: createComponentPropertiesDefinition({}),
        },
      ],
    };
    expect(() => mockSystem([entity], [])).toThrow();
  });
});

let idCounter = 0;
const uid = <T extends string>() => ("id" + idCounter++) as T;

const mockSystem = (
  entities: EntityDefinition[],
  components: ComponentDefinition[] = []
) => {
  const ecs: SerializableECS = {
    systems: {},
    scenes: {},
    entities: {},
    library: {},
  };

  const system: SystemDefinition = {
    id: uid(),
    name: "System A",
  };
  set(ecs.systems, system.id, system);

  const scene: SceneDefinition = {
    systemId: system.id,
    id: uid(),
    name: "Scene A",
  };
  set(ecs.scenes, scene.id, scene);

  entities.forEach(({ id, components }, index) => {
    const entity: EntityInitializer = {
      name: `entity${index}`,
      systemId: system.id,
      sceneId: scene.id,
      id: `initializer${index}` as EntityInitializerId,
      definitionId: id,
      components: components.map(inheritComponentInitializer),
    };
    set(ecs.entities, entity.id, entity);
  });

  const libraryNodes = [
    ...components.map(
      (component): LibraryNode => ({
        systemId: system.id,
        id: (component.id as string) as LibraryNodeId,
        type: "component",
        component,
      })
    ),
    ...entities.map(
      (entity): LibraryNode => ({
        systemId: system.id,
        id: (entity.id as string) as LibraryNodeId,
        type: "entity",
        entity,
      })
    ),
  ];

  for (const node of libraryNodes) {
    set(ecs.library, node.id, node);
  }

  return createSystem(ecs, nativeComponents);
};
