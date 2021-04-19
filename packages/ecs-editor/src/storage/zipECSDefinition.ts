import JSZip from "jszip";
import { ECSDefinition } from "../../../ecs-serializable/src/definition/ECSDefinition";
import { serializeECSDefinition } from "../../../ecs-serializable/src/serializeECSDefinition";
import { parseECSDefinition } from "../../../ecs-serializable/src/parseECSDefinition";
import { SerializedECSDefinition } from "../../../ecs-serializable/src/types/SerializedECSDefinition";

export async function zipECSDefinition(ecs: ECSDefinition): Promise<Blob> {
  const zip = new JSZip();
  zip.file("ecs.json", serializeECSDefinition(ecs));
  return zip.generateAsync({ type: "blob" });
}

export async function unzipECSDefinition(zipContent: Blob) {
  const zip = new JSZip();
  await zip.loadAsync(zipContent);
  const serialized = (await zip
    .file("ecs.json")
    ?.async("string")) as SerializedECSDefinition;
  return parseECSDefinition(serialized);
}
