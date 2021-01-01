import { Trait } from "../types/Trait";
import { Entity } from "../types/Entity";

export class ObservableTrait<EntityState> extends Trait {
  public describe: EntityDescriber<EntityState>;
  constructor(describe: string | EntityDescriber<EntityState>) {
    super();
    this.describe = typeof describe === "function" ? describe : () => describe;
  }
}

export type EntityDescriber<State> = (entity: Entity<State>) => string;
