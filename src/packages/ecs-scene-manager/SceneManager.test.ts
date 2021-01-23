import { Entity } from "../ecs/Entity";
import { SceneManager } from "./SceneManager";

test("scene represents the initial sceneId by default", () => {
  type Scenes = "a" | "b";
  const scenes = {
    a: [new Entity()],
    b: [new Entity()],
  };
  const sceneManager = new SceneManager<Scenes>("a", scenes);
  expect(sceneManager.scene).toEqual(expect.arrayContaining(scenes.a));
});

test("scene can be changed by changing sceneId", () => {
  type Scenes = "a" | "b";
  const scenes = {
    a: [new Entity()],
    b: [new Entity()],
  };
  const sceneManager = new SceneManager<Scenes>("a", scenes);
  sceneManager.sceneId = "b";
  expect(sceneManager.scene).toEqual(expect.arrayContaining(scenes.b));
});
