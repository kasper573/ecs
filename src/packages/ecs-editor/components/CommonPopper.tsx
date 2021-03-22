import React, { PropsWithChildren, ReactElement } from "react";
import { bindPopper, bindToggle } from "material-ui-popup-state";
import { ClickAwayListener, Fade, Paper, Popper } from "@material-ui/core";
import { usePopupState } from "material-ui-popup-state/hooks";

export type CommonPopperProps = PropsWithChildren<{
  popupId: string;
  toggle: (props: ReturnType<typeof bindToggle>) => ReactElement;
}>;

export const CommonPopper = ({
  popupId,
  toggle: Toggle,
  children,
}: CommonPopperProps) => {
  const popupState = usePopupState({ variant: "popper", popupId });
  return (
    <>
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
    </>
  );
};
