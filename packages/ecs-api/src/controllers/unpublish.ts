import { Request, Response } from "express";
import { getManager } from "typeorm";
import jwtAuthz from "express-jwt-authz";
import { PublishedSystem } from "../models/PublishedSystem";
import { getUserId } from "../functions/getUserId";
import { checkJWT } from "../middlewares/checkJWT";
import { SystemDefinitionId } from "../../../ecs-serializable/src/definition/SystemDefinition";

const checkScopes = jwtAuthz(["read:current_user"]);

export const unpublishHandlers = [checkJWT, checkScopes, unpublish];

async function unpublish(request: Request, response: Response) {
  const systemId = request.params.id as SystemDefinitionId | undefined;
  if (!systemId) {
    response.status(403).send("No system id specified");
    return;
  }
  const userId = await getUserId(request);
  if (!userId) {
    response.status(403).send("Cannot unpublish without auth");
    return;
  }

  const repo = getManager().getRepository(PublishedSystem);
  const pub = await repo.findOne({ systemId });
  if (!pub) {
    response.status(403).send("Could not find system to unpublish");
    return;
  }

  if (pub.userId !== userId) {
    response.status(403).send("Can only unpublish systems belonging to user");
    return;
  }

  await repo.delete(pub);
  response.sendStatus(200);
}
