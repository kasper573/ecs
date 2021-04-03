import { Entity } from "../ecs/Entity";
import { SceneManager } from "./SceneManager";
import { Scene } from "./Scene";

test("sceneId defaults to the first scene when not specified", () => {
  type Scenes = "a" | "b";
  const scenes = {
    a: [new Entity()],
    b: [new Entity()],
  };
  const sceneManager = new SceneManager<Scenes>(scenes);
  expect(sceneManager.sceneId).toBe("a");
});

test("scene represents the initial sceneId by default", () => {
  type Scenes = "a" | "b";
  const scenes = {
    a: [new Entity()],
    b: [new Entity()],
  };
  const sceneManager = new SceneManager<Scenes>(scenes, "b");
  expect(sceneManager.scene).toEqual(expect.arrayContaining(scenes.b));
});

test("scene can be changed by changing sceneId", () => {
  const scenes = {
    a: [new Entity()],
    b: [new Entity()],
  };
  const sceneManager = new SceneManager(scenes);
  sceneManager.sceneId = "b";
  expect(sceneManager.scene).toEqual(expect.arrayContaining(scenes.b));
});

test("updating scenes maintains existing scene instances", () => {
  const scenes = { a: [new Entity()] };
  const sceneManager = new SceneManager(scenes);
  const before = sceneManager.scenes.a;
  sceneManager.setEntities(scenes);
  const after = sceneManager.scenes.a;
  expect(before).toBe(after);
});

test("scenes get individual instances", () => {
  const sceneManager = new SceneManager({ a: [], b: [] });
  expect(sceneManager.scenes.a).toBeInstanceOf(Scene);
  expect(sceneManager.scenes.b).toBeInstanceOf(Scene);
  expect(sceneManager.scenes.a).not.toBe(sceneManager.scenes.b);
});

test("can add entities to scene", () => {
  const e1 = new Entity();
  const e2 = new Entity();
  const sceneManager = new SceneManager({ a: [e1] });
  sceneManager.setEntities({ a: [e1, e2] });
  expect(sceneManager.scenes.a).toEqual(expect.arrayContaining([e1, e2]));
});

test("can remove entities from scene", () => {
  const sceneManager = new SceneManager({ a: [new Entity()] });
  sceneManager.setEntities({ a: [] });
  expect(sceneManager.scenes.a).toEqual(expect.arrayContaining([]));
});
