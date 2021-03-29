import { Entity } from "../ecs/Entity";
import { SystemModule } from "../ecs/SystemModule";
import { System } from "../ecs/System";
import { keys } from "../ecs-common/nominal";
import { Scene } from "./Scene";

export class SceneManager<SceneId extends keyof any> implements SystemModule {
  system?: System;
  scenes = {} as Record<SceneId, Scene>;
  get scene() {
    return this.scenes[this.sceneId];
  }

  constructor(
    sceneEntities: Record<SceneId, Entity[]>,
    public sceneId: SceneId = keys(sceneEntities)[0]
  ) {
    this.setEntities(sceneEntities);
  }

  setEntities(sceneEntities: Record<SceneId, Entity[]>) {
    const sceneIds = Object.keys(sceneEntities) as SceneId[];
    this.scenes = sceneIds.reduce(
      (scenes, sceneId) => ({
        ...scenes,
        [sceneId]: new Scene(...sceneEntities[sceneId]),
      }),
      {} as Record<SceneId, Scene>
    );
    if (!this.scene) {
      this.sceneId = sceneIds[0];
    }
  }
}
