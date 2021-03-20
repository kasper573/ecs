import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import React from "react";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { AddIcon, DeleteIcon, ExpandAccordionIcon } from "../components/icons";
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
  onRestoreItem?: (updated: ComponentInitializer) => void;
  onRemoveItem?: (updated: ComponentInitializer) => void;
};

export const ComponentInitializerList = ({
  baseItems = [],
  primaryItems,
  definitions,
  onChange,
  onRemoveItem = noop,
  onRestoreItem = noop,
  ...accordionProps
}: ComponentInitializerListProps) => (
  <>
    {pairComponentInitializers(baseItems, primaryItems).map(
      ({ base, primary }) => {
        const instance = (base ?? primary)!; // We trust the pair function to always return at least one
        const definition = definitions.find(
          (d) => d.id === instance.definitionId
        )!;
        return (
          <Accordion key={instance.id} {...accordionProps}>
            <AccordionSummary expandIcon={<ExpandAccordionIcon />}>
              <Typography>
                {definition.name}
                {!primary && " (Removed)"}
              </Typography>
              <AccordionActions>
                {primary ? (
                  <Tooltip title="Remove component">
                    <IconButton
                      edge="end"
                      aria-label="Remove component"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveItem(primary!);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  base && (
                    <Tooltip title="Restore component">
                      <IconButton
                        edge="end"
                        aria-label="Restore component"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRestoreItem(base);
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  )
                )}
              </AccordionActions>
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
  .MuiAccordionSummary-content {
    position: relative; // To be able to catch actions being docked to the right
    align-items: center;
    &.Mui-expanded {
      margin: 12px 0;
    }
  }
  .MuiAccordionDetails-root {
    flex-direction: column;
    padding: 0;
  }
`;

const AccordionActions = styled.div`
  position: absolute;
  right: 0;
  transition: ${({ theme }) =>
    theme.transitions.create(["opacity"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    })};

  ${Accordion}:hover & {
    opacity: 1;
  }

  ${Accordion}:not(:hover) & {
    pointer-events: none;
    opacity: 0;
  }
`;

const noop = () => {};
