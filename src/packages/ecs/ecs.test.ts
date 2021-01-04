import { System } from "./System";
import { Entity } from "./Entity";
import { Component } from "./Component";
import { Container } from "./Container";

// System.ts
test("system entities resolve to the the current scene entities by default", () => {
  const scenes = {
    a: [new Entity("a", {}, () => [])],
    b: [new Entity("b", {}, () => [])],
  };
  const system = new System({
    sceneId: "a",
    scenes,
  });
  expect(system.entities).toEqual(scenes.a);
  system.sceneId = "b";
  expect(system.entities).toEqual(scenes.b);
});

test("system entities resolution can be customized to derive from system state", () => {
  const entities = {
    a: [new Entity("a", {}, () => [])],
    b: [new Entity("b", {}, () => [])],
  };
  const system = new System<keyof typeof entities>({
    entities: (system) => entities[system.state],
    state: "a",
  });
  expect(system.entities).toBe(entities.a);
  system.state = "b";
  expect(system.entities).toBe(entities.b);
});

describe("Entity.ts", () => {
  test("can derive entity components based on initial entity state", () => {
    const entity = new Entity("entity", { count: 3 }, ({ count }) =>
      repeat(count, new Component())
    );
    const components = entity.getComponents(new System());
    expect(components).toHaveLength(3);
  });

  test("can derive entity components based on changed entity state", () => {
    const entity = new Entity("entity", { count: 3 }, ({ count }) =>
      repeat(count, new Component())
    );
    entity.state.count = 2;
    const components = entity.getComponents(new System());
    expect(components).toHaveLength(2);
  });

  test("can derive entity components based on initial system state", () => {
    const entity = new Entity<{}, number>("entity", {}, (state, system) =>
      repeat(system.state, new Component())
    );
    const components = entity.getComponents(new System({ state: 3 }));
    expect(components).toHaveLength(3);
  });

  test("can derive entity components based on changed system state", () => {
    const entity = new Entity<{}, number>("entity", {}, (state, system) =>
      repeat(system.state, new Component())
    );
    const system = new System({ state: 3 });
    system.state = 2;
    const components = entity.getComponents(system);
    expect(components).toHaveLength(2);
  });
});

// Container.ts
describe("Container", () => {
  test("can remove item by reference", () => {
    const a = {};
    const list = new Container(a);
    list.remove(a);
    expect(list).not.toContain(a);
  });

  test("can find item by type", () => {
    class Type {}
    const list = new Container(new Type());
    expect(list.findType(Type)).toBeInstanceOf(Type);
  });

  test("can filter items by type", () => {
    class TypeA {}
    class TypeB {}
    const list = new Container(new TypeA(), new TypeB());
    const filtered = list.filterType(TypeA);
    for (const item of filtered) {
      expect(item).toBeInstanceOf(TypeA);
    }
  });

  test("resolving a missing item type throws error", () => {
    class TypeA {}
    const list = new Container();
    expect(() => list.resolveType(TypeA)).toThrow();
  });

  test("a required (and existing) item type returns item", () => {
    class TypeA {}
    const list = new Container(new TypeA());
    expect(list.resolveType(TypeA)).toBeInstanceOf(TypeA);
  });
});

const repeat = <T>(count: number, value: T) => {
  const values: T[] = [];
  for (let i = 0; i < count; i++) {
    values.push(value);
  }
  return values;
};
