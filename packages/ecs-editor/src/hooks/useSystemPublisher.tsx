import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { publishSystem } from "../../../ecs-api-client/publishSystem";
import { SimpleDialog } from "../dialogs/SimpleDialog";
import { getSystemPublishedState } from "../../../ecs-api-client/getSystemPublishedState";
import { getECSDefinitionForSystem } from "../../../ecs-serializable/src/functions/getECSDefinitionForSystem";
import { serializeECSDefinition } from "../../../ecs-serializable/src/serializeECSDefinition";
import { useStore } from "../store";
import { SystemDefinitionId } from "../../../ecs-serializable/src/definition/SystemDefinition";
import { unpublishSystem } from "../../../ecs-api-client/unpublishSystem";
import { useDialog } from "./useDialog";

export function useSystemPublisher(systemId?: SystemDefinitionId) {
  const store = useStore();
  const [isPublished, setPublishedState] = useState(false);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const closeSnackbar = () => setSnackbarOpen(false);
  const canPublish = isAuthenticated;
  const canUnpublish = isPublished && isAuthenticated;

  // Refresh published state every time system id changes
  useEffect(() => {
    async function refresh(id: SystemDefinitionId) {
      const newState = await getSystemPublishedState(id);
      setPublishedState(newState);
    }
    setPublishedState(false);
    if (systemId) {
      refresh(systemId);
    }
  }, [systemId]);

  const showError = useDialog((props, message: string) => (
    <SimpleDialog {...props} title="Error">
      {message}
    </SimpleDialog>
  ));

  async function unpublish() {
    if (!systemId) {
      return;
    }
    const accessToken = await getAccessTokenSilently();
    const result = await unpublishSystem(systemId, accessToken);
    if (result.type === "error") {
      showError(result.message);
    } else {
      setSnackbarMessage("System unpublished");
      setSnackbarOpen(true);
      setPublishedState(false);
    }
  }

  async function publish() {
    if (!systemId) {
      return;
    }
    const accessToken = await getAccessTokenSilently();
    const selectedECS = getECSDefinitionForSystem(
      store.getState().present.ecs,
      systemId
    );
    const result = await publishSystem(
      serializeECSDefinition(selectedECS),
      accessToken
    );
    if (result.type === "error") {
      showError(result.message);
    } else {
      setSnackbarMessage("Publish successful");
      setSnackbarOpen(true);
      setPublishedState(true);
    }
  }

  const snackbar = (
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
  );

  return {
    isPublished,
    canPublish,
    canUnpublish,
    unpublish,
    publish,
    snackbar,
  };
}

const noop = () => {};
