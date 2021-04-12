import { InstanceOf } from "../../property-bag/src/types/PropertyBagInstance";
import { TypeCollection } from "./TypeCollection";
import { Entity } from "./Entity";
import { Component } from "./Component";

export class EntityCollection<Id extends string> extends TypeCollection<
  Entity<Id>
> {
  findComponent<C extends Component>(componentType: C) {
    for (const entity of this) {
      const inv = entity.components.findType(componentType);
      if (inv) {
        return inv as InstanceOf<C>;
      }
    }
  }
}
