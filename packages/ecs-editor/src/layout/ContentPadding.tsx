import styled from "styled-components";

export const ContentPadding = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${({ theme }) => theme.spacing(2)}px 0;
`;
