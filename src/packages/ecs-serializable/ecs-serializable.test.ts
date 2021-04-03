import * as zod from "zod";
import { Entity } from "../ecs/Entity";
import { Component } from "../ecs/Component";
import { set } from "../ecs-common/nominal";
import { InstanceOf } from "../property-bag/types/PropertyBagInstance";
import { SceneManager } from "../ecs-scene-manager/SceneManager";
import { createSystem } from "./functions/createSystem";
import {
  EntityInitializer,
  EntityInitializerId,
} from "./types/EntityInitializer";
import {
  ComponentDefinition,
  ComponentDefinitionId,
} from "./types/ComponentDefinition";
import { EntityDefinition, EntityDefinitionId } from "./types/EntityDefinition";
import { ECSDefinition } from "./types/ECSDefinition";
import { SceneDefinition } from "./types/SceneDefinition";
import { SystemDefinition } from "./types/SystemDefinition";
import { DeserializationMemory } from "./DeserializationMemory";
import { updateSystem } from "./functions/updateSystem";
import { ComponentInitializer } from "./types/ComponentInitializer";
import { createComponentPropertyDefinition } from "./functions/createComponentPropertyDefinition";

class Foo extends Component.extend({
  text: { type: zod.string().optional() },
  fn: { type: zod.function(zod.tuple([]), zod.number()).optional() },
}) {
  calculate(x: number) {
    return this.fn ? this.fn() * x : 0;
  }
}

const nativeComponents = {
  foo: Foo,
};

