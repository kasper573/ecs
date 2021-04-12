import styled from "styled-components";
import { ListSubheader } from "@material-ui/core";

export const OpaqueListSubheader = styled(ListSubheader).attrs({
  component: "div",
})`
  background: ${({ theme }) => theme.palette.background.paper};
`;
