import { without } from "lodash";
import { Entity } from "../ecs/Entity";
import { SystemModule } from "../ecs/SystemModule";
import { System } from "../ecs/System";
import { typedKeys } from "../ecs-common/typedKeys";
import { Scene } from "./Scene";

export class SceneManager<SceneId extends keyof any> implements SystemModule {
  system?: System;
  scenes = {} as Record<SceneId, Scene>;
  get scene() {
    return this.scenes[this.sceneId];
  }

  constructor(
    sceneEntities: Record<SceneId, Entity[]>,
    public sceneId: SceneId = typedKeys(sceneEntities)[0]
  ) {
    this.setEntities(sceneEntities);
  }

  setEntities(sceneEntities: Record<SceneId, Entity[]>) {
    const currentIds = Object.keys(sceneEntities) as SceneId[];
    for (const sceneId of currentIds) {
      const scene = this.scenes[sceneId];
      const entities = sceneEntities[sceneId];
      if (scene) {
        const removed = without(scene, ...entities);
        const added = without(entities, ...scene);
        if (removed.length) {
          scene.remove(...removed);
        }
        if (added.length) {
          scene.push(...added);
        }
      } else {
        this.scenes[sceneId] = new Scene(...entities);
      }
    }
    if (!this.scene) {
      this.sceneId = currentIds[0];
    }
  }
}
