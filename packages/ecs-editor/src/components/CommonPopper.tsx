import {
  ClickAwayListener,
  ClickAwayListenerProps,
  Fade,
  Paper,
  Popper,
  PopperProps,
} from "@material-ui/core";

type CommonPopperProps = PopperProps &
  Pick<ClickAwayListenerProps, "onClickAway">;

export const CommonPopper = ({
  children,
  onClickAway,
  ...popperProps
}: CommonPopperProps) => (
  <Popper {...popperProps} placement="bottom-end" transition>
    {({ TransitionProps }) => (
      <Fade {...TransitionProps} timeout={350}>
        <Paper style={{ width: 300 }}>
          <ClickAwayListener onClickAway={onClickAway}>
            {children}
          </ClickAwayListener>
        </Paper>
      </Fade>
    )}
  </Popper>
);
