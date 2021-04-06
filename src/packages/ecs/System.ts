import EventEmitter from "events";
import TypedEmitter from "typed-emitter";
import { Entity } from "./Entity";

export class System<EntityId extends string = string> {
  private context: Record<string, unknown> = {};
  readonly events: TypedEmitter<SystemEvents> = new EventEmitter();
  readonly root: Entity<EntityId> = new Entity<EntityId>(undefined, undefined, {
    system: this,
  });

  /**
   * Semantic shortcut of system.root.activeDescendants
   */
  get entities() {
    return this.root.activeDescendants;
  }

  dispose() {
    for (const entity of this.root.descendants) {
      entity.dispose();
    }
  }

  getContext<T>(propertyName: string) {
    return this.context.hasOwnProperty(propertyName)
      ? (this.context[propertyName] as T)
      : undefined;
  }

  setContext(propertyName: string, value: unknown) {
    this.context[propertyName] = value;
  }

  update() {
    for (const entity of this.entities) {
      for (const component of entity.components) {
        component.update();
      }
    }
    this.events.emit("update");
  }

  constructor(...initial: Entity<EntityId>[]) {
    this.root.children.push(...initial);
    this.update();
  }
}

type SystemEvents = {
  update: () => void;
};
