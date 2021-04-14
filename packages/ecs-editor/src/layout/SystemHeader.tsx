import { IconButton, Toolbar, Tooltip, Typography } from "@material-ui/core";
import React, { memo } from "react";
import styled from "styled-components";
import { saveAs } from "file-saver";
import {
  DeleteIcon,
  EditIcon,
  PublishIcon,
  SaveIcon,
  UnpublishIcon,
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
import { getPublishedSystemLink } from "../../../ecs-api-client/getPublishedSystemLink";
import { useSystemPublisher } from "../hooks/useSystemPublisher";

export const SystemHeader = memo(() => {
  const dispatch = useDispatch();
  const ecs = useSelector(selectECS);
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const {
    isPublished,
    canPublish,
    canUnpublish,
    publish,
    unpublish,
    snackbar,
  } = useSystemPublisher(selectedSystem?.id);

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

  async function saveECSDefinitionToDisk() {
    const selectedECS = getECSDefinitionForSystem(ecs, selectedSystem!.id);
    const zipped = await zipECSDefinition(selectedECS);
    saveAs(zipped, `${selectedSystem!.name}.zip`);
  }

  return (
    <Row>
      <EditorTitle>
        {selectedSystem ? selectedSystem.name : "No system selected"}
      </EditorTitle>
      {selectedSystem && (
        <>
          <Tooltip title={isPublished ? "View published" : "Publish to view"}>
            <span>
              <IconButton
                disabled={!isPublished}
                component="a"
                href={getPublishedSystemLink(selectedSystem.id)}
                target="_blank"
              >
                <ViewPublishedIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={canUnpublish ? "Unpublish" : "Not published"}>
            <span>
              <IconButton disabled={!canUnpublish} onClick={unpublish}>
                <UnpublishIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={canPublish ? "Publish" : "Sign in to publish"}>
            <span>
              <IconButton disabled={!canPublish} onClick={publish}>
                <PublishIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Save to disk">
            <IconButton onClick={saveECSDefinitionToDisk}>
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Rename system">
            <IconButton onClick={() => showRenameDialog(selectedSystem)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete system">
            <IconButton
              edge="end"
              onClick={() => showDeleteDialog(selectedSystem)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      {snackbar}
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
