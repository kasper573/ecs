import { PaletteType } from "@material-ui/core";
import { EntityState } from "@reduxjs/toolkit";
import { ECSDefinition } from "../../../ecs-serializable/src/definition/ECSDefinition";
import { EditorFile, EditorFileId } from "../features/editorFile/EditorFile";
import { InspectedValue } from "./InspectedValue";

export type EditorState = {
  ecs: ECSDefinition;
  themeType: PaletteType;
  inspected?: InspectedValue;
  files: EntityState<EditorFile>;
  selectedFileId?: EditorFileId;
};
