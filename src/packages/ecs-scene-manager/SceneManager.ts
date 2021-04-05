import { Entity, EntityId } from "../ecs/Entity";
import { Component, componentProperties } from "../ecs/Component";

export class SceneManager extends Component.extend({
  isActive: { ...componentProperties.isActive, hidden: true },
}) {
  private activeSceneId?: EntityId;
  private activeScene?: Entity;

  get sceneId() {
    return this.activeSceneId;
  }
  set sceneId(value: EntityId | undefined) {
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
          if (!this.activeScene) {
            this.setActiveScene(scene);
          }
          scene.isActive = scene === this.activeScene;
          return () => (scene.isActive = true);
        }),
    });
  }

  static create(scenes: Record<string, Entity[]>) {
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
