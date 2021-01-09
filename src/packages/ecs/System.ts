import { Entity } from "./Entity";
import { Container } from "./Container";
import { SystemModule } from "./SystemModule";
import { isArray } from "./util/isArray";
import { trustedUndefined } from "./util/trustedUndefined";

export class System<SystemState> {
  state: SystemState;
  readonly modules: Container<SystemModule>;

  private readonly getEntities: SystemOptions<SystemState>["entities"];

  public get entities() {
    const entities = this.getEntities(this.state);
    assignEntitiesToSystem(entities, this);
    return entities;
  }

  update() {
    for (const entity of this.entities) {
      for (const component of entity.components) {
        component.update();
      }
    }
  }

  constructor(constructorOptions: ConstructorOptions<SystemState>) {
    const options = normalizeOptions(constructorOptions);
    this.modules = new Container(...(options.modules ?? []));
    this.state = options.state ?? ({} as SystemState);
    this.getEntities = options.entities;

    this.modules.connect(
      (...mods) => mods.forEach((mod) => (mod.system = this)),
      (...mods) => mods.forEach((mod) => (mod.system = trustedUndefined()))
    );

    this.update();
  }
}

const normalizeOptions = <SystemState>(
  options: ConstructorOptions<SystemState>
): SystemOptions<SystemState> => {
  if (isArray(options)) {
    return { entities: () => options };
  }
  const { entities } = options;
  return {
    ...options,
    entities: isArray(entities) ? () => entities : entities ?? (() => []),
  };
};

const assignEntitiesToSystem = <SystemState>(
  entities: readonly Entity<SystemState>[],
  system: System<SystemState>
) => {
  for (const entity of entities) {
    entity.system = system;
  }
};

type ConstructorOptions<SystemState> =
  | {
      modules?: SystemModule[];
      state?: SystemState;
      entities?:
        | ((state: SystemState) => readonly Entity<SystemState>[])
        | readonly Entity<SystemState>[];
    }
  | readonly Entity<SystemState>[];

type SystemOptions<SystemState> = {
  modules?: SystemModule[];
  state?: SystemState;
  entities: (state: SystemState) => readonly Entity<SystemState>[];
};
