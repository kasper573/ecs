import { Switch } from "@material-ui/core";
import { ZodType, ZodTypes } from "zod";
import { isType } from "../../property-bag/isType";
import { FunctionEditor } from "./FunctionEditor";
import { TextEditor } from "./TextEditor";

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
        checked={value as boolean}
        onChange={(e) => onChange(e.target.checked)}
      />
    );
  }
  if (isType(type, ZodTypes.number)) {
    return (
      <TextEditor
        value={(value as string) ?? "0"}
        type="number"
        onChange={(updated) => onChange(parseFloat(updated as string))}
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
    return <TextEditor value={(value as string) ?? ""} onChange={onChange} />;
  }
};

const empty = () => {};
