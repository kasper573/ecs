import { InstanceOf } from "../property-bag/types/PropertyBagInstance";
import { System } from "./System";
import { Component } from "./Component";

export function findSystemComponent<C extends Component>(
  system: System,
  componentType: C
) {
  for (const entity of system.entities) {
    const inv = entity.components.findType(componentType);
    if (inv) {
      return inv as InstanceOf<C>;
    }
  }
}
