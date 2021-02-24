import styled from "styled-components";
import { Typography } from "@material-ui/core";

/**
 * The title of the editor.
 * To be displayed in the AppBar, with right margin added to give space for buttons.
 */
export const EditorTitle = styled(Typography).attrs({
  component: "span",
  noWrap: true,
})`
  margin-right: ${({ theme }) => theme.spacing(1.5)}px;
`;
