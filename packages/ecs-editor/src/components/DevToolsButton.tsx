import { usePopupState } from "material-ui-popup-state/hooks";
import { IconButton, Tooltip } from "@material-ui/core";
import { bindPopper, bindToggle } from "material-ui-popup-state";
import React, { memo } from "react";
import { DevToolsIcon } from "./icons";
import { CommonPopper } from "./CommonPopper";
import { DevTools } from "./DevTools";

export const DevToolsButton = memo(() => {
  const popupState = usePopupState({
    variant: "popper",
    popupId: "select-component-definition",
  });
  return (
    <>
      <Tooltip title="Developer tools">
        <IconButton aria-label="Developer tools" {...bindToggle(popupState)}>
          <DevToolsIcon />
        </IconButton>
      </Tooltip>
      <CommonPopper
        disablePortal
        {...bindPopper(popupState)}
        onClickAway={popupState.close}
      >
        <DevTools />
      </CommonPopper>
    </>
  );
});
