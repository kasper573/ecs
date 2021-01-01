import { Trait } from "./Trait";
import { World } from "./World";

export class Entity<State = any> {
  constructor(
    public name: string,
    public state: State,
    private resolveTraits: (state: State, world: World) => Trait[]
  ) {}

  public getTraits(world: World): Trait[] {
    return this.resolveTraits(this.state, world);
  }

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
