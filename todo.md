# Immediate tasks

- [x] Boilerplate
- [x] Write unit tests for engine
- [x] Enable test coverage
- [x] Twitch votes integration (chat bot)
- [ ] Write tests for poll/chatbot code
- [ ] Add readme to each package describing what each does and how to use it
- [ ] Create basic editor to allow prototyping stories
- [ ] Improved twitch poll implementation (twitch extension, pubsub?, or https://poll.ma.pe/)
- [ ] Syntax based actions instead of select from list
- [ ] (Stretch goal) Refactor everything to FP
- [ ] (Stretch goal) Reimplement ECS using react components that don't render but only
      emit state via context, then use that state and render text in top level

# Polish

- [ ] Instead of performing the voted action immediately, programmatically
      type the action string into the console input while playing keypress sounds

# Refactor

- [ ] Set up proper monorepo infrastructure
- [ ] Try to make System entities a Container
- [ ] Get rid of trustedUndefined

# Nice to have

- [ ] Create some folder structure for multiple stories
- [ ] Have a look at ECS projects on NPM and see I could use one of them
- [ ] Add runtime check to disallow creating of entities when deriving entities from system state

# Other ECS projects

- https://ecsy.io/
- https://github.com/nidorx/ecs-lib
- https://nova-engine.github.io/ecs/
- https://javelin.games/ecs/

# Long term tasks

- [x] Text adventure game
- [x] Text adventure game + Twitch votes
- [ ] Text adventure game + Twitch votes + Multiplayer aspect (ie. jackbox.tv)
      (Before we can do this we need ideas on what the viewers can do when connecting to game)
- [ ] Go write a nice story and build the game
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
- [x] entity.getComponents(system).resolveType(Describable).describe(entity, system);
      should be entity.resolveComponent<Describable>.description
- [x] Separate stateful and stateless entities
- [x] Remove name from entity, let it be state for entities that need it
- [x] Options object for Entity constructor
- [x] Entity Component Container should be read only
- [x] System should have specific Entity types
- [x] Entities should resolve components specific for the SystemState
- [x] Collectable should look for Describables on the same entity and disable them instead of reimplementing Describable.
      (To achieve this components need lifecycle and mount events)
- [x] Rename Effect to InteractionResult
- [x] Component options cleanup
- [x] Rename action apply
- [x] Move scene code to separate package
- [x] System.sceneId should be generic type to allow type safe Enum workflow
- [x] Create unit tests for SystemModule/System connection
- [x] Create unit tests for Entity/Component connection
- [x] Create unit tests for ObservableArray
- [x] Stateless system (make Inventory a module)
- [x] Show number of votes next to action.
- [x] Show action number instead of dash (-)
- [x] Display instruction on how to vote
