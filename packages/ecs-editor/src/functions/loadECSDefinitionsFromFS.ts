import { pickFile } from "js-pick-file";
import { defined } from "../../../ecs-common/src/defined";
import { unzipECSDefinition } from "./zipECSDefinition";

export async function loadECSDefinitionsFromFS() {
  let files: File[];
  try {
    files = Array.from(
      await pickFile({
        multiple: false,
        accept: ".zip",
      })
    );
  } catch {
    return []; // file picker was closed without input
  }
  return defined(await Promise.all(files.map(unzipECSDefinition)));
}
