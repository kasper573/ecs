import { Effect } from "./Effect";
import { createActions } from "../createActions";
import { interpretCommand } from "../interpretCommand";
import { createUnknownCommandEffect } from "../createUnknownCommandEffect";
import { Room } from "./Room";
import { Context } from "./Context";

export class Game<Config extends Record<keyof any, Room> = any> {
  public context: Context;

  public effect?: Effect;

  public get room() {
    return this.config[this.context.roomId];
  }
  public get entities() {
    return [
      ...(this.room ? this.room.entities : []),
      ...this.context.inventory,
    ];
  }
  public get actions() {
    return createActions(this.entities, this.context);
  }

  constructor(roomId: keyof Config, private config: Config) {
    this.context = {
      inventory: [],
      roomId: roomId as string,
    };
  }

  public perform(command: string) {
    const action = interpretCommand(command, this.actions);
    this.effect = action
      ? action.perform(this.context)
      : createUnknownCommandEffect(command);
  }
}
