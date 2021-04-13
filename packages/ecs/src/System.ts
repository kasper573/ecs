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
    this.root.dispose();
  }

  getContext<T>(propertyName: string) {
    return this.context.hasOwnProperty(propertyName)
      ? (this.context[propertyName] as T)
      : undefined;
  }

  setContext(...args: ContextArgs) {
    if (args.length === 1) {
      this.context = args[0];
    } else {
      const [propertyName, value] = args;
      this.context[propertyName] = value;
    }
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

type ContextArgs =
  | [propertyName: string, value: unknown]
  | [Record<string, unknown>];

type SystemEvents = {
  update: () => void;
};
