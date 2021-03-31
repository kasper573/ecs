/**
 * Common icons used in the UI
 */
import {
  ChevronRight as CollapseIcon,
  ExpandMore as ExpandIcon,
  Folder as FolderIcon,
} from "@material-ui/icons";
import { createIconWithMarginIcon } from "./IconWithMarginIcon";

export {
  Label as PropertyIcon,
  Map as SystemIcon,
  Extension as EntityDefinitionIcon,
  Receipt as EntityInitializerIcon,
  Room as SceneIcon,
  Settings as ComponentDefinitionIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  RotateLeft as ResetIcon,
  SaveAlt as SaveIcon,
  DynamicFeed as GenerateIcon,
  Brightness4 as DarkThemeIcon,
  Brightness7 as LightThemeIcon,
} from "@material-ui/icons";

export { ExpandIcon, CollapseIcon, FolderIcon };

export const FolderOpenIcon = createIconWithMarginIcon(
  ExpandIcon,
  FolderIcon,
  0.25
);

export const FolderClosedIcon = createIconWithMarginIcon(
  CollapseIcon,
  FolderIcon,
  0.25
);
