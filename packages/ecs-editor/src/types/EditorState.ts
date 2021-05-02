import { PaletteType } from "@material-ui/core";
import { EntityState } from "@reduxjs/toolkit";
import { ECSDefinition } from "../../../ecs-serializable/src/definition/ECSDefinition";
import { CodeFile, CodeFileId } from "../features/codeFile/CodeFile";
import { WindowState } from "../features/window/WindowState";
import { InspectedValue } from "./InspectedValue";

export type EditorState = {
  ecs: ECSDefinition;
  themeType: PaletteType;
  inspected?: InspectedValue;
  codeFiles: EntityState<CodeFile>;
  selectedCodeFileId?: CodeFileId;
  windows: WindowState;
};
