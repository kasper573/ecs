import React from "react";
import {
  IconButton,
  ListItemSecondaryAction,
  Tooltip,
} from "@material-ui/core";
import { useSelector } from "../store";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { useDialog } from "../hooks/useDialog";
import { serializeJS } from "../../ecs-serializable/jsSerializer";
import { selectECS } from "../selectors/selectECS";
import { EditorTitle } from "./EditorTitle";
import { SaveIcon } from "./icons";
import { SimpleDialog } from "./SimpleDialog";

export const AppBar = () => {
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const ecs = useSelector(selectECS);
  const [showSaveDialog, saveDialog] = useDialog((props) => (
    <SimpleDialog title="Save" {...props}>
      <pre>{serializeJS(ecs, { space: 2 })}</pre>
    </SimpleDialog>
  ));
  return (
    <>
      <EditorTitle>{selectedSystem?.name}</EditorTitle>
      <ListItemSecondaryAction>
        <Tooltip title="Save" onClick={showSaveDialog}>
          <IconButton edge="end" aria-label="save">
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
      {saveDialog}
    </>
  );
};
