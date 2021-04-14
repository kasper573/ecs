import {
  IconButton,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { memo, useState } from "react";
import styled from "styled-components";
import { saveAs } from "file-saver";
import { Alert } from "@material-ui/lab";
import { useAuth0 } from "@auth0/auth0-react";
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
import { PublishError, publishSystem } from "../api/publishSystem";
import { serializeECSDefinition } from "../../../ecs-serializable/src/serializeECSDefinition";
import { useDialog } from "../hooks/useDialog";
import { SimpleDialog } from "../dialogs/SimpleDialog";
import { getPublishedSystemLink } from "../api/getPublishedSystemLink";

export const SystemHeader = memo(() => {
  const dispatch = useDispatch();
  const ecs = useSelector(selectECS);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const closeSnackbar = () => setSnackbarOpen(false);
  const allowPublish = isAuthenticated;

  const [{ showRenameDialog, showDeleteDialog }] = useCrudDialogs(
    "system",
    (system) => system.name,
    { rename: handleSystemRename, remove: handleSystemDelete }
  );

  const showPublishError = useDialog((props, { message }: PublishError) => (
    <SimpleDialog {...props} title="Publish failed">
      {message}
    </SimpleDialog>
  ));

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
    const accessToken = await getAccessTokenSilently();
    const selectedECS = getECSDefinitionForSystem(ecs, selectedSystem!.id);
    const result = await publishSystem(
      serializeECSDefinition(selectedECS),
      accessToken
    );
    if (result.type === "error") {
      showPublishError(result);
    } else {
      setSnackbarMessage("Publish successful!");
      setSnackbarOpen(true);
    }
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
          <Tooltip title={allowPublish ? "Publish" : "Sign in to publish"}>
            <span>
              <IconButton
                disabled={!allowPublish}
                onClick={publishECSDefinition}
              >
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
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        ClickAwayListenerProps={{ onClickAway: noop }}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
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

const noop = () => {};
