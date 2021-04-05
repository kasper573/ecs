import EventEmitter from "events";
import TypedEmitter from "typed-emitter";
import { Entity } from "./Entity";
import { descendants } from "./descendants";

export class System {
  readonly events: TypedEmitter<SystemEvents> = new EventEmitter();
  readonly root = new Entity(undefined, undefined, { system: this });

  /**
   * Active entities
   */
  get entities() {
    return Array.from(descendants(this.root, (e) => e.isActive));
  }

  /**
   * All entities, active or not
   */
  private get allEntities() {
    return Array.from(descendants(this.root, undefined, true));
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

  constructor(...initial: Entity[]) {
    this.root.children.push(...initial);
    this.update();
  }
}

type SystemEvents = {
  update: () => void;
};
