import { Entity } from "./Entity";
import { System } from "./System";

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
