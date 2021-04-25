import MonacoEditor, {
  EditorProps as MonacoEditorProps,
} from "@monaco-editor/react";
import { PaletteType } from "@material-ui/core";
import { editor } from "monaco-editor";
import { useRef } from "react";
import { useSelector } from "../store";
import { selectThemeType } from "../selectors/selectThemeType";
import { ECSScript } from "../../../ecs-serializable/src/definition/ECSScript";

export type CodeEditorProps = {
  value: ECSScript;
  onChange: (updated: ECSScript) => void;
  options?: MonacoEditorProps["options"];
};

export const CodeEditor = ({
  value: { code },
  onChange,
  options,
}: CodeEditorProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const materialThemeType = useSelector(selectThemeType);
  const monacoThemeType = materialThemeToMonacoTheme[materialThemeType];
  return (
    <MonacoEditor
      value={code}
      onMount={(editor) => (editorRef.current = editor)}
      defaultLanguage="javascript"
      theme={monacoThemeType}
      options={options}
      onValidate={() => onChange({ code: editorRef.current?.getValue() ?? "" })}
    />
  );
};

type MonacoThemeType = MonacoEditorProps["theme"];
const materialThemeToMonacoTheme: Record<PaletteType, MonacoThemeType> = {
  light: "light",
  dark: "vs-dark",
};
