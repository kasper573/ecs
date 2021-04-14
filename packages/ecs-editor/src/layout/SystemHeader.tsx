import { IconButton, Toolbar, Tooltip, Typography } from "@material-ui/core";
import React, { memo } from "react";
import styled from "styled-components";
import { saveAs } from "file-saver";
import {
  DeleteIcon,
  EditIcon,
  PublishIcon,
  SaveIcon,
  ViewPublishedIcon,
} from "../icons";
import { useDispatch, useSelector } from "../store";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { useCrudDialogs } from "../hooks/useCrudDialogs";
import { SystemDefinition } from "../../../ecs-serializable/src/definition/SystemDefinition";
import { core } from "../core";
import { zipECSDefinition } from "../storage/zipECSDefinition";
import { getECSDefinitionForSystem } from "../../../ecs-serializable/src/functions/getECSDefinitionForSystem";
import { selectECS } from "../selectors/selectECS";
import { publishSystem, PublishSystemResult } from "../api/publishSystem";
import { serializeECSDefinition } from "../../../ecs-serializable/src/serializeECSDefinition";
import { useDialog } from "../hooks/useDialog";
import { SimpleDialog } from "../dialogs/SimpleDialog";
import { getPublishedSystemLink } from "../api/getPublishedSystemLink";

export const SystemHeader = memo(() => {
  const dispatch = useDispatch();
  const ecs = useSelector(selectECS);
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const [{ showRenameDialog, showDeleteDialog }] = useCrudDialogs(
    "system",
    (system) => system.name,
    { rename: handleSystemRename, remove: handleSystemDelete }
  );

  const showPublishResult = useDialog((props, result: PublishSystemResult) =>
    result.type === "success" ? (
      <SimpleDialog {...props} title="Publish successful!" />
    ) : (
      <SimpleDialog {...props} title="Publish failed">
        {result.message}
      </SimpleDialog>
    )
  );

  function handleSystemRename(system: SystemDefinition, name: string) {
    dispatch(
      core.actions.renameSystemDefinition({ systemId: system.id, name })
    );
  }

  function handleSystemDelete(system: SystemDefinition) {
    dispatch(core.actions.deleteSystemDefinition(system.id));
  }

  async function saveECSDefinitionToDisk() {
    const selectedECS = getECSDefinitionForSystem(ecs, selectedSystem!.id);
    const zipped = await zipECSDefinition(selectedECS);
    saveAs(zipped, `${selectedSystem!.name}.zip`);
  }

  async function publishECSDefinition() {
    const selectedECS = getECSDefinitionForSystem(ecs, selectedSystem!.id);
    const result = await publishSystem(serializeECSDefinition(selectedECS));
    showPublishResult(result);
  }

  return (
    <Row>
      <EditorTitle>
        {selectedSystem ? selectedSystem.name : "No system selected"}
      </EditorTitle>
      {selectedSystem && (
        <>
          <Tooltip title="View published">
            <IconButton
              component="a"
              aria-label="View published"
              href={getPublishedSystemLink(selectedSystem.id)}
              target="_blank"
            >
              <ViewPublishedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Publish">
            <IconButton aria-label="Publish" onClick={publishECSDefinition}>
              <PublishIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save to disk">
            <IconButton
              aria-label="Save to disk"
              onClick={saveECSDefinitionToDisk}
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
