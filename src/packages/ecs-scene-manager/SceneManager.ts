import { Entity } from "../ecs/Entity";
import { Scene } from "./Scene";

export class SceneManager<SceneId extends keyof any, SystemState> {
  scenes: Record<SceneId, Scene<SystemState>>;
  get scene() {
    return this.scenes[this.sceneId];
  }

  constructor(
    public sceneId: SceneId,
    sceneEntities: Record<SceneId, Entity<SystemState>[]>
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
