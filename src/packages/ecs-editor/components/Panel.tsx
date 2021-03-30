import styled from "styled-components";
import { Paper, PaperProps } from "@material-ui/core";
import { PanelName } from "../types/PanelName";

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
      <PanelContent>{children}</PanelContent>
    </Paper>
  )
)`
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
