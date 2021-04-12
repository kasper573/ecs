import { TextField } from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import { deserializeJS } from "../../../ecs-serializable/src/jsSerializer";
import { useAsRef } from "../../../ecs-common/src/useAsRef";

export const FunctionEditor = ({
  value: inputJs,
  onChange,
}: {
  value: string;
  onChange: (updated: string) => void;
}) => {
  const [dirtyJs, setDirtyJs] = useState(inputJs);
  const isValid = useMemo(() => !!tryParseFunction(dirtyJs), [dirtyJs]);

  // Update dirty js whenever the input js changes
  useEffect(() => setDirtyJs(inputJs), [inputJs]);

  // Data required by but shouldn't trigger the next the effect
  const ref = useAsRef({
    onChange,
    inputJs,
  });

  // Emit a change whenever a new valid function is available
  useEffect(() => {
    const { inputJs, onChange } = ref.current;
    if (isValid && dirtyJs !== inputJs) {
      onChange(dirtyJs);
    }
  }, [dirtyJs, isValid, ref]);

  return (
    <TextField
      size="small"
      multiline
      error={!isValid}
      value={dirtyJs}
      onChange={(e) => setDirtyJs(e.currentTarget.value)}
    />
  );
};

const tryParseFunction = (js: string): Function | undefined => {
  try {
    const parsed = deserializeJS(js);
    return typeof parsed === "function" ? parsed : undefined;
  } catch {}
};
