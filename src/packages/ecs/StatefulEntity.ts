import { Entity } from "./Entity";
import { Component } from "./Component";

export class StatefulEntity<
  EntityState,
  SystemState
> extends Entity<SystemState> {
  constructor(
    public state: EntityState,
    components?: Component<Entity<SystemState>>[]
  ) {
    super(components);
  }
}
