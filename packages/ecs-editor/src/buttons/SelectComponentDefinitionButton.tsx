import React from "react";
import { IconButton, TextField, Tooltip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { usePopupState } from "material-ui-popup-state/hooks";
import { bindPopper, bindToggle } from "material-ui-popup-state";
import { ComponentDefinition } from "../../../ecs-serializable/src/definition/ComponentDefinition";
import { useRootSelector } from "../store";
import { selectListOfComponentDefinition } from "../selectors/selectListOfComponentDefinition";
import { AddIcon } from "../components/icons";
import { CommonPopper } from "../components/CommonPopper";

export type SelectComponentDefinitionButtonProps = {
  onSelected: (selected: ComponentDefinition) => void;
};

export const SelectComponentDefinitionButton = ({
  onSelected,
}: SelectComponentDefinitionButtonProps) => {
  const components = useRootSelector(selectListOfComponentDefinition);
  const popupState = usePopupState({
    variant: "popper",
    popupId: "select-component-definition",
  });
  return (
    <>
      <Tooltip title="Add component">
        <IconButton
          edge="end"
          aria-label="Add component"
          {...bindToggle(popupState)}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <CommonPopper {...bindPopper(popupState)} onClickAway={popupState.close}>
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
          options={components}
        />
      </CommonPopper>
    </>
  );
};
