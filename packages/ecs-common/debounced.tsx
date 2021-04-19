import {
  ComponentType,
  ChangeEvent,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useDebounce } from "use-debounce";
import { useAsRef } from "./src/useAsRef";

export function debounced<
  C extends ComponentType<Props>,
  Value,
  Props extends {
    value: Value;
    onChange: (e: ChangeEvent<E>) => void;
  },
  E extends Element
>(
  Component: C,
  getValue: (e: E) => Value,
  delay = 333,
  options: DebounceOptions<Value> = {}
) {
  type DebouncedComponentProps = Omit<Props, "onChange"> & {
    onChange: (newValue: Value) => void;
  };
  const DebouncedComponent = ({
    value: propValue,
    onChange,
    ...props
  }: DebouncedComponentProps) => {
    const [value, setValue] = useState<Value>(propValue);
    const [debouncedValue] = useDebounce(value, delay, options);
    const ref = useAsRef({ onChange, propValue });

    const handleChange = useCallback((e: ChangeEvent<E>) => {
      setValue(getValue(e.currentTarget));
    }, []);

    useEffect(() => setValue(propValue), [propValue]);
    useEffect(() => {
      const { onChange, propValue } = ref.current;
      if (debouncedValue !== propValue) {
        onChange(debouncedValue);
      }
    }, [ref, debouncedValue]);

    return (
      <Component value={value} onChange={handleChange} {...(props as any)} />
    );
  };
  return DebouncedComponent;
}

type DebounceOptions<T> = {
  maxWait?: number;
  leading?: boolean;
  trailing?: boolean;
  equalityFn?: (left: T, right: T) => boolean;
};
