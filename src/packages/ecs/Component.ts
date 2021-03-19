import * as zod from "zod";
import { createPropertyBag } from "../property-bag/createPropertyBag";
import { InstanceOf } from "../property-bag/types/PropertyBagInstance";
import { Entity } from "./Entity";
import { trustedUndefined } from "./trustedUndefined";

// We need to define this separately because we have a recursive
// relationship between Component and Entity and zod can't statically infer those.
const entitySchema: zod.ZodSchema<Entity> = zod.lazy(() =>
  zod.instanceof(Entity)
);

export const Component = createPropertyBag({
  entity: {
    type: entitySchema,
    defaultValue: trustedUndefined<Entity>(),
  },
  isActive: { type: zod.boolean(), defaultValue: true },
  update: {
    type: zod.function(zod.tuple([]), zod.union([zod.void(), zod.undefined()])),
    defaultValue: () => {},
    hidden: true,
  },
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Component = typeof Component;

export type ComponentInstance = InstanceOf<typeof Component>;