describe("creating a deserialized system", () => {
  it("can instantiate an entity", () => {
    const entity: Omit<EntityDefinition, "systemId"> = {
      name: "Entity A",
      nodeId: uid(),
      id: uid(),
      components: [],
    };
    const system = mockSystem([entity]);
    expect(system.entities.length).toBe(1);
    expect(system.entities[0]).toBeInstanceOf(Entity);
  });

  it("can name an entity instance", () => {
    const definition: Omit<EntityDefinition, "systemId"> = {
      name: "Entity",
      nodeId: uid(),
      id: uid(),
      components: [],
    };
    const entity1: Omit<EntityInitializer, "systemId" | "sceneId"> = {
      id: uid(),
      definitionId: definition.id,
      name: "Initial",
      components: [],
    };
    const system = mockSystem([definition], [], [entity1]);
    expect(system.entities[0].name).toBe("Initial");
  });

  it("can name a scene instance", () => {
    const systemDefinition: SystemDefinition = {
      id: uid(),
      name: "System A",
    };
    const sceneDefinition: SceneDefinition = {
      systemId: systemDefinition.id,
      id: uid(),
      name: "Scene A",
    };
    const system = createSystem(
      {
        entityDefinitions: {},
        libraryFolders: {},
        componentDefinitions: {},
        entityInitializers: {},
        systems: { [systemDefinition.id]: systemDefinition },
        scenes: { [sceneDefinition.id]: sceneDefinition },
      },
      nativeComponents
    );
    const sm = system.modules.resolveType(SceneManager);
    const scene = Object.values(sm.scenes)[0];
    expect(scene.name).toBe("Scene A");
  });

  it("can instantiate a component", () => {
    const component: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const entity: Omit<EntityDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Entity A",
      components: [
        {
          id: uid(),
          definitionId: component.id,
          properties: {},
        },
      ],
    };
    const system = mockSystem([entity], [component]);
    expect(system.entities[0].components[0]).toBeInstanceOf(Foo);
  });

  it("can instantiate a component with properties", () => {
    const component: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const entity: Omit<EntityDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Entity A",
      components: [
        {
          id: uid(),
          definitionId: component.id,
          properties: { fn: createComponentPropertyDefinition(() => 2) },
        },
      ],
    };
    const system = mockSystem([entity], [component]);
    expect((system.entities[0].components[0] as Foo).calculate(5)).toBe(10);
  });

  it("can instantiate two entities with different ids", () => {
    const entity1: Omit<EntityDefinition, "systemId"> = {
      nodeId: uid(),
      name: "Entity A",
      id: uid(),
      components: [],
    };
    const entity2: Omit<EntityDefinition, "systemId"> = {
      nodeId: uid(),
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
    const ecs: ECSDefinition = {
      systems: { [system.id]: system },
      scenes: { [scene.id]: scene },
      entityInitializers: { [entity.id]: entity },
      entityDefinitions: {},
      componentDefinitions: {},
      libraryFolders: {},
    };

    expect(() => createSystem(ecs, nativeComponents)).toThrow();
  });

  it("can instantiate two components with different ids", () => {
    const component1: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const component2: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const entity: Omit<EntityDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Entity A",
      components: [
        {
          id: uid(),
          definitionId: component1.id,
          properties: {},
        },
        {
          id: uid(),
          definitionId: component2.id,
          properties: {},
        },
      ],
    };
    const system = mockSystem([entity], [component1, component2]);
    expect(system.entities[0].components.length).toBe(2);
  });

  it("throws error when referencing component that doesn't exist", () => {
    const entity: Omit<EntityDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Entity A",
      components: [
        {
          id: uid(),
          definitionId: "bogus" as ComponentDefinitionId,
          properties: {},
        },
      ],
    };
    expect(() => mockSystem([entity], [])).toThrow();
  });

  test("two entities of the same definition inherit components and imperative properties", () => {
    const componentDefinition: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const entityDefinition: Omit<EntityDefinition, "systemId"> = {
      nodeId: uid(),
      name: "Entity",
      id: uid(),
      components: [
        {
          id: uid(),
          definitionId: componentDefinition.id,
          properties: { isActive: false },
        },
      ],
    };
    const entity1: Omit<EntityInitializer, "systemId" | "sceneId"> = {
      id: uid(),
      name: "Entity 1",
      definitionId: entityDefinition.id,
      components: [],
    };
    const entity2: Omit<EntityInitializer, "systemId" | "sceneId"> = {
      id: uid(),
      name: "Entity 2",
      definitionId: entityDefinition.id,
      components: [],
    };
    const system = mockSystem(
      [entityDefinition],
      [componentDefinition],
      [entity1, entity2]
    );
    expect(system.entities[0].components[0].isActive).toBe(false);
    expect(system.entities[1].components[0].isActive).toBe(false);
  });

  test("two entities of the same definition inherit components and declarative properties", () => {
    const componentDefinition: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const entityDefinition: Omit<EntityDefinition, "systemId"> = {
      nodeId: uid(),
      name: "Entity",
      id: uid(),
      components: [
        {
          id: uid(),
          definitionId: componentDefinition.id,
          properties: {
            isActive: createComponentPropertyDefinition(() => false),
          },
        },
      ],
    };
    const entity1: Omit<EntityInitializer, "systemId" | "sceneId"> = {
      id: uid(),
      name: "Entity 1",
      definitionId: entityDefinition.id,
      components: [],
    };
    const entity2: Omit<EntityInitializer, "systemId" | "sceneId"> = {
      id: uid(),
      name: "Entity 2",
      definitionId: entityDefinition.id,
      components: [],
    };
    const system = mockSystem(
      [entityDefinition],
      [componentDefinition],
      [entity1, entity2]
    );
    expect(system.entities[0].components[0].isActive).toBe(false);
    expect(system.entities[1].components[0].isActive).toBe(false);
  });
});

