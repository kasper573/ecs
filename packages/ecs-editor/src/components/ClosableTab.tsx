import Tab, { TabProps } from "@material-ui/core/Tab";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { MouseEvent, PropsWithChildren } from "react";
import { CloseIcon } from "./icons";

export type ClosableTabProps = TabProps & CloseButtonProps;

export const ClosableTab = ({ label, onClose, ...props }: ClosableTabProps) => (
  <ClosableTabBase
    label={
      <LabelWithCloseButton onClose={onClose}>{label}</LabelWithCloseButton>
    }
    {...props}
  />
);

const ClosableTabBase = styled(Tab).attrs({ component: "span" })`
  position: relative;
  padding: ${({ theme }) => theme.spacing(1)}px
    ${({ theme }) => theme.spacing(2)}px;
  .MuiTab-wrapper {
    align-items: flex-start;
  }
`;

type CloseButtonProps = {
  onClose?: (e: MouseEvent) => void;
};

const LabelWithCloseButton = ({
  children,
}: PropsWithChildren<CloseButtonProps>) => (
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
  right: ${({ theme }) => theme.spacing(1.5)}px;
  .MuiSvgIcon-root {
    font-size: ${({ theme }) => theme.spacing(2)}px;
  }
`;
