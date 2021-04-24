import MonacoEditor, {
  EditorProps as MonacoEditorProps,
} from "@monaco-editor/react";
import { PaletteType } from "@material-ui/core";
import { useSelector } from "../store";
import { selectThemeType } from "../selectors/selectThemeType";

export const CodeEditor = (props: MonacoEditorProps) => {
  const materialThemeType = useSelector(selectThemeType);
  const monacoThemeType = materialThemeToMonacoTheme[materialThemeType];
  return <MonacoEditor theme={monacoThemeType} {...props} />;
};

type MonacoThemeType = MonacoEditorProps["theme"];
const materialThemeToMonacoTheme: Record<PaletteType, MonacoThemeType> = {
  light: "light",
  dark: "vs-dark",
};
