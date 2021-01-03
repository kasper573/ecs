import { createActions } from "./createActions";
import { Container } from "./Container";
import { Entity } from "./Entity";
import { Scene } from "./Scene";

export class World<State = any> {
  public scenes: Record<SceneId, Scene>;
  public state: State;

  private _sceneId: SceneId;
  public get sceneId() {
    return this._sceneId;
  }

  public set sceneId(value: SceneId) {
    if (value in this.scenes) {
      this._sceneId = value;
    } else {
      throw new Error(`Scene does not exist: ${value}`);
    }
  }

  private readonly getEntities = (world: World<State>) =>
    world.scene ? Array.from(world.scene) : [];

  public get scene() {
    return this.scenes[this._sceneId];
  }
  public get entities() {
    return this.getEntities(this);
  }
  public get actions() {
    return createActions(this.entities, this);
  }

  constructor(options: WorldOptions<State>) {
    this.state = options.state;
    this.scenes = Object.keys(options.scenes).reduce(
      (scenes, sceneId) => ({
        ...scenes,
        [sceneId]: new Container<Entity>(...options.scenes[sceneId]),
      }),
      {}
    );
    this.sceneId = this._sceneId = options.sceneId;
    if (options.entities) {
      this.getEntities = options.entities;
    }
  }
}

export type WorldOptions<State> = {
  sceneId: SceneId;
  scenes: Record<SceneId, Entity[]>;
  state: State;
  entities?: (world: World<State>) => Entity[];
};

type SceneId = string | number;
