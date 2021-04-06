import {
  IconButton,
  IconButtonProps,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import { MenuIcon } from "../icons";
import { useSelector } from "../store";
import { selectListOfSystemDefinition } from "../selectors/selectListOfSystemDefinition";
import { MenuFor } from "../components/MenuFor";
import { useSystemCrud } from "../hooks/useSystemCrud";

export const FileMenu = (buttonProps: IconButtonProps) => {
  const systems = useSelector(selectListOfSystemDefinition);
  const { showCreateDialog, showSelectDialog } = useSystemCrud();
  return (
    <MenuFor
      items={[
        <MenuItem onClick={showCreateDialog}>New system</MenuItem>,
        systems.length > 0 && (
          <MenuItem onClick={showSelectDialog}>Select system</MenuItem>
        ),
      ]}
    >
      {(props) => (
        <Tooltip title="File">
          <IconButton {...props} {...buttonProps}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      )}
    </MenuFor>
  );
};
