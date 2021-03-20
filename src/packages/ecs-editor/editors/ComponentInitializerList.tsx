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
import { pairComponentInitializers } from "../functions/pairComponentInitializers";
import { ComponentInitializerEditor } from "./ComponentInitializerEditor";

export type ComponentInitializerListProps = Omit<
  AccordionProps,
  "children" | "onChange"
> & {
  baseItems?: ComponentInitializer[];
  primaryItems: ComponentInitializer[];
  definitions: ComponentDefinition[];
  onChange: (updated: ComponentInitializer[]) => void;
};

export const ComponentInitializerList = ({
  baseItems = [],
  primaryItems,
  definitions,
  onChange,
  ...accordionProps
}: ComponentInitializerListProps) => (
  <>
    {pairComponentInitializers(baseItems, primaryItems).map(
      ({ base, primary }) => {
        const instance = (base ?? primary)!; // We trust the pair function to always return at least one
        const definition = definitions.find(
          (d) => d.id === instance.definitionId
        )!;
        const isRemoved = !primary;
        return (
          <Accordion disabled={isRemoved} key={instance.id} {...accordionProps}>
            <AccordionSummary expandIcon={<ExpandAccordionIcon />}>
              <Typography>
                {definition.name}
                {isRemoved && " (Removed)"}
              </Typography>
            </AccordionSummary>
            {primary && (
              <AccordionDetails>
                <ComponentInitializerEditor
                  base={base}
                  primary={primary}
                  definition={definition}
                  onChange={(updated) => {
                    if (primary) {
                      onChange(replaceItem(primaryItems, primary, updated));
                    }
                  }}
                />
              </AccordionDetails>
            )}
          </Accordion>
        );
      }
    )}
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
