import EventEmitter from "events";
import TypedEmitter from "typed-emitter";
import { Entity } from "./Entity";
import { Container } from "./Container";
import { SystemModule } from "./SystemModule";
import { isArray } from "./isArray";
import { trustedUndefined } from "./trustedUndefined";
import { connectObservableArray } from "./connectObservableArray";

export class System {
  readonly modules: Container<SystemModule>;
  readonly events: TypedEmitter<SystemEvents> = new EventEmitter();

  private readonly getEntities: SystemOptions["entities"];

  public get entities() {
    const entities = this.getEntities();
    assignEntitiesToSystem(entities, this);
    return entities;
  }

  update(updateModules = true) {
    for (const entity of this.entities) {
      for (const component of entity.components) {
        component.update();
      }
    }
    if (updateModules) {
      for (const mod of this.modules) {
        if (mod.update) {
          mod.update();
        }
      }
    }
    this.events.emit("update");
  }

  constructor(constructorOptions: ConstructorOptions = []) {
    const options = normalizeOptions(constructorOptions);
    this.modules = new Container(...(options.modules ?? []));
    this.getEntities = options.entities;

    connectObservableArray(this.modules, (added, removed) => {
      added.forEach((mod) => {
        mod.system = this;
        if (mod.update) {
          mod.update();
        }
      });
      removed.forEach((mod) => (mod.system = trustedUndefined()));
    });

    this.update(false);
  }
}

const normalizeOptions = (options: ConstructorOptions): SystemOptions => {
  if (isArray(options)) {
    return { entities: () => options };
  }
  const { entities } = options;
  return {
    ...options,
    entities: isArray(entities) ? () => entities : entities ?? (() => []),
  };
};

const assignEntitiesToSystem = (
  entities: readonly Entity[],
  system: System
) => {
  for (const entity of entities) {
    entity.system = system;
  }
};

type ConstructorOptions =
  | {
      modules?: SystemModule[];
      entities?: (() => readonly Entity[]) | readonly Entity[];
    }
  | readonly Entity[];

type SystemOptions = {
  modules?: SystemModule[];
  entities: () => readonly Entity[];
};

type SystemEvents = {
  update: () => void;
};
