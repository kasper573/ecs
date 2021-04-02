import { Switch, TextField } from "@material-ui/core";
import { ZodType, ZodTypes } from "zod";
import { isType } from "../../property-bag/isType";
import { FunctionEditor } from "./FunctionEditor";

export type PrimitiveEditorProps = {
  value: unknown;
  onChange: (updated: unknown) => void;
};

export const getPrimitiveEditor = (type: ZodType<unknown>) => {
  const supportedTypes = Object.keys(primitiveEditors) as Array<
    keyof typeof primitiveEditors
  >;
  for (const typeName of supportedTypes) {
    if (isType(type, typeName)) {
      return primitiveEditors[typeName];
    }
  }
};

const primitiveEditors = {
  [ZodTypes.function]: ({ value, onChange }: PrimitiveEditorProps) => (
    <FunctionEditor value={(value as Function) ?? empty} onChange={onChange} />
  ),
  [ZodTypes.string]: ({ value, onChange }: PrimitiveEditorProps) => (
    <TextField
      size="small"
      value={value ?? ""}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  ),
  [ZodTypes.number]: ({ value, onChange }: PrimitiveEditorProps) => (
    <TextField
      size="small"
      value={value ?? "0"}
      type="number"
      onChange={(e) => onChange(parseFloat(e.currentTarget.value))}
    />
  ),
  [ZodTypes.boolean]: ({ value, onChange }: PrimitiveEditorProps) => (
    <Switch
      size="small"
      checked={value as boolean}
      onChange={(e) => onChange(e.target.checked)}
    />
  ),
};

const empty = () => {};
