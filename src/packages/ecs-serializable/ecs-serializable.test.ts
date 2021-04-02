import * as zod from "zod";
import { Entity } from "../ecs/Entity";
import { Component } from "../ecs/Component";
import { set } from "../ecs-common/nominal";
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
import { createComponentPropertiesDefinition } from "./functions/createComponentPropertiesDefinition";
import { inheritComponentInitializer } from "./functions/inheritComponentInitializer";
import { ECSDefinition } from "./types/ECSDefinition";
import { SceneDefinition } from "./types/SceneDefinition";
import { SystemDefinition } from "./types/SystemDefinition";
import { DeserializationMemory } from "./DeserializationMemory";
import { updateSystem } from "./functions/updateSystem";
import { ComponentInitializer } from "./types/ComponentInitializer";

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

describe("instantiating a System using ECSDefinition", () => {
  it("succeeds when using one entity", () => {
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

  it("succeeds when using one component", () => {
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
          properties: createComponentPropertiesDefinition({}),
        },
      ],
    };
    const system = mockSystem([entity], [component]);
    expect(system.entities[0].components[0]).toBeInstanceOf(Foo);
  });

  it("succeeds when using a component with options", () => {
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
          properties: createComponentPropertiesDefinition({ fn: () => 2 }),
        },
      ],
    };
    const system = mockSystem([entity], [component]);
    expect((system.entities[0].components[0] as Foo).calculate(5)).toBe(10);
  });

  it("succeeds when using two entities with different ids", () => {
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

  it("succeeds when using two components with different ids", () => {
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
    const entity: Omit<EntityDefinition, "systemId"> = {
      nodeId: uid(),
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

describe("updating a System instance using ECSDefinition", () => {
  it("can add entity constructor", () => {
    const entity: Omit<EntityDefinition, "systemId"> = {
      name: "Entity A",
      nodeId: uid(),
      id: uid(),
      components: [],
    };
    const ecsWithEntity = {
      ...emptyECS,
      entityDefinitions: { [entity.id]: entity },
    };
    const system = createSystem(emptyECS, nativeComponents);
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
      ...emptyECS,
      entityDefinitions: { [entity.id]: entity },
    };
    const system = createSystem(ecsWithEntity, nativeComponents);
    updateSystem(system, emptyECS, nativeComponents);
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
      ...emptyECS,
      componentDefinitions: { [component.id]: component },
    };
    const system = createSystem(emptyECS, nativeComponents);
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
      ...emptyECS,
      componentDefinitions: { [component.id]: component },
    };
    const system = createSystem(ecsWithComponent, nativeComponents);
    updateSystem(system, emptyECS, nativeComponents);
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
    const system = createSystem(emptyECS, nativeComponents);
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
    updateSystem(system, emptyECS, nativeComponents);
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
          properties: createComponentPropertiesDefinition({}),
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
          properties: createComponentPropertiesDefinition({}),
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
      properties: createComponentPropertiesDefinition({}),
      definitionId: componentDefinition.id,
    };
    const entity1: Omit<EntityDefinition, "systemId"> = {
      name: "Entity A",
      nodeId: uid(),
      id: uid(),
      components: [
        {
          ...componentInitializer,
          properties: createComponentPropertiesDefinition({ isActive: false }),
        },
      ],
    };
    const entity2: Omit<EntityDefinition, "systemId"> = {
      ...entity1,
      components: [
        {
          ...componentInitializer,
          properties: createComponentPropertiesDefinition({ isActive: true }),
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
          properties: createComponentPropertiesDefinition({}),
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
          properties: createComponentPropertiesDefinition({}),
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
          properties: createComponentPropertiesDefinition({ isActive: false }),
          definitionId: component.id,
        },
      ],
    };
    const entity2: typeof entity1 = {
      ...entity1,
      components: [
        {
          id: uid(),
          properties: createComponentPropertiesDefinition({ isActive: true }),
          definitionId: component.id,
        },
      ],
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
          properties: createComponentPropertiesDefinition({ isActive: false }),
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
          properties: createComponentPropertiesDefinition({ isActive: true }),
        },
      ],
    };
    const entity2: typeof entity1 = {
      ...entity1,
      components: [
        {
          ...componentInitializer,
          properties: createComponentPropertiesDefinition({}),
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
          properties: createComponentPropertiesDefinition({}),
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
          properties: createComponentPropertiesDefinition({ isActive: false }),
        },
      ],
    };
    const entity2: typeof entity1 = {
      ...entity1,
      components: [
        {
          ...componentInitializer,
          properties: createComponentPropertiesDefinition({}),
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

  it("entity has the same number of components before and after update when not changing components", () => {
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
          properties: createComponentPropertiesDefinition({ isActive: false }),
          definitionId: component.id,
        },
        {
          id: uid(),
          properties: createComponentPropertiesDefinition({ isActive: true }),
          definitionId: component.id,
        },
      ],
    };
    const entity2: typeof entity1 = {
      ...entity1,
      components: entity1.components.map((comp) => ({
        ...comp,
        properties: createComponentPropertiesDefinition({}),
      })),
    };
    const ecs1 = mockECS([entityDefinition], [component], [entity1]);
    const ecs2 = mockECS([entityDefinition], [component], [entity2]);

    const system = createSystem(ecs1, nativeComponents);
    const componentCount1 = system.entities[0].components.length;
    updateSystem(system, ecs2, nativeComponents);
    const componentCount2 = system.entities[0].components.length;
    expect(componentCount1).toBe(componentCount2);
  });
});

const emptyECS: ECSDefinition = {
  componentDefinitions: {},
  entityInitializers: {},
  entityDefinitions: {},
  systems: {},
  libraryFolders: {},
  scenes: {},
};

let idCounter = 0;
const uid = <T extends string>() => ("id" + idCounter++) as T;

const mockECS = (
  entityDefinitions: Array<Omit<EntityDefinition, "systemId">>,
  componentDefinitions: Array<Omit<ComponentDefinition, "systemId">> = [],
  entityInitializers?: Array<Omit<EntityInitializer, "systemId" | "sceneId">>
) => {
  const ecs: ECSDefinition = {
    systems: {},
    scenes: {},
    entityInitializers: {},
    entityDefinitions: {},
    componentDefinitions: {},
    libraryFolders: {},
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

  if (!entityInitializers) {
    entityInitializers = entityDefinitions.map(({ id, components }, index) => ({
      name: `entity${index}`,
      id: `initializer${index}` as EntityInitializerId,
      definitionId: id,
      components: components.map(inheritComponentInitializer),
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
  components: Array<Omit<ComponentDefinition, "systemId">> = []
) => createSystem(mockECS(entities, components), nativeComponents);