describe("updating a deserialized system", () => {
  it("can rename an entity instance", () => {
    const definition: Omit<EntityDefinition, "systemId"> = {
      name: "Entity",
      nodeId: uid(),
      id: uid(),
      components: [],
    };
    const entity1: Omit<EntityInitializer, "systemId" | "sceneId"> = {
      id: uid(),
      definitionId: definition.id,
      name: "Initial",
      components: [],
    };
    const entity2: Omit<EntityInitializer, "systemId" | "sceneId"> = {
      ...entity1,
      name: "Updated",
    };
    const ecs1 = mockECS([definition], [], [entity1]);
    const ecs2 = mockECS([definition], [], [entity2]);
    const system = createSystem(ecs1, nativeComponents);
    expect(system.entities[0].name).toBe("Initial");
    updateSystem(system, ecs2, nativeComponents);
    expect(system.entities[0].name).toBe("Updated");
  });

  it("can rename a scene instance", () => {
    const systemDefinition: SystemDefinition = {
      id: uid(),
      name: "System A",
    };
    const sceneDefinition1: SceneDefinition = {
      systemId: systemDefinition.id,
      id: uid(),
      name: "Initial",
    };
    const sceneDefinition2: SceneDefinition = {
      ...sceneDefinition1,
      name: "Updated",
    };
    const ecs1: ECSDefinition = {
      ...createEmptyECS(),
      systems: { [systemDefinition.id]: systemDefinition },
      scenes: { [sceneDefinition1.id]: sceneDefinition1 },
    };
    const ecs2: ECSDefinition = {
      ...ecs1,
      scenes: { [sceneDefinition2.id]: sceneDefinition2 },
    };
    const system = createSystem(ecs1, nativeComponents);
    const sm = system.modules.resolveType(SceneManager);
    const scene = Object.values(sm.scenes)[0];
    expect(scene.name).toBe("Initial");

    updateSystem(system, ecs2, nativeComponents);
    expect(scene.name).toBe("Updated");
  });

  it("can remove a scene instance", () => {
    const systemDefinition: SystemDefinition = {
      id: uid(),
      name: "System A",
    };
    const sceneDefinition: SceneDefinition = {
      systemId: systemDefinition.id,
      id: uid(),
      name: "Initial",
    };
    const ecs1: ECSDefinition = {
      ...createEmptyECS(),
      systems: { [systemDefinition.id]: systemDefinition },
      scenes: { [sceneDefinition.id]: sceneDefinition },
    };
    const ecs2: ECSDefinition = {
      ...ecs1,
      scenes: {},
    };
    const system = createSystem(ecs1, nativeComponents);
    const sm = system.modules.resolveType(SceneManager);
    expect(Object.values(sm.scenes).length).toBe(1);

    updateSystem(system, ecs2, nativeComponents);
    expect(Object.values(sm.scenes).length).toBe(0);
  });

  it("can add entity constructor", () => {
    const entity: Omit<EntityDefinition, "systemId"> = {
      name: "Entity A",
      nodeId: uid(),
      id: uid(),
      components: [],
    };
    const ecsWithEntity = {
      ...createEmptyECS(),
      entityDefinitions: { [entity.id]: entity },
    };
    const system = createSystem(createEmptyECS(), nativeComponents);
    updateSystem(system, ecsWithEntity, nativeComponents);
    const memory = system.modules.resolveType(DeserializationMemory);
    expect(memory.entityConstructors.size).toBe(1);
  });

  it("can remove entity constructor", () => {
    const entity: Omit<EntityDefinition, "systemId"> = {
      name: "Entity A",
      nodeId: uid(),
      id: uid(),
      components: [],
    };
    const ecsWithEntity = {
      ...createEmptyECS(),
      entityDefinitions: { [entity.id]: entity },
    };
    const system = createSystem(ecsWithEntity, nativeComponents);
    updateSystem(system, createEmptyECS(), nativeComponents);
    const memory = system.modules.resolveType(DeserializationMemory);
    expect(memory.entityConstructors.size).toBe(0);
  });

  it("can add component constructor", () => {
    const component: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const ecsWithComponent = {
      ...createEmptyECS(),
      componentDefinitions: { [component.id]: component },
    };
    const system = createSystem(createEmptyECS(), nativeComponents);
    updateSystem(system, ecsWithComponent, nativeComponents);
    const memory = system.modules.resolveType(DeserializationMemory);
    expect(memory.componentConstructors.size).toBe(1);
  });

  it("can remove component constructor", () => {
    const component: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const ecsWithComponent = {
      ...createEmptyECS(),
      componentDefinitions: { [component.id]: component },
    };
    const system = createSystem(ecsWithComponent, nativeComponents);
    updateSystem(system, createEmptyECS(), nativeComponents);
    const memory = system.modules.resolveType(DeserializationMemory);
    expect(memory.componentConstructors.size).toBe(0);
  });

  it("can add entity instance", () => {
    const entity: Omit<EntityDefinition, "systemId"> = {
      name: "Entity A",
      nodeId: uid(),
      id: uid(),
      components: [],
    };
    const ecsWithEntity = mockECS([entity]);
    const system = createSystem(createEmptyECS(), nativeComponents);
    updateSystem(system, ecsWithEntity, nativeComponents);
    expect(system.entities.length).toBe(1);
  });

  it("can maintain entity instances across updates", () => {
    const entity: Omit<EntityDefinition, "systemId"> = {
      name: "Entity A",
      nodeId: uid(),
      id: uid(),
      components: [],
    };
    const ecsWithEntity = mockECS([entity]);
    const system = createSystem(ecsWithEntity, nativeComponents);
    const instanceBeforeUpdate = system.entities[0];
    updateSystem(system, ecsWithEntity, nativeComponents);
    const instanceAfterUpdate = system.entities[0];
    expect(instanceAfterUpdate).toBe(instanceBeforeUpdate);
  });

  it("can remove entity instance", () => {
    const entity: Omit<EntityDefinition, "systemId"> = {
      name: "Entity A",
      nodeId: uid(),
      id: uid(),
      components: [],
    };
    const ecsWithEntity = mockECS([entity]);
    const system = createSystem(ecsWithEntity, nativeComponents);
    updateSystem(system, createEmptyECS(), nativeComponents);
    expect(system.entities.length).toBe(0);
  });

  it("can add component to entity definition", () => {
    const component: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const entityWithoutComponent: Omit<EntityDefinition, "systemId"> = {
      name: "Entity A",
      nodeId: uid(),
      id: uid(),
      components: [],
    };
    const entityWithComponent: Omit<EntityDefinition, "systemId"> = {
      ...entityWithoutComponent,
      components: [
        {
          id: uid(),
          properties: {},
          definitionId: component.id,
        },
      ],
    };
    const ecs1 = mockECS([entityWithoutComponent], []);
    const ecs2 = mockECS([entityWithComponent], [component]);

    const system = createSystem(ecs1, nativeComponents);
    expect(system.entities[0].components.length).toBe(0);

    updateSystem(system, ecs2, nativeComponents);
    expect(system.entities[0].components.length).toBe(1);
  });

  it("can remove component from entity definition", () => {
    const component: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const entityWithoutComponent: Omit<EntityDefinition, "systemId"> = {
      name: "Entity A",
      nodeId: uid(),
      id: uid(),
      components: [],
    };
    const entityWithComponent: Omit<EntityDefinition, "systemId"> = {
      ...entityWithoutComponent,
      components: [
        {
          id: uid(),
          properties: {},
          definitionId: component.id,
        },
      ],
    };
    const ecs1 = mockECS([entityWithComponent], [component]);
    const ecs2 = mockECS([entityWithoutComponent], []);

    const system = createSystem(ecs1, nativeComponents);
    expect(system.entities[0].components.length).toBe(1);

    updateSystem(system, ecs2, nativeComponents);
    expect(system.entities[0].components.length).toBe(0);
  });

  it("can update component properties in entity definition", () => {
    const componentDefinition: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const componentInitializer: ComponentInitializer = {
      id: uid(),
      properties: {},
      definitionId: componentDefinition.id,
    };
    const entity1: Omit<EntityDefinition, "systemId"> = {
      name: "Entity A",
      nodeId: uid(),
      id: uid(),
      components: [
        {
          ...componentInitializer,
          properties: { isActive: false },
        },
      ],
    };
    const entity2: Omit<EntityDefinition, "systemId"> = {
      ...entity1,
      components: [
        {
          ...componentInitializer,
          properties: { isActive: true },
        },
      ],
    };

    const ecs1 = mockECS([entity1], [componentDefinition]);
    const ecs2 = mockECS([entity2], [componentDefinition]);

    const system = createSystem(ecs1, nativeComponents);
    expect(system.entities[0].components[0].isActive).toBe(false);

    updateSystem(system, ecs2, nativeComponents);
    expect(system.entities[0].components[0].isActive).toBe(true);
  });

  it("can add component to entity initializer", () => {
    const component: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const entityDefinition: Omit<EntityDefinition, "systemId"> = {
      name: "Entity A",
      nodeId: uid(),
      id: uid(),
      components: [],
    };
    const noComponent: Omit<EntityInitializer, "systemId" | "sceneId"> = {
      id: uid(),
      name: entityDefinition.name,
      definitionId: entityDefinition.id,
      components: [],
    };
    const hasComponent: typeof noComponent = {
      ...noComponent,
      components: [
        {
          id: uid(),
          properties: {},
          definitionId: component.id,
        },
      ],
    };
    const ecs1 = mockECS([entityDefinition], [], [noComponent]);
    const ecs2 = mockECS([entityDefinition], [component], [hasComponent]);

    const system = createSystem(ecs1, nativeComponents);
    expect(system.entities[0].components.length).toBe(0);

    updateSystem(system, ecs2, nativeComponents);
    expect(system.entities[0].components.length).toBe(1);
  });

  it("can remove component from entity initializer", () => {
    const component: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const entityDefinition: Omit<EntityDefinition, "systemId"> = {
      name: "Entity A",
      nodeId: uid(),
      id: uid(),
      components: [],
    };
    const noComponent: Omit<EntityInitializer, "systemId" | "sceneId"> = {
      id: uid(),
      name: entityDefinition.name,
      definitionId: entityDefinition.id,
      components: [],
    };
    const hasComponent: typeof noComponent = {
      ...noComponent,
      components: [
        {
          id: uid(),
          properties: {},
          definitionId: component.id,
        },
      ],
    };
    const ecs1 = mockECS([entityDefinition], [component], [hasComponent]);
    const ecs2 = mockECS([entityDefinition], [], [noComponent]);

    const system = createSystem(ecs1, nativeComponents);
    expect(system.entities[0].components.length).toBe(1);

    updateSystem(system, ecs2, nativeComponents);
    expect(system.entities[0].components.length).toBe(0);
  });

  it("can update component properties in entity initializer", () => {
    const component: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const entityDefinition: Omit<EntityDefinition, "systemId"> = {
      name: "Entity A",
      nodeId: uid(),
      id: uid(),
      components: [],
    };
    const entity1: Omit<EntityInitializer, "systemId" | "sceneId"> = {
      id: uid(),
      name: entityDefinition.name,
      definitionId: entityDefinition.id,
      components: [
        {
          id: uid(),
          properties: { isActive: false },
          definitionId: component.id,
        },
      ],
    };
    const entity2: typeof entity1 = {
      ...entity1,
      components: entity1.components.map((comp) => ({
        ...comp,
        properties: { isActive: true },
      })),
    };
    const ecs1 = mockECS([entityDefinition], [component], [entity1]);
    const ecs2 = mockECS([entityDefinition], [component], [entity2]);

    const system = createSystem(ecs1, nativeComponents);
    expect(system.entities[0].components[0].isActive).toBe(false);

    updateSystem(system, ecs2, nativeComponents);
    expect(system.entities[0].components[0].isActive).toBe(true);
  });

  it("can reset component properties in entity initializer", () => {
    const componentDefinition: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const componentInitializer: Omit<ComponentInitializer, "properties"> = {
      id: uid(),
      definitionId: componentDefinition.id,
    };
    const entityDefinition: Omit<EntityDefinition, "systemId"> = {
      name: "Entity A",
      nodeId: uid(),
      id: uid(),
      components: [
        {
          ...componentInitializer,
          properties: { isActive: false },
        },
      ],
    };
    const entity1: Omit<EntityInitializer, "systemId" | "sceneId"> = {
      id: uid(),
      name: entityDefinition.name,
      definitionId: entityDefinition.id,
      components: [
        {
          ...componentInitializer,
          properties: { isActive: true },
        },
      ],
    };
    const entity2: typeof entity1 = {
      ...entity1,
      components: [
        {
          ...componentInitializer,
          properties: {},
        },
      ],
    };
    const ecs1 = mockECS([entityDefinition], [componentDefinition], [entity1]);
    const ecs2 = mockECS([entityDefinition], [componentDefinition], [entity2]);

    const system = createSystem(ecs1, nativeComponents);
    expect(system.entities[0].components[0].isActive).toBe(true);

    updateSystem(system, ecs2, nativeComponents);
    expect(system.entities[0].components[0].isActive).toBe(false);
  });

  it("can reset component properties that has defaults in entity initializer", () => {
    const nativeComponentsWithDefault = {
      foo: Component.extend({
        isActive: { type: zod.boolean(), defaultValue: true },
      }),
    };
    const componentDefinition: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const componentInitializer: Omit<ComponentInitializer, "properties"> = {
      id: uid(),
      definitionId: componentDefinition.id,
    };
    const entityDefinition: Omit<EntityDefinition, "systemId"> = {
      name: "Entity A",
      nodeId: uid(),
      id: uid(),
      components: [
        {
          ...componentInitializer,
          properties: {},
        },
      ],
    };
    const entity1: Omit<EntityInitializer, "systemId" | "sceneId"> = {
      id: uid(),
      name: entityDefinition.name,
      definitionId: entityDefinition.id,
      components: [
        {
          ...componentInitializer,
          properties: { isActive: false },
        },
      ],
    };
    const entity2: typeof entity1 = {
      ...entity1,
      components: [
        {
          ...componentInitializer,
          properties: {},
        },
      ],
    };
    const ecs1 = mockECS([entityDefinition], [componentDefinition], [entity1]);
    const ecs2 = mockECS([entityDefinition], [componentDefinition], [entity2]);

    const system = createSystem(ecs1, nativeComponentsWithDefault);
    expect(system.entities[0].components[0].isActive).toBe(false);

    updateSystem(system, ecs2, nativeComponentsWithDefault);
    expect(system.entities[0].components[0].isActive).toBe(true);
  });

  it("updating a component property only changes that specific property", () => {
    const Foo = Component.extend({
      text: { type: zod.string(), defaultValue: "" },
    });
    const nativeComponents = { foo: Foo };
    const component: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const entityDefinition: Omit<EntityDefinition, "systemId"> = {
      name: "Entity A",
      nodeId: uid(),
      id: uid(),
      components: [],
    };
    const entity1: Omit<EntityInitializer, "systemId" | "sceneId"> = {
      id: uid(),
      name: entityDefinition.name,
      definitionId: entityDefinition.id,
      components: [
        {
          id: uid(),
          properties: { isActive: true },
          definitionId: component.id,
        },
      ],
    };
    const entity2: typeof entity1 = {
      ...entity1,
      components: entity1.components.map((comp) => ({
        ...comp,
        properties: { isActive: false },
      })),
    };
    const ecs1 = mockECS([entityDefinition], [component], [entity1]);
    const ecs2 = mockECS([entityDefinition], [component], [entity2]);

    const system = createSystem(ecs1, nativeComponents);
    const instance = system.entities[0].components[0] as InstanceOf<typeof Foo>;
    instance.configure({ text: "hello" });
    updateSystem(system, ecs2, nativeComponents);
    expect(instance.text).toBe("hello");
  });

  test("adding a second entity of an existing definition inherit components and imperative properties", () => {
    const cDef: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const eDef: Omit<EntityDefinition, "systemId"> = {
      nodeId: uid(),
      name: "Entity",
      id: uid(),
      components: [
        {
          id: uid(),
          definitionId: cDef.id,
          properties: { isActive: false },
        },
      ],
    };
    const entity1: Omit<EntityInitializer, "systemId" | "sceneId"> = {
      id: uid(),
      name: "Entity 1",
      definitionId: eDef.id,
      components: [],
    };
    const entity2: Omit<EntityInitializer, "systemId" | "sceneId"> = {
      id: uid(),
      name: "Entity 2",
      definitionId: eDef.id,
      components: [],
    };
    const ecs1 = mockECS([eDef], [cDef], [entity1]);
    const ecs2 = mockECS([eDef], [cDef], [entity1, entity2]);
    const system = createSystem(ecs1, nativeComponents);
    expect(system.entities[0].components[0].isActive).toBe(false);
    updateSystem(system, ecs2, nativeComponents);
    expect(system.entities[0].components[0].isActive).toBe(false);
    expect(system.entities[1].components[0].isActive).toBe(false);
  });

  test("adding a second entity of an existing definition inherit components and declarative properties", () => {
    const cDef: Omit<ComponentDefinition, "systemId"> = {
      nodeId: uid(),
      id: uid(),
      name: "Foo",
      nativeComponent: "foo",
    };
    const eDef: Omit<EntityDefinition, "systemId"> = {
      nodeId: uid(),
      name: "Entity",
      id: uid(),
      components: [
        {
          id: uid(),
          definitionId: cDef.id,
          properties: {
            isActive: createComponentPropertyDefinition(() => false),
          },
        },
      ],
    };
    const entity1: Omit<EntityInitializer, "systemId" | "sceneId"> = {
      id: uid(),
      name: "Entity 1",
      definitionId: eDef.id,
      components: [],
    };
    const entity2: Omit<EntityInitializer, "systemId" | "sceneId"> = {
      id: uid(),
      name: "Entity 2",
      definitionId: eDef.id,
      components: [],
    };
    const ecs1 = mockECS([eDef], [cDef], [entity1]);
    const ecs2 = mockECS([eDef], [cDef], [entity1, entity2]);
    const system = createSystem(ecs1, nativeComponents);
    expect(system.entities[0].components[0].isActive).toBe(false);
    updateSystem(system, ecs2, nativeComponents);
    expect(system.entities[0].components[0].isActive).toBe(false);
    expect(system.entities[1].components[0].isActive).toBe(false);
  });
});

