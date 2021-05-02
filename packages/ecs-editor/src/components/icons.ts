/**
 * Common icons used in the UI
 */
import {
  ChevronRight as CollapseIcon,
  ExpandMore as ExpandIcon,
  Folder as FolderIcon,
  Receipt as EntityInitializerIcon,
  Inbox as EntityContainerIcon,
} from "@material-ui/icons";
import { createIconWithMarginIcon } from "./IconWithMarginIcon";

export {
  Label as PropertyIcon,
  Map as SystemIcon,
  Extension as EntityDefinitionIcon,
  Menu as MenuIcon,
  Settings as DevToolsIcon,
  Settings as ComponentDefinitionIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  RotateLeft as ResetIcon,
  SaveAlt as SaveIcon,
  CloudUpload as PublishIcon,
  OpenInNew as ViewPublishedIcon,
  AccountCircle as UserIcon,
  CloudOff as UnpublishIcon,
  DynamicFeed as GenerateIcon,
  Brightness4 as DarkThemeIcon,
  Brightness7 as LightThemeIcon,
  Cancel as CloseIcon,
  ArrowBack as BackIcon,
  Layers as WindowsIcon,
} from "@material-ui/icons";

export {
  EntityInitializerIcon,
  EntityContainerIcon,
  ExpandIcon,
  CollapseIcon,
  FolderIcon,
};

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

export const EntityContainerOpenIcon = createIconWithMarginIcon(
  ExpandIcon,
  EntityContainerIcon,
  0.25
);

export const EntityContainerClosedIcon = createIconWithMarginIcon(
  CollapseIcon,
  EntityContainerIcon,
  0.25
);
