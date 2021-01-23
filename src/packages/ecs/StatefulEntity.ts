import { Entity } from "./Entity";
import { Component } from "./Component";

export class StatefulEntity<State> extends Entity {
  constructor(public state: State, components?: Component<Entity>[]) {
    super(components);
  }
}
