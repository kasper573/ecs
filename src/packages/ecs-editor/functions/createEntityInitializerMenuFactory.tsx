import { MouseEvent } from "react";
import { MenuItem } from "@material-ui/core";
import NestedMenuItem from "material-ui-nested-menu-item";
import { MenuItemRendererProps } from "../hooks/useMenu";
import { combine } from "../../ecs-common/combine";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../../ecs-serializable/definition/EntityInitializer";
import { EntityDefinition } from "../../ecs-serializable/definition/EntityDefinition";
import { cloneWithIndexAsKey } from "../../ecs-common/cloneWithIndexAsKey";

export const createEntityInitializerMenuFactory = (
  entityDefinitions: EntityDefinition[],
  onCreateEmptyInitializer: (parentEntityId?: EntityInitializerId) => void,
  onInitializeEntityDefinition: (
    definition: EntityDefinition,
    parentEntityId?: EntityInitializerId
  ) => void,
  onRename: (entity: EntityInitializer) => void,
  onDuplicate: (entity: EntityInitializer) => void,
  onDelete: (entity: EntityInitializer) => void
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
    ei: EntityInitializer,
    { close }: MenuItemRendererProps
  ) {
    const closeAnd = (and: (x: typeof ei) => void) => (ev: MouseEvent) => {
      close(ev);
      and(ei);
    };
    return [
      ...getCommonMenuItems({ close }, ei.id),
      <MenuItem onClick={closeAnd(onRename)}>Rename</MenuItem>,
      <MenuItem onClick={closeAnd(onDuplicate)}>Duplicate</MenuItem>,
      <MenuItem onClick={closeAnd(onDelete)}>Delete</MenuItem>,
    ];
  }

  return {
    create: getCreateMenuItems,
    common: getCommonMenuItems,
    entity: getMenuItemsForEntity,
  };
};
