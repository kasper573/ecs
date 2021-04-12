import { Entity } from "../../ecs/src/Entity";
import { System } from "../../ecs/src/System";
import { SceneManager } from "./SceneManager";

test("sceneId defaults to the id of the first child", () => {
  const a = new Entity();
  const b = new Entity();
  const root = new Root([a, b]);
  new System(root);
  expect(root.manager.sceneId).toBe(a.id);
});

test("scene defaults to the first child", () => {
  const a = new Entity();
  const b = new Entity();
  const root = new Root([a, b]);
  new System(root);
  expect(root.manager.scene).toBe(a);
});

test("scene can be changed by changing sceneId", () => {
  const a = new Entity();
  const b = new Entity();
  const root = new Root([a, b]);
  new System(root);
  root.manager.sceneId = b.id;
  expect(root.manager.scene).toBe(b);
});

test("Entity.isActive of active scene is true", () => {
  const a = new Entity();
  const b = new Entity();
  const root = new Root([a, b]);
  new System(root);
  root.manager.sceneId = a.id;
  expect(a.isActive).toBe(true);
});

test("Entity.isActive of inactive scene is false", () => {
  const a = new Entity();
  const b = new Entity();
  const root = new Root([a, b]);
  new System(root);
  root.manager.sceneId = b.id;
  expect(a.isActive).toBe(false);
});

test("Entity.isActive of unmanaged entity is true", () => {
  const a = new Entity();
  const b = new Entity();
  const root = new Root([a]);
  new System(root, b);
  expect(b.isActive).toBe(true);
});

class Scene extends Entity {
  constructor(entities: Entity[]) {
    super([], entities);
  }
}

class Root extends Entity {
  constructor(scenes: Scene[], public manager = new SceneManager()) {
    super([manager], scenes);
  }
}
