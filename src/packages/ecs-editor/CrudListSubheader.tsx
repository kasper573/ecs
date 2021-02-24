import {
  IconButton,
  ListItemSecondaryAction,
  ListSubheader,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { AddIcon } from "./icons";

export type CrudListSubheaderProps = {
  /**
   * The title of the header
   */
  title: string;
  /**
   * The noun to use for the button tooltip
   */
  noun?: string;
  /**
   * Called when the create button is pressed
   */
  onCreate: () => void;
};

/**
 * A list header with a create button
 */
export const CrudListSubheader = ({
  title,
  noun,
  onCreate,
}: CrudListSubheaderProps) => (
  <Container>
    {title}
    <ListItemSecondaryAction>
      <Tooltip title={`Add ${noun}`.trim()}>
        <IconButton edge="end" aria-label="delete" onClick={onCreate}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </ListItemSecondaryAction>
  </Container>
);

const Container = styled(ListSubheader).attrs({ component: "div" })`
  background: ${({ theme }) => theme.palette.background.paper};
`;
