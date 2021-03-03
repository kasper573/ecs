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
import { createEntityInitializer } from "../../ecs-serializable/factories/createEntityInitializer";
import { uuid } from "../functions/uuid";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { AddIcon } from "./icons";

export type CreateEntityInitializerButtonProps = {
  entityDefinitions: EntityDefinition[];
  onCreate: (entityInitializer: EntityInitializer) => void;
};

export const CreateEntityInitializerButton = ({
  entityDefinitions,
  onCreate,
}: CreateEntityInitializerButtonProps) => (
  <PopupState variant="popper" popupId="demo-popup-popper">
    {(popupState) => (
      <div>
        <Tooltip title="Instantiate entity">
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
                      <TextField
                        {...params}
                        placeholder="Select entity"
                        variant="outlined"
                      />
                    )}
                    getOptionLabel={(entity) => entity.name}
                    options={entityDefinitions}
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
