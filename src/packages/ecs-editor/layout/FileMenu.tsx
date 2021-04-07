import {
  IconButton,
  IconButtonProps,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import { MenuIcon } from "../icons";
import { useSelector } from "../store";
import { MenuFor } from "../components/MenuFor";
import { useSystemCrud } from "../hooks/useSystemCrud";
import { Intro } from "../../intro/Intro";
import { selectHasSystems } from "../selectors/selectHasSystems";

export const FileMenu = (buttonProps: IconButtonProps) => {
  const hasSystems = useSelector(selectHasSystems);
  const { showCreateDialog, showSelectDialog } = useSystemCrud();
  return (
    <MenuFor
      items={[
        <MenuItem onClick={showCreateDialog}>New system</MenuItem>,
        hasSystems && (
          <MenuItem onClick={showSelectDialog}>Select system</MenuItem>
        ),
      ]}
    >
      {(props) => (
        <Intro
          introId="WhereAreTheSystems"
          message="You can create additional or switch systems in the file menu."
          when={hasSystems}
        >
          {({ isIntroVisible }) => {
            const button = (
              <IconButton {...props} {...buttonProps}>
                <MenuIcon />
              </IconButton>
            );
            if (isIntroVisible) {
              // Avoid material-ui warning about nested tooltips
              return button;
            }
            return <Tooltip title="File">{button}</Tooltip>;
          }}
        </Intro>
      )}
    </MenuFor>
  );
};
