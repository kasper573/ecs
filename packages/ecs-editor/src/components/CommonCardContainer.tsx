import styled from "styled-components";

export const CommonCardContainer = styled.div`
  display: grid;
  flex: 1;
  grid-gap: ${({ theme }) => theme.spacing(2)}px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-auto-rows: 250px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 25vw;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 35vw;
  }
  ${({ theme }) => theme.breakpoints.down("xs")} {
    grid-template-columns: 1fr;
    grid-auto-rows: 250px;
  }
`;
