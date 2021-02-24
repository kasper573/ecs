import { SerializedComponent } from "./SerializedComponent";

export type SerializedEntity = {
  name: string;
  components: SerializedComponent[];
};
