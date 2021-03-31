import styled from "styled-components";
import { Paper, PaperProps } from "@material-ui/core";
import { forwardRef } from "react";
import { PanelName } from "../types/PanelName";

export type PanelProps = PaperProps & {
  name?: PanelName;
};

const PanelBase = forwardRef(
  ({ children, name, style, ...paperProps }: PanelProps, ref) => (
    <Paper ref={ref} {...paperProps} style={{ ...style, gridArea: name }}>
      <PanelContent>{children}</PanelContent>
    </Paper>
  )
);

/**
 * A Paper with a title (if name is specified).
 * Panel name will be used to specify a gridArea.
 * (Should be a child of EditorPanelContainer for layout to work properly)
 */
export const Panel = styled(PanelBase)`
  overflow-x: hidden;
  ${({ theme }) => theme.breakpoints.up("sm")} {
    overflow-y: auto;
  }
`;

const PanelContent = styled.div`
  // Ensure children with position absolute is relative
  // to panel content regardless of scroll position
  position: relative;
  min-height: 100%;
`;
