import { Entity } from "./Entity";
import { System } from "./System";
import { Component } from "./Component";

test("system entities resolve to the the current scene entities by default", () => {
  const scenes = {
    a: [new Entity()],
    b: [new Entity()],
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
  type SystemState = "a" | "b";
  const entities = {
    a: [new Entity<SystemState>()],
    b: [new Entity<SystemState>()],
  };
  const system = new System<SystemState>({
    entities: (system) => entities[system.state],
    state: "a",
  });
  expect(system.entities).toBe(entities.a);
  system.state = "b";
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
