import React from "react";
import { IconButton, TextField, Tooltip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { bindPopper, bindToggle } from "material-ui-popup-state";
import { usePopupState } from "material-ui-popup-state/hooks";
import { useSelector } from "../store";
import { selectEditorSelection } from "../selectors/selectEditorSelection";
import { selectListOfEntityDefinition } from "../selectors/selectListOfEntityDefinition";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { AddIcon } from "../icons";
import { CommonPopper } from "../components/CommonPopper";

export type CreateEntityInitializerButtonProps = {
  title: string;
  onCreate: (selected: EntityDefinition) => void;
};

export const CreateEntityInitializerButton = ({
  title,
  onCreate,
}: CreateEntityInitializerButtonProps) => {
  const { system, scene } = useSelector(selectEditorSelection);
  const entities = useSelector(selectListOfEntityDefinition);
  const popupState = usePopupState({
    variant: "popper",
    popupId: "select-entity-definition",
  });
  if (!system || !scene) {
    return null; // Can't create entity without system and scene selected
  }
  return (
    <>
      <Tooltip title={title}>
        <IconButton edge="end" aria-label={title} {...bindToggle(popupState)}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <CommonPopper {...bindPopper(popupState)} onClickAway={popupState.close}>
        <Autocomplete
          onChange={(e, definition) => {
            if (definition) {
              onCreate(definition);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select entity"
              variant="outlined"
            />
          )}
          getOptionLabel={(entity) => entity.name}
          options={entities}
        />
      </CommonPopper>
    </>
  );
};
