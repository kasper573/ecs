import { Effect } from "./Effect";
import { createActions } from "./createActions";
import { interpretCommand } from "./interpretCommand";
import { createUnknownCommandEffect } from "./createUnknownCommandEffect";
import { Inventory } from "./Inventory";
import { Action } from "./Action";
import { Container } from "./Container";
import { Entity } from "./Entity";
import { Scene } from "./Scene";

export class World<SceneEntities extends Record<keyof any, Entity[]> = any> {
  public effect?: Effect;
  public inventory: Inventory = new Container();
  public scenes: Record<keyof SceneEntities, Scene>;

  public get scene() {
    return this.scenes[this.sceneId];
  }
  public get entities() {
    return [...(this.scene ? this.scene : []), ...this.inventory];
  }
  public get actions(): Action[] {
    return createActions(this.entities, this);
  }

  constructor(
    public sceneId: keyof SceneEntities,
    sceneEntities: SceneEntities
  ) {
    this.scenes = createScenes(sceneEntities);
  }

  public perform(command: string) {
    const action = interpretCommand(command, this.actions);
    this.effect = action
      ? action.perform(this)
      : createUnknownCommandEffect(command);
  }
}

const createScenes = <Entities extends Record<keyof any, Entity[]>>(
  entities: Entities
) =>
  Object.keys(entities).reduce(
    (scenes, sceneId: keyof Entities) => ({
      ...scenes,
      [sceneId]: new Container<Entity>(...entities[sceneId]),
    }),
    {} as Record<keyof Entities, Container<Entity>>
  );
