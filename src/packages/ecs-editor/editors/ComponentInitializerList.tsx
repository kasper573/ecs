import { Accordion, AccordionProps, AccordionSummary } from "@material-ui/core";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { ExpandAccordionIcon } from "../components/icons";

export type ComponentInitializerListProps = Omit<AccordionProps, "children"> & {
  items: ComponentInitializer[];
  definitions: ComponentDefinition[];
};

export const ComponentInitializerList = ({
  items,
  definitions,
  ...accordionProps
}: ComponentInitializerListProps) => (
  <>
    {items.map((initializer) => {
      const definition = definitions.find(
        (d) => d.id === initializer.definitionId
      )!;
      return (
        <Accordion key={initializer.id} {...accordionProps}>
          <AccordionSummary expandIcon={<ExpandAccordionIcon />}>
            {definition.name}
          </AccordionSummary>
        </Accordion>
      );
    })}
  </>
);
