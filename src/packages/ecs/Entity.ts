import { Component } from "./Component";
import { System } from "./System";
import { Container } from "./Container";
import { trustedUndefined } from "./trustedUndefined";
import { connectObservableArray } from "./connectObservableArray";

export class Entity {
  system: System = trustedUndefined();

  readonly components = new Container<Component<this>>();

  constructor(components?: readonly Component<Entity>[]) {
    connectObservableArray(this.components, (added, removed) => {
      added.forEach((component) => {
        component.entity = this as this extends Entity ? this : never;
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
