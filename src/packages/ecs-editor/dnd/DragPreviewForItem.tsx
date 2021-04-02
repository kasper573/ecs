import { ReactElement } from "react";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { LibraryFolder } from "../../ecs-serializable/types/LibraryFolder";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import {
  ComponentDefinitionIcon,
  EntityDefinitionIcon,
  FolderIcon,
} from "../icons";
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
  }
}
