import { Component } from "./Component";
import { System } from "./System";
import { Container } from "./Container";
import { trustedUndefined } from "./util/trustedUndefined";
import { connectObservableArray } from "./util/connectObservableArray";

export class Entity<SystemState> {
  system: System<SystemState> = trustedUndefined();

  readonly components = new Container<Component<this>>();

  constructor(components?: readonly Component<Entity<SystemState>>[]) {
    connectObservableArray(this.components, (added, removed) => {
      added.forEach((component) => {
        component.entity = this as this extends Entity<any> ? this : never;
      });
      removed.forEach((component) => {
        component.entity = trustedUndefined();
      });
    });
    if (components) {
      this.components.push(...(components as Component<this>[]));
    }
  }
}
