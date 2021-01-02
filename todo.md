# Immediate tasks

- [x] Boilerplate
- [ ] Refactor engine and entities
  - [x] Rename Traits to Components
  - [x] Stop using singleton pattern for entities
  - [x] Create class based EntityContainer/ComponentContainer abstraction
  - [ ] Refactor all new Component usages (maybe make abstract?) and Observable/Collectable used as Usable. We need UsableComponent.
  - [ ] Extract application code from engine (move to separate folder)
  - [ ] Create some folder structure for multiple stories
  - [ ] Reconsider folder structure of the engine
  - [ ] Carryable entities have no scene, is that ok? How do they reference this.scene, if we implement that? Give this some thought in general!
  - [ ] Have a look at ECS projects on NPM and see I could use one of them
- [ ] Write unit tests for engine
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
