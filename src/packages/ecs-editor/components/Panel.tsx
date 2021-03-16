import styled from "styled-components";
import { Paper, PaperProps } from "@material-ui/core";
import { PanelName } from "./PanelName";

export type PanelProps = PaperProps & {
  name?: PanelName;
};

/**
 * A Paper with a title (if name is specified).
 * Panel name will be used to specify a gridArea.
 * (Should be a child of EditorPanelContainer for layout to work properly)
 */
export const Panel = styled(
  ({ children, name, style, ...paperProps }: PanelProps) => (
    <Paper {...paperProps} style={{ ...style, gridArea: name }}>
      {children}
    </Paper>
  )
)`
  position: relative; // Ensure children with position absolute gets docked in the panel
  ${({ theme }) => theme.breakpoints.up("sm")} {
    overflow-y: auto;
  }
`;
