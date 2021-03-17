import { TextField } from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { parseComponentOptions } from "../../ecs-serializable/factories/parseComponentOptions";
import { ComponentOptionsDefinition } from "../../ecs-serializable/types/ComponentOptionsDefinition";

export type ComponentInitializerEditorProps = {
  initializer: ComponentInitializer;
  definition: ComponentDefinition;
  onChange: (updated: ComponentInitializer) => void;
};

export const ComponentInitializerEditor = ({
  initializer,
  onChange,
}: ComponentInitializerEditorProps) => {
  const [rawOptions, setRawOptions] = useState(
    initializer.options?.toString() ?? ""
  );
  const options = useMemo(() => parseComponentOptions(rawOptions), [
    rawOptions,
  ]);
  const isValid = !!options;

  // Emit a change every time we get new valid options
  useEffect(() => {
    if (isValid && rawOptions !== initializer.options) {
      onChange({
        ...initializer,
        options: rawOptions as ComponentOptionsDefinition,
      });
    }
  }, [rawOptions, isValid, initializer, onChange]);

  return (
    <TextField
      multiline
      error={!isValid}
      value={rawOptions}
      onChange={(e) => setRawOptions(e.currentTarget.value)}
    />
  );
};
