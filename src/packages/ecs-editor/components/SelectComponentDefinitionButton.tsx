import React from "react";
import { IconButton, TextField, Tooltip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { useSelector } from "../store";
import { selectLibraryDefinitions } from "../selectors/selectLibraryDefinitions";
import { values } from "../../nominal";
import { AddIcon } from "./icons";
import { CommonPopper } from "./CommonPopper";

export type SelectComponentDefinitionButtonProps = {
  onSelected: (selected: ComponentDefinition) => void;
};

export const SelectComponentDefinitionButton = ({
  onSelected,
}: SelectComponentDefinitionButtonProps) => {
  const { components } = useSelector(selectLibraryDefinitions);
  return (
    <CommonPopper
      popupId="add-component"
      toggle={(props) => (
        <Tooltip title="Add component">
          <IconButton edge="end" aria-label="Add component" {...props}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
    >
      <Autocomplete
        onChange={(e, definition) => {
          if (definition) {
            onSelected(definition);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select component"
            variant="outlined"
          />
        )}
        getOptionLabel={(definition) => definition.name}
        options={values(components)}
      />
    </CommonPopper>
  );
};
