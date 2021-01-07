import { SceneManager } from "../ecs-scene-manager/SceneManager";
import { Scenes } from "./Scenes";
import { TextAdventureState } from "./TextAventureState";

export class TextAdventureSM extends SceneManager<Scenes, TextAdventureState> {}
