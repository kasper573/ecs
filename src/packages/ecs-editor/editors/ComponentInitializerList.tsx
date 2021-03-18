import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { ExpandAccordionIcon } from "../components/icons";
import { replaceItem } from "../functions/replaceItem";
import { ComponentInitializerEditor } from "./ComponentInitializerEditor";

export type ComponentInitializerListProps = Omit<
  AccordionProps,
  "children" | "onChange"
> & {
  items: ComponentInitializer[];
  definitions: ComponentDefinition[];
  onChange: (updated: ComponentInitializer[]) => void;
};

export const ComponentInitializerList = ({
  items,
  definitions,
  onChange,
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
            <Typography>{definition.name}</Typography>
          </AccordionSummary>
          <AccordionDetailsColumn>
            <ComponentInitializerEditor
              initializer={initializer}
              definition={definition}
              onChange={(updated) =>
                onChange(replaceItem(items, initializer, updated))
              }
            />
          </AccordionDetailsColumn>
        </Accordion>
      );
    })}
  </>
);

const AccordionDetailsColumn = styled(AccordionDetails)`
  flex-direction: column;
  padding: 0;
`;
