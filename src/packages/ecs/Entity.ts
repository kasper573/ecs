import { Component } from "./Component";
import { System } from "./System";
import { Class, Container } from "./Container";
import { trustedUndefined } from "./trustedUndefined";

export class Entity<SystemState> {
  system: System<SystemState> = trustedUndefined();

  private _components: readonly Component<this>[] = [];
  public get components() {
    return this._components;
  }
  public set components(value) {
    this._components = value;
    for (const component of value) {
      component.entity = this as this extends Entity<any> ? this : never;
    }
  }

  constructor(components?: readonly Component<Entity<SystemState>>[]) {
    if (components) {
      this.components = components as readonly Component<this>[];
    }
  }

  findComponents<C extends Component<this>>(type: Class<C>): C[] {
    return Container.prototype.filterType.bind(this.components)(type);
  }

  findComponent<C extends Component<this>>(type: Class<C>): C | undefined {
    return Container.prototype.findType.bind(this.components)(type);
  }

  resolveComponent<C extends Component<this>>(type: Class<C>): C {
    return Container.prototype.resolveType.bind(this.components)(type);
  }
}
