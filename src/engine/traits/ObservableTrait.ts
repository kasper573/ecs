import { Derive, Trait, TraitOptions } from "../types/Trait";

export class ObservableTrait extends Trait {
  public readonly observe: ObservableTraitOptions["observe"];

  constructor(options: ObservableTraitOptions) {
    super(options);
    this.observe = options.observe;
  }
}

export type ObservableTraitOptions = TraitOptions & {
  observe: Derive<string>;
};
