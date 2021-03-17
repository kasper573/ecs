import React from "react";
import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";
import {
  ClickAwayListener,
  Fade,
  IconButton,
  Paper,
  Popper,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { AddIcon } from "./icons";

export type SelectComponentDefinitionButtonProps = {
  componentDefinitions: ComponentDefinition[];
  onSelected: (selected: ComponentDefinition) => void;
};

export const SelectComponentDefinitionButton = ({
  componentDefinitions,
  onSelected,
}: SelectComponentDefinitionButtonProps) => (
  <PopupState variant="popper" popupId="demo-popup-popper">
    {(popupState) => (
      <div>
        <Tooltip title="Add component">
          <IconButton
            edge="end"
            aria-label="delete"
            {...bindToggle(popupState)}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Popper {...bindPopper(popupState)} placement="bottom-end" transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper style={{ width: 300 }}>
                <ClickAwayListener onClickAway={popupState.close}>
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
                    options={componentDefinitions}
                  />
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    )}
  </PopupState>
);
