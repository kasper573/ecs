import { Component } from "./Component";
import { World } from "./World";
import { Container } from "./Container";

export class Entity<State = any> {
  constructor(
    public name: string,
    public state: State,
    private resolveComponents: (state: State, world: World) => Component[]
  ) {}

  public getComponents(world: World) {
    return new Container<Component>(
      ...this.resolveComponents(this.state, world)
    );
  }
}
