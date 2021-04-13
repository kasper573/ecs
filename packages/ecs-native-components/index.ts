import { Describable } from "../ecs-text-adventure/src/describable/Describable";
import { Collectable } from "../ecs-text-adventure/src/collectable/Collectable";
import { Interactive } from "../ecs-text-adventure/src/interactive/Interactive";
import { Inventory } from "../ecs-text-adventure/src/collectable/Inventory";
import { InteractionMemory } from "../ecs-text-adventure/src/interactive/InteractionMemory";
import { SceneManager } from "../ecs-scene-manager/src/SceneManager";
import { SceneSwitch } from "../ecs-scene-manager/src/SceneSwitch";
import { TextAdventureRenderer } from "../ecs-text-adventure/src/renderer/TextAdventureRenderer";

const nativeComponents = {
  Describable,
  Collectable,
  Interactive,
  Inventory,
  InteractionMemory,
  SceneManager,
  SceneSwitch,
  TextAdventureRenderer,
};

export default nativeComponents;
