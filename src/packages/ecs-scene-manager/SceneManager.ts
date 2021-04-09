import * as zod from "zod";
import { Entity } from "../ecs/Entity";
import { Component, componentProperties } from "../ecs/Component";

export class SceneManager extends Component.extend({
  isActive: { ...componentProperties.isActive, hidden: true },
  initialSceneName: { type: zod.string().optional() },
}) {
  private activeSceneId?: string;
  private activeScene?: Entity;

  get sceneId() {
    return this.activeSceneId;
  }
  set sceneId(value: string | undefined) {
    this.activeSceneId = value;
    this.setActiveScene(
      this.activeSceneId
        ? this.entity?.childrenById[this.activeSceneId]
        : undefined
    );
  }
  get scene() {
    return this.activeScene;
  }
  get scenes() {
    return this.entity?.children;
  }
  get initialScene() {
    if (!this.scenes) {
      return undefined;
    }
    return this.initialSceneName
      ? this.scenes.find((s) => s.name.toLowerCase() === this.initialSceneName)
      : this.scenes[0];
  }

  private setActiveScene(activeScene = this.activeScene) {
    this.activeScene = activeScene;
    this.activeSceneId = activeScene ? activeScene.id : undefined;
    this.updateChildActiveStates();
  }

  private updateChildActiveStates() {
    if (this.scenes) {
      for (const child of this.scenes) {
        child.isActive = child === this.activeScene;
      }
    }
  }

  constructor() {
    super({
      isActive: true,
      mount: () =>
        this.scenes?.mount((scene) => {
          scene.isActive = scene === this.activeScene;
          return () => (scene.isActive = true);
        }),
      update: () => {
        if (!this.activeScene && this.initialScene) {
          this.setActiveScene(this.initialScene);
        }
      },
    });
  }

  static create<EntityId extends string>(
    scenes: Record<EntityId, Entity<EntityId>[]>
  ) {
    const manager = new SceneManager();
    const root = new Entity([manager], [], { name: "SceneManager" });
    for (const entityId in scenes) {
      const scene = new Entity([], scenes[entityId], {
        id: entityId as EntityId,
      });
      root.children.push(scene);
    }
    return root;
  }
}
