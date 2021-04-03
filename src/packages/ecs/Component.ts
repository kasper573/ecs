import * as zod from "zod";
import { createPropertyBag } from "../property-bag/createPropertyBag";
import { InstanceOf } from "../property-bag/types/PropertyBagInstance";
import { PropertyBag } from "../property-bag/types/PropertyBag";
import { Entity } from "./Entity";
import { trustedUndefined } from "./trustedUndefined";
import { System } from "./System";

// We need to define this separately because we have a recursive
// relationship between Component and Entity and zod can't statically infer those.
const entitySchema: zod.ZodSchema<Entity> = zod.lazy(() =>
  zod.instanceof(Entity)
);

export const componentProperties = {
  id: {
    // (Used only by ecs-serializable)
    // Instance id, used as relationship between components
    // in entity definitions and entity initializers
    type: zod.string().optional(),
    defaultValue: undefined,
    hidden: true,
  },
  entity: {
    type: entitySchema,
    defaultValue: trustedUndefined<Entity>(),
    hidden: true,
  },
  isActive: { type: zod.boolean(), defaultValue: true },
  update: {
    type: zod.function(zod.tuple([]), zod.union([zod.void(), zod.undefined()])),
    defaultValue: () => {},
    hidden: true,
  },
};

export const Component: Component = createPropertyBag(
  componentProperties,
  "Component",
  undefined,
  (component) => ({
    component,
    entity: component.entity,
    system: component.entity?.system,
  })
);

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Component = PropertyBag<
  typeof componentProperties,
  ComponentDeclarationContext
>;

export type ComponentDeclarationContext = {
  component: InstanceOf<Component>;
  entity: Entity;
  system: System;
};

export type ComponentInstance = InstanceOf<typeof Component>;
