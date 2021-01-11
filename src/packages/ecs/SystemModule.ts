import { System } from "./System";

export interface SystemModule {
  system?: System;
  update?: () => any;
}
