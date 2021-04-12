import React from "react";
import { ComponentInitializer } from "../../../ecs-serializable/src/definition/ComponentInitializer";
import { pairComponentInitializers } from "../functions/pairComponentInitializers";
import {
  ComponentInitializerAccordion,
  ComponentInitializerAccordionProps,
} from "./ComponentInitializerAccordion";

export type ComponentInitializerListProps = {
  baseItems?: ComponentInitializer[];
  primaryItems: ComponentInitializer[];
} & Pick<
  ComponentInitializerAccordionProps,
  "onRestore" | "onDuplicate" | "onRemove" | "onUpdate" | "onReset"
>;

export const ComponentInitializerList = ({
  baseItems = [],
  primaryItems,
  onRemove,
  onDuplicate,
  onUpdate,
  onRestore,
  onReset,
}: ComponentInitializerListProps) => (
  <>
    {pairComponentInitializers(baseItems, primaryItems).map(
      ({ base, primary }) => {
        const initializer = primary || base;
        if (!initializer) {
          throw new Error("primary or base must be specified");
        }
        return (
          <ComponentInitializerAccordion
            key={initializer.id}
            base={base}
            primary={primary}
            onRemove={onRemove}
            onDuplicate={onDuplicate}
            onRestore={onRestore}
            onUpdate={onUpdate}
            onReset={onReset}
          />
        );
      }
    )}
  </>
);
