import React from "react";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { replaceItem } from "../functions/replaceItem";
import { pairComponentInitializers } from "../functions/pairComponentInitializers";
import {
  ComponentInitializerAccordion,
  ComponentInitializerAccordionProps,
} from "./ComponentInitializerAccordion";

export type ComponentInitializerListProps = {
  baseItems?: ComponentInitializer[];
  primaryItems: ComponentInitializer[];
  onChange: (updated: ComponentInitializer[]) => void;
} & Pick<ComponentInitializerAccordionProps, "onRestore" | "onRemove">;

export const ComponentInitializerList = ({
  baseItems = [],
  primaryItems,
  onChange,
  onRemove,
  onRestore,
}: ComponentInitializerListProps) => (
  <>
    {pairComponentInitializers(baseItems, primaryItems).map(
      ({ base, primary }, index) => {
        return (
          <ComponentInitializerAccordion
            key={index}
            base={base}
            primary={primary}
            onRemove={onRemove}
            onRestore={onRestore}
            onChange={(updated) => {
              if (primary) {
                onChange(replaceItem(primaryItems, primary, updated));
              }
            }}
          />
        );
      }
    )}
  </>
);
