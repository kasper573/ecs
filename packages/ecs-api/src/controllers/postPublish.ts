import { default as express, Request, Response } from "express";
import { getManager } from "typeorm";
import jwtAuthz from "express-jwt-authz";
import { PublishedSystem } from "../models/PublishedSystem";
import { parseECSDefinition } from "../../../ecs-serializable/src/parseECSDefinition";
import { getUserId } from "../functions/getUserId";
import { SerializedECSDefinition } from "../../../ecs-serializable/src/types/SerializedECSDefinition";
import { tryHandler } from "../functions/tryHandler";
import { checkJWT } from "../middlewares/checkJWT";

const limit = "20kb";
const json = express.json({ limit });
const checkScopes = jwtAuthz(["read:current_user"]);

export const postPublish = [
  checkJWT,
  checkScopes,
  tryHandler(json, catchJsonError, publish),
];

async function publish(request: Request, response: Response) {
  const serializedECS: SerializedECSDefinition = request.body.ecs;
  const ecs = parseECSDefinition(serializedECS);
  const userId = await getUserId(request);
  if (!userId) {
    response.status(403).send("Cannot publish without auth");
    return;
  }
  if (!ecs) {
    response.status(400).send("Could not parse ECSDefinition");
    return;
  }
  const system = Object.values(ecs.systems)[0];
  if (!system) {
    response.status(400).send("ECSDefinition must contain at least one system");
    return;
  }

  function update(p: PublishedSystem) {
    p.ecs = serializedECS;
    p.name = system.name;
    p.systemId = system.id;
    p.userId = userId!;
  }

  const repo = getManager().getRepository(PublishedSystem);
  let pub = await repo.findOne({ systemId: system.id });

  // New publish
  if (!pub) {
    pub = new PublishedSystem();
    update(pub);
    await repo.insert(pub);
    response.sendStatus(200);
    return;
  }

  // Cannot update others systems
  if (pub.userId !== userId) {
    response.status(403).send("Can only republish systems belonging to user");
    return;
  }

  // Republish
  update(pub);
  await repo.save(pub);
  response.sendStatus(200);
}

function catchJsonError(err: any, request: Request, response: Response) {
  if (err) {
    const tooLarge = err?.type === "entity.too.large";
    const msg = tooLarge ? `System too large (limit: ${limit})` : err + "";
    response.status(400).send(msg);
    return false;
  }
}
