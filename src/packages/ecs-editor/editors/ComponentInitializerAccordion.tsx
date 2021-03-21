import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  MenuItem,
  Typography,
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { useContextMenu } from "../hooks/useContextMenu";
import { ExpandAccordionIcon } from "../components/icons";
import { ComponentInitializerEditor } from "./ComponentInitializerEditor";

export type ComponentInitializerAccordionProps = {
  base?: ComponentInitializer;
  primary?: ComponentInitializer;
  definition: ComponentDefinition;
  onChange: (updated: ComponentInitializer) => void;
  onRestore?: (updated: ComponentInitializer) => void;
  onRemove?: (updated: ComponentInitializer) => void;
};

export const ComponentInitializerAccordion = ({
  base,
  primary,
  definition,
  onChange,
  onRemove = noop,
  onRestore = noop,
}: ComponentInitializerAccordionProps) => {
  const [toggleProps, contextMenu] = useContextMenu([
    primary ? (
      <MenuItem onClick={() => onRemove(primary)}>Remove component</MenuItem>
    ) : (
      base && (
        <MenuItem onClick={() => onRestore(base)}>Restore component</MenuItem>
      )
    ),
  ]);
  return (
    <Accordion elevation={0}>
      <AccordionSummary {...toggleProps} expandIcon={<ExpandAccordionIcon />}>
        <Typography>
          {definition.name}
          {!primary && " (Removed)"}
        </Typography>
        {contextMenu}
      </AccordionSummary>
      {primary && (
        <AccordionDetails>
          <ComponentInitializerEditor
            base={base}
            primary={primary}
            definition={definition}
            onChange={onChange}
          />
        </AccordionDetails>
      )}
    </Accordion>
  );
};

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

const noop = () => {};
