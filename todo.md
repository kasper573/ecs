# Immediate tasks

- [x] Boilerplate
- [ ] Refactor engine and entities
  - [x] Rename Traits to Components
  - [x] Stop using singleton pattern for entities
  - [x] Create class based EntityContainer/ComponentContainer abstraction
  - [x] Extract application code from engine (move to separate folder)
  - [ ] Refactor all new Component usages (maybe make abstract?) and Observable/Collectable used as Usable. We need UsableComponent.
  - [ ] Create some folder structure for multiple stories
  - [x] Reconsider folder structure of the engine
  - [ ] Carryable entities have no scene, is that ok? How do they reference this.scene, if we implement that? Give this some thought in general!
  - [ ] Have a look at ECS projects on NPM and see I could use one of them
  - [ ] Set up proper monorepo infrastructure
  - [x] Remove World.effect, return it from performCommand, let useWorld store it in react state
  - [ ] Add test coverage
  - [ ] Entity Component Container should be read only
  - [ ] World should have specific Entity types
  - [ ] Entities should resolve components specific for the WorldState
  - [ ] World.sceneId should be generic type to allow type safe Enum workflow
  - [ ] Remove action from Component, move to specific InteractionComponent (maybe move all interactivity to ecs-interaction)
  - [ ] Rename ecs-text to ecs-describable
  - [ ] Rename effect to "action description" or something. Maybe it doesn't belong in ecs, but in ecs-text too?
  - [x] Don't use loose strings for scene ids
  - [ ] Collectable should look for Describables on the same entity and disable them instead of reimplementing Describable.
        (To achieve this components need lifecycle and mount events)
- [~] Write unit tests for engine
- [ ] Syntax based actions instead of select from list
- [ ] Twitch votes integration
- [ ] Refactor everything to FP

# Long term tasks

- [~] Text adventure game
- [ ] Text adventure game + Twitch votes
- [ ] Text adventure game + Twitch votes + Multiplayer aspect (ie. jackbox.tv)
      (Before we can do this we need ideas on what the viewers can do when connecting to game)
- [ ] More game mechanics
- [ ] 2d/3d unity implementation

# Twitch integration notes

- [ ] App should be able to signal twitch to start a vote given parameters: 1 Question, X Answers
- [ ] App should be able to receive vote results: Nr. of votes / question
- [ ] (Stretch goal) Viewers can input their own answers and then the community votes for which one to select
