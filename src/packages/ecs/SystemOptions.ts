import { Entity } from "./Entity";
import { System } from "./System";

export type SystemOptions<State> = {
  sceneId?: SceneId;
  scenes?: Record<SceneId, Entity[]>;
  state?: State;
  entities?: (system: System<State>) => Entity[];
};

export type SceneId = string | number;
