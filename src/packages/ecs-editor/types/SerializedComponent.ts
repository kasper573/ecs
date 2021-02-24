import { SerializedProperty } from "./SerializedProperty";

export type SerializedComponent = {
  name: string;
  properties: SerializedProperty[];
};
