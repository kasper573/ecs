import * as z from "zod";
import { createPropertyBag } from "../property-bag/createPropertyBag";
import { InstanceOf } from "../property-bag/types/PropertyBagInstance";
import { PropertyBag } from "../property-bag/types/PropertyBag";
import { Entity } from "./Entity";
import { System } from "./System";

// We need to define this separately because we have a recursive
// relationship between Component and Entity and zod can't statically infer those.
const entitySchema: z.ZodSchema<Entity | undefined> = z.lazy(() =>
  z.instanceof(Entity).optional()
);
const none = z.void().optional();
const unmountSchema = z.function(z.tuple([]), none);
const mountSchema = z.function(z.tuple([]), z.union([none, unmountSchema]));

export const componentProperties = {
  id: {
    // (Used only by ecs-serializable)
    // Instance id, used as relationship between components
    // in entity definitions and entity initializers
    type: z.string().optional(),
    hidden: true,
  },
  entity: {
    type: entitySchema,
    hidden: true,
  },
  isActive: { type: z.boolean(), defaultValue: true },
  update: {
    type: z.function(z.tuple([]), z.union([z.void(), z.undefined()])),
    defaultValue: () => {},
    hidden: true,
  },
  mount: {
    type: mountSchema,
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
  entity?: Entity;
  system?: System;
};

export type ComponentInstance = InstanceOf<typeof Component>;
