import React, { PropsWithChildren, ReactElement } from "react";
import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";
import { ClickAwayListener, Fade, Paper, Popper } from "@material-ui/core";

export type CommonPopperProps = PropsWithChildren<{
  toggle: (props: ReturnType<typeof bindToggle>) => ReactElement;
}>;

export const CommonPopper = ({
  toggle: Toggle,
  children,
}: CommonPopperProps) => (
  <PopupState variant="popper">
    {(popupState) => (
      <div>
        <Toggle {...bindToggle(popupState)} />
        <Popper {...bindPopper(popupState)} placement="bottom-end" transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper style={{ width: 300 }}>
                <ClickAwayListener onClickAway={popupState.close}>
                  {children}
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    )}
  </PopupState>
);
