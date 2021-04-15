import styled from "styled-components";
import { IconButton, MenuItem, Typography } from "@material-ui/core";
import { AddIcon, MenuIcon, SystemIcon } from "../components/icons";
import { useDispatch, useSelector } from "../store";
import { selectListOfSystemDefinition } from "../selectors/selectListOfSystemDefinition";
import { MenuFor } from "../components/MenuFor";
import { useSystemCrud } from "../hooks/useSystemCrud";
import { useLoadECSDefinitionsDialog } from "../hooks/useLoadECSDefinitionsDialog";
import { CommonCard, CommonCardLabel } from "../components/CommonCard";
import { CommonCardContainer } from "../components/CommonCardContainer";
import { ContentPadding } from "../layout/ContentPadding";
import { systemRoute } from "../routes/systemRoute";

export const HomeView = () => {
  const dispatch = useDispatch();
  const systems = useSelector(selectListOfSystemDefinition);
  const {
    showCreateDialog,
    showRenameDialog,
    showDeleteDialog,
  } = useSystemCrud();
  const showLoadDialog = useLoadECSDefinitionsDialog();
  return (
    <ContentPadding>
      <Typography paragraph variant="h5">
        Systems on this device
      </Typography>
      <CommonCardContainer>
        <MenuFor
          items={[
            <MenuItem onClick={showCreateDialog}>New system</MenuItem>,
            <MenuItem onClick={showLoadDialog}>Load systems</MenuItem>,
          ]}
        >
          {(props) => (
            <CommonCard {...props}>
              <LargeAddIcon />
            </CommonCard>
          )}
        </MenuFor>
        {systems.map((system) => (
          <CommonCard
            key={system.id}
            onClick={() => dispatch(systemRoute.push(system))}
          >
            <LargeSystemIcon />
            <CommonCardLabel>
              <Typography noWrap>{system.name}</Typography>
              <MenuFor
                items={[
                  <MenuItem onClick={() => showRenameDialog(system)}>
                    Rename
                  </MenuItem>,
                  <MenuItem onClick={() => showDeleteDialog(system)}>
                    Delete
                  </MenuItem>,
                ]}
              >
                {(props) => (
                  <IconButton color="inherit" {...props}>
                    <MenuIcon />
                  </IconButton>
                )}
              </MenuFor>
            </CommonCardLabel>
          </CommonCard>
        ))}
      </CommonCardContainer>
    </ContentPadding>
  );
};

const LargeSystemIcon = styled(SystemIcon)`
  width: 100%;
  height: 100%;
  padding: 0 20% 27% 20%;
`;

const LargeAddIcon = styled(AddIcon)`
  width: 100%;
  height: 100%;
  padding: 20%;
`;
