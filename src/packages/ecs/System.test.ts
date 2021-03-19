import { Entity } from "./Entity";
import { System } from "./System";
import { Component } from "./Component";

describe("system entries can be configured", () => {
  test("by an array of entities", () => {
    const entities = [new Entity()];
    const system = new System(entities);
    expect(system.entities).toBe(entities);
  });
  describe("by a config object", () => {
    test("where config.entities is undefined", () => {
      const system = new System({});
      expect(system.entities).toEqual([]);
    });
    test("where config.entities is an array of entities", () => {
      const entities = [new Entity()];
      const system = new System({ entities });
      expect(system.entities).toBe(entities);
    });
    test("where config.entities is a function that returns entities", () => {
      const entities = [new Entity()];
      const system = new System({ entities: () => entities });
      expect(system.entities).toBe(entities);
    });
  });
});

test("system entities resolution can be derivative", () => {
  const entities = {
    a: [new Entity()],
    b: [new Entity()],
  };
  let state: keyof typeof entities = "a";
  const system = new System({
    entities: () => entities[state],
  });
  expect(system.entities).toBe(entities.a);
  state = "b";
  expect(system.entities).toBe(entities.b);
});

test("components get updated once on system initialization", () => {
  let componentUpdates = 0;
  const createComponent = () =>
    new Component({
      update: () => {
        componentUpdates++;
      },
    });
  new System([
    new Entity([createComponent(), createComponent()]),
    new Entity([createComponent(), createComponent()]),
  ]);
  expect(componentUpdates).toBe(4);
});
