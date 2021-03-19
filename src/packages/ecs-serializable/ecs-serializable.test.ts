import * as fs from "fs";
import * as path from "path";
import * as zod from "zod";
import { Entity } from "../ecs/Entity";
import { Component } from "../ecs/Component";
import { createSystem } from "./factories/createSystem";
import { EntityInitializerId } from "./types/EntityInitializer";
import {
  ComponentDefinition,
  ComponentDefinitionId,
} from "./types/ComponentDefinition";
import { EntityDefinition, EntityDefinitionId } from "./types/EntityDefinition";
import { SystemDefinition, SystemDefinitionId } from "./types/SystemDefinition";
import { createSystemDefinition } from "./factories/createSystemDefinition";
import { createSceneDefinition } from "./factories/createSceneDefinition";
import { createEntityInitializer } from "./factories/createEntityInitializer";
import { createEntityDefinition } from "./factories/createEntityDefinition";
import { createComponentDefinition } from "./factories/createComponentDefinition";
import { createComponentPropertiesDefinition } from "./factories/createComponentPropertiesDefinition";
import { LibraryNode, LibraryNodeId } from "./types/LibraryNode";
import { SceneDefinitionId } from "./types/SceneDefinition";

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
    const entity = createEntityDefinition({
      name: "Entity A",
      id: "1" as EntityDefinitionId,
    });
    const system = mockSystem([entity]);
    expect(system.entities.length).toBe(1);
    expect(system.entities[0]).toBeInstanceOf(Entity);
  });

  it("succeeds when using one component", () => {
    const component = createComponentDefinition({
      id: "1" as ComponentDefinitionId,
      name: "Foo",
      nativeComponent: "foo",
    });
    const entity = createEntityDefinition({
      id: "1" as EntityDefinitionId,
      name: "Entity A",
      components: [
        {
          id: uid(),
          definitionId: component.id,
          properties: createComponentPropertiesDefinition({}),
        },
      ],
    });
    const system = mockSystem([entity], [component]);
    expect(system.entities[0].components[0]).toBeInstanceOf(Foo);
  });

  it("succeeds when using a component with options", () => {
    const component = createComponentDefinition({
      id: "1" as ComponentDefinitionId,
      name: "Foo",
      nativeComponent: "foo",
    });
    const entity = createEntityDefinition({
      id: "1" as EntityDefinitionId,
      name: "Entity A",
      components: [
        {
          id: uid(),
          definitionId: component.id,
          properties: createComponentPropertiesDefinition({ fn: () => 2 }),
        },
      ],
    });
    const system = mockSystem([entity], [component]);
    expect((system.entities[0].components[0] as Foo).calculate(5)).toBe(10);
  });

  it("succeeds when using serialized data", () => {
    const systemDefinition: SystemDefinition = JSON.parse(serializedSystem);
    const system = createSystem(systemDefinition, nativeComponents);
    expect((system.entities[0].components[0] as Foo).calculate(5)).toBe(10);
  });

  it("succeeds when using two entities with different ids", () => {
    const entity1 = createEntityDefinition({
      name: "Entity A",
      id: "1" as EntityDefinitionId,
    });
    const entity2 = createEntityDefinition({
      name: "Entity A",
      id: "2" as EntityDefinitionId,
    });
    const system = mockSystem([entity1, entity2]);
    expect(system.entities.length).toBe(2);
  });

  it("throws error when using two entities with the same id", () => {
    const entity1 = createEntityDefinition({
      name: "Entity A",
      id: "1" as EntityDefinitionId,
    });
    const entity2 = createEntityDefinition({
      name: "Entity A",
      id: "1" as EntityDefinitionId,
    });
    expect(() => mockSystem([entity1, entity2])).toThrow();
  });

  it("throws error when referencing entity definition that doesn't exist", () => {
    const definition = createSystemDefinition({
      id: "systemA" as SystemDefinitionId,
      name: "System A",
      library: [],
      scenes: [
        createSceneDefinition({
          id: "scene1" as SceneDefinitionId,
          name: "Scene A",
          entities: [
            createEntityInitializer({
              id: "1" as EntityInitializerId,
              definitionId: "bogus" as EntityDefinitionId,
            }),
          ],
        }),
      ],
    });

    expect(() => createSystem(definition, nativeComponents)).toThrow();
  });

  it("succeeds when using two components with different ids", () => {
    const component1 = createComponentDefinition({
      id: "1" as ComponentDefinitionId,
      name: "Foo",
      nativeComponent: "foo",
    });
    const component2 = createComponentDefinition({
      id: "2" as ComponentDefinitionId,
      name: "Foo",
      nativeComponent: "foo",
    });
    const entity = createEntityDefinition({
      id: "1" as EntityDefinitionId,
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
    });
    const system = mockSystem([entity], [component1, component2]);
    expect(system.entities[0].components.length).toBe(2);
  });

  it("throws error when using two components with the same id", () => {
    const component1 = createComponentDefinition({
      id: "1" as ComponentDefinitionId,
      name: "Foo",
      nativeComponent: "foo",
    });
    const component2 = createComponentDefinition({
      id: "1" as ComponentDefinitionId,
      name: "Foo",
      nativeComponent: "foo",
    });
    const entity = createEntityDefinition({
      id: "1" as EntityDefinitionId,
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
    });
    expect(() => mockSystem([entity], [component1, component2])).toThrow();
  });

  it("throws error when referencing component that doesn't exist", () => {
    const entity = createEntityDefinition({
      id: "1" as EntityDefinitionId,
      name: "Entity A",
      components: [
        {
          id: uid(),
          definitionId: "bogus" as ComponentDefinitionId,
          properties: createComponentPropertiesDefinition({}),
        },
      ],
    });
    expect(() => mockSystem([entity], [])).toThrow();
  });
});

let idCounter = 0;
const uid = <T extends string>() => ("id" + idCounter++) as T;

export const mockSystem = (
  entities: EntityDefinition[],
  components: ComponentDefinition[] = []
) =>
  createSystem(
    createSystemDefinition({
      id: "systemA" as SystemDefinitionId,
      name: "System A",
      library: [
        ...components.map(
          (component): LibraryNode => ({
            id: (component.id as string) as LibraryNodeId,
            type: "component",
            component,
          })
        ),
        ...entities.map(
          (entity): LibraryNode => ({
            id: (entity.id as string) as LibraryNodeId,
            type: "entity",
            entity,
          })
        ),
      ],
      scenes: [
        createSceneDefinition({
          id: "scene1" as SceneDefinitionId,
          name: "Scene A",
          entities: entities.map(({ id }, index) =>
            createEntityInitializer({
              id: `initializer${index}` as EntityInitializerId,
              definitionId: id,
            })
          ),
        }),
      ],
    }),
    nativeComponents
  );
