import React from "react";
import { MenuItem } from "@material-ui/core";
import NestedMenuItem from "material-ui-nested-menu-item";
import { MenuItemRendererProps } from "../hooks/useMenu";
import { combine } from "../../ecs-common/combine";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../../ecs-serializable/types/EntityInitializer";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { cloneWithIndexAsKey } from "../../ecs-common/cloneWithIndexAsKey";

export const createEntityInitializerMenuFactory = (
  entityDefinitions: EntityDefinition[],
  onCreateEmptyInitializer: (parentEntityId?: EntityInitializerId) => void,
  onInitializeEntityDefinition: (
    definition: EntityDefinition,
    parentEntityId?: EntityInitializerId
  ) => void,
  onRenameEntity: (entity: EntityInitializer) => void,
  onDuplicateEntity: (entity: EntityInitializer) => void,
  onDeleteEntity: (entity: EntityInitializer) => void
) => {
  function getCreateMenuItems(
    { close }: MenuItemRendererProps,
    parentEntityId?: EntityInitializerId
  ) {
    return [
      <MenuItem
        onClick={combine(close, () => onCreateEmptyInitializer(parentEntityId))}
      >
        Empty instance
      </MenuItem>,
      <NestedMenuItem label="Select definition" parentMenuOpen={true}>
        {entityDefinitions.map((def) => (
          <MenuItem
            key={def.id}
            onClick={combine(close, () =>
              onInitializeEntityDefinition(def, parentEntityId)
            )}
          >
            {def.name}
          </MenuItem>
        ))}
      </NestedMenuItem>,
    ];
  }

  function getCommonMenuItems(
    { close }: MenuItemRendererProps,
    parentEntityId?: EntityInitializerId
  ) {
    return [
      <NestedMenuItem label="New" parentMenuOpen={true}>
        {getCreateMenuItems({ close }, parentEntityId).map(cloneWithIndexAsKey)}
      </NestedMenuItem>,
    ];
  }

  function getMenuItemsForEntity(
    entity: EntityInitializer,
    { close }: MenuItemRendererProps
  ) {
    return [
      ...getCommonMenuItems({ close }, entity.id),
      <MenuItem
        onClick={(e) => {
          close(e);
          onRenameEntity(entity);
        }}
      >
        Rename
      </MenuItem>,
      <MenuItem
        onClick={(e) => {
          close(e);
          onDuplicateEntity(entity);
        }}
      >
        Duplicate
      </MenuItem>,
      <MenuItem
        onClick={(e) => {
          close(e);
          onDeleteEntity(entity);
        }}
      >
        Delete
      </MenuItem>,
    ];
  }

  return {
    create: getCreateMenuItems,
    common: getCommonMenuItems,
    entity: getMenuItemsForEntity,
  };
};
