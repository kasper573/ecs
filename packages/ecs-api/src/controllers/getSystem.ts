import { Request, Response } from "express";
import { getManager } from "typeorm";
import { PublishedSystem } from "../models/PublishedSystem";
import { SystemDefinitionId } from "../../../ecs-serializable/src/definition/SystemDefinition";

export async function getSystem(request: Request, response: Response) {
  const systemId = request.params["id"] as SystemDefinitionId | undefined;
  if (!systemId) {
    response.status(403).send("System id not specified");
    return;
  }
  const publishRepository = getManager().getRepository(PublishedSystem);
  const published = systemId
    ? await publishRepository.findOne({ systemId })
    : undefined;
  if (!published) {
    response.status(404).send("System not found");
    return;
  }
  response.send({ ecs: published.ecs });
}
