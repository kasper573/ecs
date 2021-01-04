import { Component } from "./Component";
import { System } from "./System";
import { Container } from "./Container";

export class Entity<State = any, SystemState = any> {
  constructor(
    public name: string,
    public state: State,
    private resolveComponents: (
      state: State,
      system: System<SystemState>
    ) => Component[]
  ) {}

  public getComponents(system: System<SystemState>) {
    return new Container<Component<SystemState>>(
      ...this.resolveComponents(this.state, system)
    );
  }
}
