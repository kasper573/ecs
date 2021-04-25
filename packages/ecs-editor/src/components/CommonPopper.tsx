import {
  ClickAwayListener,
  ClickAwayListenerProps,
  Fade,
  Paper,
  Popper,
  PopperProps,
} from "@material-ui/core";
import styled from "styled-components";
import { zIndex } from "../zIndex";

type CommonPopperProps = PopperProps &
  Pick<ClickAwayListenerProps, "onClickAway">;

export const CommonPopper = ({
  children,
  onClickAway,
  ...popperProps
}: CommonPopperProps) => (
  <Container {...popperProps} placement="bottom-end" transition>
    {({ TransitionProps }) => (
      <Fade {...TransitionProps} timeout={350}>
        <Paper style={{ width: 300 }}>
          <ClickAwayListener onClickAway={onClickAway}>
            {children}
          </ClickAwayListener>
        </Paper>
      </Fade>
    )}
  </Container>
);

const Container = styled(Popper)`
  z-index: ${zIndex.tooltip};
`;
