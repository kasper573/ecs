import { Entity } from "../engine/types/Entity";
import { Observable } from "../engine/components/Observable";
import { isLit } from "./lighter";

export const darkness = Entity.forComponents(
  "darkness",
  new Observable({
    observe: () => "It is very dark.",
    isActive: (entity, world) => !isLit(world),
  })
);
