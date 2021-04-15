import styled from "styled-components";
import { Card } from "@material-ui/core";

export const CommonCard = styled(Card)`
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transform: perspective(100px) translateZ(0);
  &:hover {
    transform: perspective(100px) translateZ(2px);
  }
  transition: ${({ theme }) =>
    theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    })};
`;

export const CommonCardLabel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.palette.common.white};
  fill: ${({ theme }) => theme.palette.common.white};
  padding: ${({ theme }) => theme.spacing(2)}px;
  height: ${({ theme }) => theme.spacing(8)}px;
  display: flex;
  align-items: center;

  .MuiButtonBase-root {
    position: absolute;
    right: ${({ theme }) => theme.spacing(1)}px;
  }
`;
