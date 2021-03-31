import { SvgIconComponent } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import styled from "styled-components";

export type DragPreviewProps = {
  icon: SvgIconComponent;
  name: string;
};

export const DragPreview = ({ icon: Icon, name }: DragPreviewProps) => (
  <Row>
    <Icon fontSize="default" />
    <Typography variant="caption">{name}</Typography>
  </Row>
);

const Row = styled.div`
  display: flex;
  flex-direction: row;
  opacity: 0.5;
  padding: ${({ theme }) => theme.spacing(0.5)}px;
  align-items: center;
  > .MuiTypography-root {
    margin-left: ${({ theme }) => theme.spacing(1)}px;
  }
`;
