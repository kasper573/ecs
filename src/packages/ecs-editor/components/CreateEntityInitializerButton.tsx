import React from "react";
import { IconButton, TextField, Tooltip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { uuid } from "../functions/uuid";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { useSelector } from "../store";
import { requireSelection } from "../functions/requireSelection";
import { selectLibraryDefinitions } from "../selectors/selectLibraryDefinitions";
import { values } from "../../nominal";
import { selectEditorSelection } from "../selectors/selectEditorSelection";
import { CommonPopper } from "./CommonPopper";
import { AddIcon } from "./icons";

export type CreateEntityInitializerButtonProps = {
  onCreate: (entityInitializer: EntityInitializer) => void;
};

export const CreateEntityInitializerButton = ({
  onCreate,
}: CreateEntityInitializerButtonProps) => {
  const selection = useSelector(selectEditorSelection);
  const { entities } = useSelector(selectLibraryDefinitions);
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
              systemId: requireSelection(selection, "system"),
              sceneId: requireSelection(selection, "scene"),
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
        options={values(entities)}
      />
    </CommonPopper>
  );
};
