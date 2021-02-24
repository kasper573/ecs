import styled from "styled-components";

/**
 * Displays the selected scene
 */
export const EditorScenePanel = styled.div`
  background: ${({ theme }) => theme.palette.background.default};
  flex: 1;
  padding: ${({ theme }) => theme.spacing(3)}px;
`;
