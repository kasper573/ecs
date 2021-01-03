import { Component } from "./Component";
import { System } from "./System";
import { Container } from "./Container";

export class Entity<State = any> {
  constructor(
    public name: string,
    public state: State,
    private resolveComponents: (state: State, system: System) => Component[]
  ) {}

  public getComponents(system: System) {
    return new Container<Component>(
      ...this.resolveComponents(this.state, system)
    );
  }
}
