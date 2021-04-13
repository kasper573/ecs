import { IconButton, Toolbar, Tooltip, Typography } from "@material-ui/core";
import React, { memo } from "react";
import styled from "styled-components";
import { saveAs } from "file-saver";
import { DeleteIcon, EditIcon, SaveIcon } from "../icons";
import { useDispatch, useSelector } from "../store";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { useCrudDialogs } from "../hooks/useCrudDialogs";
import { SystemDefinition } from "../../../ecs-serializable/src/definition/SystemDefinition";
import { core } from "../core";
import { zipECSDefinition } from "../storage/zipECSDefinition";
import { getECSDefinitionForSystem } from "../../../ecs-serializable/src/functions/getECSDefinitionForSystem";
import { selectECS } from "../selectors/selectECS";
import { ECSDefinition } from "../../../ecs-serializable/src/definition/ECSDefinition";

export const SystemHeader = memo(() => {
  const dispatch = useDispatch();
  const ecs = useSelector(selectECS);
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const [{ showRenameDialog, showDeleteDialog }] = useCrudDialogs(
    "system",
    (system) => system.name,
    { rename: handleSystemRename, remove: handleSystemDelete }
  );

  function handleSystemRename(system: SystemDefinition, name: string) {
    dispatch(
      core.actions.renameSystemDefinition({ systemId: system.id, name })
    );
  }

  function handleSystemDelete(system: SystemDefinition) {
    dispatch(core.actions.deleteSystemDefinition(system.id));
  }

  async function saveECSDefinitionToDisk(ecs: ECSDefinition, name: string) {
    const zipped = await zipECSDefinition(ecs);
    saveAs(zipped, `${name}.zip`);
  }

  return (
    <Row>
      <EditorTitle>
        {selectedSystem ? selectedSystem.name : "No system selected"}
      </EditorTitle>
      {selectedSystem && (
        <>
          <Tooltip title="Save to disk">
            <IconButton
              aria-label="Save to disk"
              onClick={() =>
                saveECSDefinitionToDisk(
                  getECSDefinitionForSystem(ecs, selectedSystem.id),
                  selectedSystem.name
                )
              }
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Rename system">
            <IconButton
              aria-label="Rename system"
              onClick={() => showRenameDialog(selectedSystem)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete system">
            <IconButton
              edge="end"
              aria-label="Delete system"
              onClick={() => showDeleteDialog(selectedSystem)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Row>
  );
});

const Row = styled(Toolbar)`
  display: flex;
  justify-content: flex-end;
`;

const EditorTitle = styled(Typography).attrs({
  component: "span",
  noWrap: true,
})`
  margin: 0 ${({ theme }) => theme.spacing(1.5)}px;
`;
