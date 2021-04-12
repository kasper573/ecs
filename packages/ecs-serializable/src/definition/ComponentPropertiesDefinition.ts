export type ComponentProperties = Record<string, ComponentPropertyValue>;

export type ComponentPropertiesDefinition = Record<
  string,
  ComponentPropertyValueDefinition
>;

export type ComponentPropertyPrimitive = number | string | boolean | undefined;

export type ComponentPropertyFunctionDefinition = { code: string };

export type ComponentPropertyFunction = () => ComponentPropertyPrimitive | void;

export type ComponentPropertyValue =
  | ComponentPropertyPrimitive
  | ComponentPropertyPrimitive[]
  | ComponentPropertyFunction;

export type ComponentPropertyValueDefinition =
  | ComponentPropertyPrimitive
  | ComponentPropertyPrimitive[]
  | ComponentPropertyFunctionDefinition;
