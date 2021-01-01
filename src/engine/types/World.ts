import { Effect } from "./Effect";
import { createActions } from "../createActions";
import { interpretCommand } from "../interpretCommand";
import { createUnknownCommandEffect } from "../createUnknownCommandEffect";
import { Scene } from "./Scene";
import { Inventory } from "./Inventory";
import { Action } from "./Action";

export class World<Config extends Record<keyof any, Scene> = any> {
  public inventory: Inventory = [];
  public effect?: Effect;

  public get scene() {
    return this.config[this.sceneId];
  }
  public get entities() {
    return [...(this.scene ? this.scene : []), ...this.inventory];
  }
  public get actions(): Action[] {
    return createActions(this.entities, this);
  }

  constructor(public sceneId: keyof Config, private config: Config) {}

  public perform(command: string) {
    const action = interpretCommand(command, this.actions);
    this.effect = action
      ? action.perform(this)
      : createUnknownCommandEffect(command);
  }
}
