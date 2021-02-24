import styled from "styled-components";
import { EditorPanel } from "./EditorPanel";

/**
 * An EditorPanel with no elevation or background
 */
export const EditorFlatPanel = styled(EditorPanel).attrs({
  elevation: 0,
})`
  background: transparent;
  padding: ${({ theme }) => theme.spacing(2)}px;
`;
