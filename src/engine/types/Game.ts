import { Effect } from "./Effect";
import { createActions } from "../createActions";
import { interpretCommand } from "../interpretCommand";
import { createUnknownCommandEffect } from "../createUnknownCommandEffect";
import { Room } from "./Room";
import { Context } from "./Context";

export class Game<Config extends Record<keyof any, Room> = any> {
  private context: Context = {
    inventory: [],
  };

  public effect?: Effect;

  public get room() {
    return this.roomId !== undefined ? this.config[this.roomId] : undefined;
  }
  public get entities() {
    return this.room ? this.room.entities : [];
  }
  public get actions() {
    return createActions(this.entities);
  }

  constructor(public roomId: keyof Config, private config: Config) {}

  public perform(command: string) {
    const action = interpretCommand(command, this.actions);
    this.effect = action
      ? action.perform(this.context)
      : createUnknownCommandEffect(command);
  }
}
