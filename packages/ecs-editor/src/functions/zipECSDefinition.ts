import JSZip from "jszip";
import { ECSDefinition } from "../../../ecs-serializable/src/definition/ECSDefinition";

export async function zipECSDefinition(ecs: ECSDefinition): Promise<Blob> {
  const zip = new JSZip();
  zip.file("ecs.json", JSON.stringify(ecs));
  return zip.generateAsync({ type: "blob" });
}

export async function unzipECSDefinition(
  zipContent: Blob
): Promise<ECSDefinition | undefined> {
  const zip = new JSZip();
  await zip.loadAsync(zipContent);
  const ecsJsonString = await zip.file("ecs.json")?.async("string");
  if (ecsJsonString) {
    try {
      return JSON.parse(ecsJsonString);
    } catch {}
  }
}
