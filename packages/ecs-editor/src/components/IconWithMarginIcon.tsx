import { SvgIconComponent } from "@material-ui/icons";
import styled from "styled-components";

export const IconWithMarginIcon = styled.div<{ $offset: number }>`
  display: flex;
  position: relative;
  > svg:first-child {
    position: absolute;
    left: ${({ theme, $offset }) => theme.spacing($offset)}px;
    transform: translateX(-100%);
  }
`;

export function createIconWithMarginIcon(
  MarginIcon: SvgIconComponent,
  LayoutIcon: SvgIconComponent,
  offset = 0
) {
  return () => (
    <IconWithMarginIcon $offset={offset}>
      <MarginIcon />
      <LayoutIcon />
    </IconWithMarginIcon>
  );
}
