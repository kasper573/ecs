import { Trait } from "./Trait";

export class Entity<State = any> {
  public get traits(): Trait[] {
    return this.resolveTraits(this.state);
  }

  constructor(
    public name: string,
    public state: State,
    private resolveTraits: (state: State) => Trait[]
  ) {}

  static forTraits(name: string, ...traits: Trait[]) {
    return new Entity(name, undefined, () => traits);
  }

  static switch<T extends Record<string, Trait[]>>(
    name: string,
    traits: T,
    initial: keyof T = Object.keys(traits)[0]
  ) {
    return new Entity<keyof T>(name, initial, (key) => traits[key]);
  }
}
