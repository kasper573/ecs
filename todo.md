# Immediate tasks

- [x] Boilerplate
- [ ] Refactor ECS
  - [ ] Carryable entities have no scene, is that ok? How do they reference this.scene, if we implement that? Give this some thought in general!
  - [ ] Entity Component Container should be read only
  - [ ] System should have specific Entity types
  - [ ] Entities should resolve components specific for the SystemState
  - [ ] System.sceneId should be generic type to allow type safe Enum workflow
  - [ ] Rename effect to "action description" or something.
  - [ ] Collectable should look for Describables on the same entity and disable them instead of reimplementing Describable.
        (To achieve this components need lifecycle and mount events)
  - [ ] entity.getComponents(system).resolveType(Describable).describe(entity, system);
        should be entity.resolveComponent<Describable>.description
- [x] Write unit tests for engine
- [ ] Enable test coverage
- [ ] Syntax based actions instead of select from list
- [ ] Twitch votes integration
- [ ] Refactor everything to FP
- [ ] Nice to have refactor
  - [ ] Create some folder structure for multiple stories
  - [ ] Have a look at ECS projects on NPM and see I could use one of them
  - [ ] Set up proper monorepo infrastructure

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

# Nostalgic task history

- [x] Rename Traits to Components
- [x] Stop using singleton pattern for entities
- [x] Create class based EntityContainer/ComponentContainer abstraction
- [x] Extract application code from engine (move to separate folder)
- [x] Reconsider folder structure of the engine
- [x] Remove System.effect, return it from performCommand, let useSystem store it in react state
- [x] Refactor all new Component usages to use Interactive
- [x] Move all interactivity to ecs-interactive
- [x] Rename ecs-text to ecs-describable
- [x] Don't use loose strings for scene ids
- [x] Rename World to System
