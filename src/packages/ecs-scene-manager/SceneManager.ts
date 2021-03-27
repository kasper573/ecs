import { Entity } from "../ecs/Entity";
import { SystemModule } from "../ecs/SystemModule";
import { System } from "../ecs/System";
import { get } from "../ecs-common/nominal";
import { Scene } from "./Scene";

export class SceneManager<SceneId extends keyof any> implements SystemModule {
  system?: System;
  scenes: Record<SceneId, Scene>;
  get scene() {
    return get(this.scenes, this.sceneId);
  }

  constructor(
    public sceneId: SceneId,
    sceneEntities: Record<SceneId, Entity[]>
  ) {
    const sceneIds = Object.keys(sceneEntities) as SceneId[];
    this.scenes = sceneIds.reduce<this["scenes"]>(
      (scenes, sceneId) => ({
        ...scenes,
        [sceneId]: new Scene(...sceneEntities[sceneId]),
      }),
      {} as this["scenes"]
    );
  }
}
