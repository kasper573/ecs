import { PaletteType } from "@material-ui/core";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";

export const setThemeType = createEditorStateReducer<PaletteType>(
  (state, { payload: themeType }) => {
    state.themeType = themeType;
  }
);