const createEmptyECS = (): ECSDefinition => ({
  componentDefinitions: {},
  entityInitializers: {},
  entityDefinitions: {},
  systems: {},
  libraryFolders: {},
  scenes: {},
});

let idCounter = 0;
const uid = <T extends string>() => ("id" + idCounter++) as T;

const mockECS = (
  entityDefinitions: Array<Omit<EntityDefinition, "systemId">>,
  componentDefinitions: Array<Omit<ComponentDefinition, "systemId">> = [],
  entityInitializers?: Array<Omit<EntityInitializer, "systemId" | "sceneId">>
) => {
  const ecs = createEmptyECS();

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

  if (!entityInitializers) {
    entityInitializers = entityDefinitions.map(({ id, components }, index) => ({
      name: `entity${index}`,
      id: `initializer${index}` as EntityInitializerId,
      definitionId: id,
      components: [],
    }));
  }

  entityInitializers.forEach((entity) => {
    set(ecs.entityInitializers, entity.id, {
      ...entity,
      sceneId: scene.id,
      systemId: system.id,
    });
  });

  componentDefinitions.forEach((component) => {
    set(ecs.componentDefinitions, component.id, {
      ...component,
      systemId: system.id,
    });
  });

  entityDefinitions.forEach((entity) => {
    set(ecs.entityDefinitions, entity.id, {
      ...entity,
      systemId: system.id,
    });
  });
  return ecs;
};

const mockSystem = (
  entities: Array<Omit<EntityDefinition, "systemId">>,
  components: Array<Omit<ComponentDefinition, "systemId">> = [],
  entityInitializers?: Array<Omit<EntityInitializer, "systemId" | "sceneId">>
) =>
  createSystem(
    mockECS(entities, components, entityInitializers),
    nativeComponents
  );
