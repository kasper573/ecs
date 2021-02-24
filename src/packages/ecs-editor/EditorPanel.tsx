import styled from "styled-components";
import { Paper, PaperProps, Typography } from "@material-ui/core";
import { EditorPanelName } from "./EditorPanelName";

export type EditorPanelProps = PaperProps & {
  name?: EditorPanelName;
};

/**
 * A Paper with a title (if name is specified).
 * Panel name will be used to specify a gridArea.
 * (Should be a child of EditorPanelContainer for layout to work properly)
 */
export const EditorPanel = styled(
  ({ children, name, style, ...paperProps }: EditorPanelProps) => (
    <Paper {...paperProps} style={{ ...style, gridArea: name }}>
      {name && <Title>{name}</Title>}
      {children}
    </Paper>
  )
)`
  ${({ theme }) => theme.breakpoints.up("sm")} {
    overflow-y: auto;
  }
  padding: ${({ theme }) => theme.spacing(2)}px
    ${({ theme }) => theme.spacing(3)}px;
`;

const Title = styled(Typography).attrs({
  variant: "caption",
  paragraph: true,
})``;
