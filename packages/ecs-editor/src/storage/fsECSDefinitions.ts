import { pickFile } from "js-pick-file";
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
  const parseResults = await Promise.all(files.map(unzipECSDefinition));
  return parseResults.map((result, index) => ({
    file: files[index],
    result,
  }));
}
