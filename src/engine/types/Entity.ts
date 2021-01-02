import { Component } from "./Component";
import { World } from "./World";

export class Entity<State = any> {
  constructor(
    public name: string,
    public state: State,
    private resolveComponents: (state: State, world: World) => Component[]
  ) {}

  public getComponents(world: World): Component[] {
    return this.resolveComponents(this.state, world);
  }
}
