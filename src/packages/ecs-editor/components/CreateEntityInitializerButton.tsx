import React from "react";
import { IconButton, TextField, Tooltip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { uuid } from "../../ecs-common/uuid";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { useSelector } from "../store";
import { selectEditorSelection } from "../selectors/selectEditorSelection";
import { selectListOfEntityDefinition } from "../selectors/selectListOfEntityDefinition";
import { CommonPopper } from "./CommonPopper";
import { AddIcon } from "./icons";

export type CreateEntityInitializerButtonProps = {
  onCreate: (entityInitializer: EntityInitializer) => void;
};

export const CreateEntityInitializerButton = ({
  onCreate,
}: CreateEntityInitializerButtonProps) => {
  const { system, scene } = useSelector(selectEditorSelection);
  const entities = useSelector(selectListOfEntityDefinition);
  if (!system || !scene) {
    return null; // Can't create entity without system and scene selected
  }
  return (
    <CommonPopper
      popupId="instantiate-entity"
      toggle={(props) => (
        <Tooltip title="Instantiate entity">
          <IconButton edge="end" aria-label="Instantiate entity" {...props}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
    >
      <Autocomplete
        onChange={(e, definition) => {
          if (definition) {
            onCreate({
              systemId: system,
              sceneId: scene,
              id: uuid(),
              name: definition.name,
              definitionId: definition.id,
              components: [],
            });
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
  );
};
