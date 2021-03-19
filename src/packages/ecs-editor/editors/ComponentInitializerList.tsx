import {
  Accordion as MuiAccordion,
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
          <AccordionDetails>
            <ComponentInitializerEditor
              initializer={initializer}
              definition={definition}
              onChange={(updated) =>
                onChange(replaceItem(items, initializer, updated))
              }
            />
          </AccordionDetails>
        </Accordion>
      );
    })}
  </>
);

/**
 * Accordion that doesn't change margin or size when expanding.
 * Also sets content to be displayed as a column without padding.
 */
const Accordion = styled(MuiAccordion)`
  &:not(.Mui-expanded) + & {
    border-top: 1px solid ${({ theme }) => theme.palette.divider};
  }
  &:before {
    display: none;
  }
  &.Mui-expanded {
    margin: 0;
  }
  .MuiAccordionSummary-root {
    background-color: rgba(255, 255, 255, 0.05);
    &.Mui-expanded {
      min-height: 48px;
    }
  }
  .MuiAccordionSummary-content.Mui-expanded {
    margin: 12px 0;
  }
  .MuiAccordionDetails-root {
    flex-direction: column;
    padding: 0;
  }
`;
