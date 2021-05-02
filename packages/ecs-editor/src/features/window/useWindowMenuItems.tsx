import { MenuItem } from "@material-ui/core";
import { useContext } from "react";
import { core } from "../../core";
import { useDispatch, useSelector } from "../../store";
import { getOpenWindows } from "./getOpenWindows";
import { isWindowOpen } from "./isWindowOpen";
import { selectWindows } from "./selectWindows";
import { WindowDefinitionContext } from "./WindowDefinitionContext";

export const useWindowMenuItems = () => {
  const dispatch = useDispatch();
  const windowDefinitions = useContext(WindowDefinitionContext);
  const windowState = useSelector(selectWindows);
  const openWindowIds = getOpenWindows(windowState);
  return windowDefinitions.map(({ id, title }) => {
    const toggleAction = isWindowOpen(windowState, id)
      ? core.actions.closeWindow(id)
      : core.actions.openWindow(id);
    return (
      <MenuItem
        key={id}
        selected={openWindowIds.includes(id)}
        onClick={() => dispatch(toggleAction)}
      >
        {title}
      </MenuItem>
    );
  });
};
