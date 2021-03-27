import { TextField, TextFieldProps } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useAsRef } from "../../ecs-common/useAsRef";

export type TextEditorProps = {
  value: TextFieldProps["value"];
  onChange: (updated: TextEditorProps["value"]) => void;
} & Pick<TextFieldProps, "type">;

export const TextEditor = ({
  value: propValue,
  onChange,
  ...textFieldProps
}: TextEditorProps) => {
  const [value, setValue] = useState(propValue);
  const [debouncedValue, debounceControls] = useDebounce(value, 250);

  const ref = useAsRef({
    onChange,
    propValue,
    debounceControls,
  });

  // New prop value bypasses debounce
  useEffect(() => {
    ref.current.debounceControls.flush();
    setValue(propValue);
  }, [propValue, ref]);

  // Debounce change events
  useEffect(() => {
    const { onChange, propValue } = ref.current;
    // Avoid false positives
    if (debouncedValue !== propValue) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, ref]);

  const handleChange = useCallback(
    (e: { currentTarget: { value: any } }) => setValue(e.currentTarget.value),
    []
  );

  return (
    <TextField value={value} onChange={handleChange} {...textFieldProps} />
  );
};
