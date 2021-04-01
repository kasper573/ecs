import { Switch, TextField } from "@material-ui/core";
import { ZodType, ZodTypes } from "zod";
import { isType } from "../../property-bag/isType";
import { FunctionEditor } from "./FunctionEditor";

export type PrimitiveEditorProps = {
  value: unknown;
  type: ZodType<unknown>;
  onChange: (updated: unknown) => void;
};

export const renderPrimitiveEditor = ({
  value,
  type,
  onChange,
}: PrimitiveEditorProps) => {
  if (isType(type, ZodTypes.boolean)) {
    return (
      <Switch
        size="small"
        checked={value as boolean}
        onChange={(e) => onChange(e.target.checked)}
      />
    );
  }
  if (isType(type, ZodTypes.number)) {
    return (
      <TextField
        size="small"
        value={value ?? "0"}
        type="number"
        onChange={(e) => onChange(parseFloat(e.currentTarget.value))}
      />
    );
  }
  if (isType(type, ZodTypes.function)) {
    return (
      <FunctionEditor
        value={(value as Function) ?? empty}
        onChange={onChange}
      />
    );
  }
  if (isType(type, ZodTypes.string)) {
    return (
      <TextField
        size="small"
        value={value ?? ""}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    );
  }
};

const empty = () => {};
