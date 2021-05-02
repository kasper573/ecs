import { createEntityAdapter } from "@reduxjs/toolkit";
import { CodeFile } from "./CodeFile";

export const codeFileAdapter = createEntityAdapter<CodeFile>({
  selectId: (file) => file.id,
  sortComparer: (a, b) => a.order - b.order,
});
