import React from "react";
import { IconButton, TextField, Tooltip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { usePopupState } from "material-ui-popup-state/hooks";
import { bindPopper, bindToggle } from "material-ui-popup-state";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { useSelector } from "../store";
import { selectListOfComponentDefinition } from "../selectors/selectListOfComponentDefinition";
import { AddIcon } from "../icons";
import { CommonPopper } from "./CommonPopper";

export type SelectComponentDefinitionButtonProps = {
  onSelected: (selected: ComponentDefinition) => void;
};

export const SelectComponentDefinitionButton = ({
  onSelected,
}: SelectComponentDefinitionButtonProps) => {
  const components = useSelector(selectListOfComponentDefinition);
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
