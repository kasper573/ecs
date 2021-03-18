import { Switch, TextField } from "@material-ui/core";
import {
  PrimitiveName,
  PrimitiveTypes,
} from "../../ecs-serializable/types/PrimitiveTypes";
import { FunctionEditor } from "./FunctionEditor";

export type PrimitiveEditorProps = {
  value?: PrimitiveTypes[PrimitiveName] | void;
  type: PrimitiveName;
  onChange: (updated: PrimitiveTypes[PrimitiveName]) => void;
};

export const PrimitiveEditor = ({
  value,
  type,
  onChange,
}: PrimitiveEditorProps) => {
  switch (type) {
    case "boolean":
      return (
        <Switch
          value={value ?? false}
          onChange={(e) => onChange(e.currentTarget.checked)}
        />
      );
    case "number":
      return (
        <TextField
          value={value ?? 0}
          type="number"
          onChange={(e) => onChange(parseFloat(e.currentTarget.value))}
        />
      );
    case "function":
      return (
        <FunctionEditor
          value={(value as Function) ?? (() => {})}
          onChange={onChange}
        />
      );
    case "string":
      return (
        <TextField
          value={value ?? ""}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      );
  }
  return null;
};
