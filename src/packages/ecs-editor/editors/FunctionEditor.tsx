import { TextField } from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import {
  deserializeJS,
  serializeJS,
} from "../../ecs-serializable/jsSerializer";
import { useAsRef } from "../../ecs-common/useAsRef";

export const FunctionEditor = ({
  value: inputFunction,
  onChange,
}: {
  value: Function;
  onChange: (updated: Function) => void;
}) => {
  const inputJs = useMemo(() => serializeJS(inputFunction), [inputFunction]);
  const [dirtyJs, setDirtyJs] = useState(inputJs);
  const parsedFunction = useMemo(() => tryParseFunction(dirtyJs), [dirtyJs]);
  const isValid = !!parsedFunction;

  // Update dirty js whenever the input js changes
  useEffect(() => setDirtyJs(inputJs), [inputJs]);

  // Data required by but shouldn't trigger the next the effect
  const ref = useAsRef({
    onChange,
    inputJs,
    parsedFunction,
  });

  // Emit a change whenever a new valid function is available
  useEffect(() => {
    const { inputJs, onChange, parsedFunction } = ref.current;
    if (isValid && dirtyJs !== inputJs) {
      onChange(parsedFunction);
    }
  }, [dirtyJs, isValid, ref]);

  return (
    <TextField
      multiline
      error={!isValid}
      value={dirtyJs}
      onChange={(e) => setDirtyJs(e.currentTarget.value)}
    />
  );
};

const tryParseFunction = (js: string) => {
  try {
    const parsed = deserializeJS(js);
    return typeof parsed === "function" ? parsed : undefined;
  } catch {}
};
