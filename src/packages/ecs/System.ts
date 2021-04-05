import EventEmitter from "events";
import TypedEmitter from "typed-emitter";
import { Entity } from "./Entity";
import { descendants } from "./descendants";

export class System<EntityId extends string = string> {
  readonly events: TypedEmitter<SystemEvents> = new EventEmitter();
  readonly root: Entity<EntityId> = new Entity<EntityId>(undefined, undefined, {
    system: this,
  });

  /**
   * Active entities
   */
  get entities() {
    return Array.from(descendants(this.root, (e) => e.isActive));
  }

  /**
   * All entities, active or not
   */
  get allEntities() {
    return Array.from(descendants(this.root, undefined));
  }

  dispose() {
    for (const entity of this.allEntities) {
      entity.dispose();
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

type SystemEvents = {
  update: () => void;
};
