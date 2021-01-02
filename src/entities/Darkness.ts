import { Entity } from "../engine/types/Entity";
import { Observable } from "../engine/components/Observable";
import { isLit } from "./Lighter";

export class Darkness extends Entity {
  constructor() {
    super("darkness", undefined, () => [
      new Observable({
        observe: () => "It is very dark.",
        isActive: (entity, world) => !isLit(world),
      }),
    ]);
  }
}
