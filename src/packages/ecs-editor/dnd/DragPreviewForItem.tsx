import { ReactElement } from "react";
import { ComponentDefinition } from "../../ecs-serializable/definition/ComponentDefinition";
import { LibraryFolder } from "../../ecs-serializable/definition/LibraryFolder";
import { EntityDefinition } from "../../ecs-serializable/definition/EntityDefinition";
import {
  ComponentDefinitionIcon,
  EntityDefinitionIcon,
  EntityInitializerIcon,
  FolderIcon,
} from "../icons";
import { EntityInitializer } from "../../ecs-serializable/definition/EntityInitializer";
import { DNDType } from "./DNDType";
import { DragPreview } from "./DragPreview";

export type DragPreviewForItemProps = {
  type: DNDType;
  item: unknown;
};

export function DragPreviewForItem({
  type,
  item,
}: DragPreviewForItemProps): ReactElement {
  switch (type) {
    case DNDType.ComponentDefinition:
      const componentDefinition = item as ComponentDefinition;
      return (
        <DragPreview
          icon={ComponentDefinitionIcon}
          name={componentDefinition.name}
        />
      );
    case DNDType.EntityDefinition:
      const entityDefinition = item as EntityDefinition;
      return (
        <DragPreview icon={EntityDefinitionIcon} name={entityDefinition.name} />
      );
    case DNDType.LibraryFolder:
      const libraryFolder = item as LibraryFolder;
      return <DragPreview icon={FolderIcon} name={libraryFolder.name} />;
    case DNDType.EntityInitializer:
      const entity = item as EntityInitializer;
      return <DragPreview icon={EntityInitializerIcon} name={entity.name} />;
  }
}
