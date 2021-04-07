import { IconButton, IconButtonProps, MenuItem } from "@material-ui/core";
import { MenuIcon } from "../icons";
import { useSelector } from "../store";
import { MenuFor } from "../components/MenuFor";
import { useSystemCrud } from "../hooks/useSystemCrud";
import { selectHasSystems } from "../selectors/selectHasSystems";
import { IntroWithDefaultTooltip } from "../intro/IntroWithDefaultTooltip";

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
        <IntroWithDefaultTooltip
          defaultTooltip={{ title: "File" }}
          introId="WhereAreTheSystems"
          message="You can create additional, or switch systems in the file menu."
          when={hasSystems}
        >
          <IconButton {...props} {...buttonProps}>
            <MenuIcon />
          </IconButton>
        </IntroWithDefaultTooltip>
      )}
    </MenuFor>
  );
};
