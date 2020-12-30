import styled from "styled-components";

export const Console = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
  padding: 10px;
`;
