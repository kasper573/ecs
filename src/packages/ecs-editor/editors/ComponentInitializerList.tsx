import React from "react";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { replaceItem } from "../functions/replaceItem";
import { pairComponentInitializers } from "../functions/pairComponentInitializers";
import {
  ComponentInitializerAccordion,
  ComponentInitializerAccordionProps,
} from "./ComponentInitializerAccordion";

export type ComponentInitializerListProps = {
  baseItems?: ComponentInitializer[];
  primaryItems: ComponentInitializer[];
  definitions: ComponentDefinition[];
  onChange: (updated: ComponentInitializer[]) => void;
} & Pick<ComponentInitializerAccordionProps, "onRestore" | "onRemove">;

export const ComponentInitializerList = ({
  baseItems = [],
  primaryItems,
  definitions,
  onChange,
  onRemove,
  onRestore,
}: ComponentInitializerListProps) => (
  <>
    {pairComponentInitializers(baseItems, primaryItems).map(
      ({ base, primary }, index) => {
        const instance = (base ?? primary)!; // We trust the pair function to always return at least one
        const definition = definitions.find(
          (d) => d.id === instance.definitionId
        )!;
        return (
          <ComponentInitializerAccordion
            key={index}
            base={base}
            primary={primary}
            definition={definition}
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
