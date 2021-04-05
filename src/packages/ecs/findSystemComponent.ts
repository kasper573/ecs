import { InstanceOf } from "../property-bag/types/PropertyBagInstance";
import { System } from "./System";
import { Component } from "./Component";

export function findSystemComponent<C extends Component>(
  system: System | undefined,
  componentType: C
) {
  if (!system) {
    return;
  }
  for (const entity of system.active) {
    const inv = entity.components.findType(componentType);
    if (inv) {
      return inv as InstanceOf<C>;
    }
  }
}
