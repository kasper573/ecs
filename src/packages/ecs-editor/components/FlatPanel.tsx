import styled from "styled-components";
import { Panel } from "./Panel";

/**
 * An EditorPanel with no elevation or background
 */
export const FlatPanel = styled(Panel).attrs({
  elevation: 0,
})`
  background: transparent;
  padding: ${({ theme }) => theme.spacing(2)}px;
`;
