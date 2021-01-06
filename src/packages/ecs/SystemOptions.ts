import { Entity } from "./Entity";
import { System } from "./System";

export type SystemOptions<SystemState> = {
  sceneId?: SceneId;
  scenes?: Record<SceneId, Entity<SystemState>[]>;
  state?: SystemState;
  entities?: (system: System<SystemState>) => Entity<SystemState>[];
};

export type SceneId = string | number;
