import Tab, { TabProps } from "@material-ui/core/Tab";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { PropsWithChildren } from "react";
import { CloseIcon } from "./icons";

export const ClosableTab = ({ label, ...props }: TabProps) => (
  <ClosableTabBase
    label={<LabelWithCloseButton>{label}</LabelWithCloseButton>}
    {...props}
  />
);

const ClosableTabBase = styled(Tab).attrs({ component: "span" })`
  position: relative;
`;

const LabelWithCloseButton = ({ children }: PropsWithChildren<{}>) => (
  <>
    {children}
    <DockedIconButton>
      <CloseIcon />
    </DockedIconButton>
  </>
);

const DockedIconButton = styled(IconButton).attrs({
  size: "small",
  edge: "end",
})`
  position: absolute;
  right: ${({ theme }) => theme.spacing(1)}px;
  .MuiSvgIcon-root {
    font-size: ${({ theme }) => theme.spacing(2)}px;
  }
`;
