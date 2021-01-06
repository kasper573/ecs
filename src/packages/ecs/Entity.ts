import { Component } from "./Component";
import { System } from "./System";
import { Class, Container } from "./Container";

export class Entity<SystemState> {
  // @ts-ignore
  system: System<SystemState>;

  private _components: ReadonlyArray<Component<this>> = [];
  public get components() {
    return this._components;
  }
  public set components(value) {
    this._components = value;
    for (const component of value) {
      component.entity = this as this extends Entity<any> ? this : never;
    }
  }

  constructor(components?: ReadonlyArray<Component<Entity<SystemState>>>) {
    if (components) {
      this.components = components as ReadonlyArray<Component<this>>;
    }
  }

  findComponents<C extends Component<this>>(type: Class<C>): C[] {
    return Container.prototype.filterType.bind(this.components)(type);
  }

  findComponent<C extends Component<this>>(type: Class<C>): C | undefined {
    return Container.prototype.findType.bind(this.components)(type);
  }

  resolveType<C extends Component<this>>(type: Class<C>): C {
    return Container.prototype.resolveType.bind(this.components)(type);
  }
}
