import React from "react";
import { IconButton, TextField, Tooltip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { createEntityInitializer } from "../../ecs-serializable/factories/createEntityInitializer";
import { uuid } from "../functions/uuid";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { AddIcon } from "./icons";
import { CommonPopper } from "./CommonPopper";

export type CreateEntityInitializerButtonProps = {
  entityDefinitions: EntityDefinition[];
  onCreate: (entityInitializer: EntityInitializer) => void;
};

export const CreateEntityInitializerButton = ({
  entityDefinitions,
  onCreate,
}: CreateEntityInitializerButtonProps) => (
  <CommonPopper
    toggle={(props) => (
      <Tooltip title="Instantiate entity">
        <IconButton edge="end" aria-label="delete" {...props}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    )}
  >
    <Autocomplete
      onChange={(e, definition) => {
        if (definition) {
          onCreate(
            createEntityInitializer({
              id: uuid(),
              name: definition.name,
              definitionId: definition.id,
            })
          );
        }
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Select entity" variant="outlined" />
      )}
      getOptionLabel={(entity) => entity.name}
      options={entityDefinitions}
    />
  </CommonPopper>
);
