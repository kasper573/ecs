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

  static forComponents(name: string, ...components: Component[]) {
    return new Entity(name, undefined, () => components);
  }

  static switch<T extends Record<string, Component[]>>(
    name: string,
    components: T,
    initial: keyof T = Object.keys(components)[0]
  ) {
    return new Entity<keyof T>(name, initial, (key) => components[key]);
  }
}
