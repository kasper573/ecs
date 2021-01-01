# TODO

# Tasks

- [x] Boilerplate
- [ ] Rename Game to World
- [ ] Rename Room to Scene

# POCs

- [ ] Text adventure game
- [ ] Text adventure game + Twitch votes
- [ ] Text adventure game + Twitch votes + Multiplayer aspect (ie. jackbox.tv)
      (Before we can do this we need ideas on what the viewers can do when connecting to game)
- [ ] More game mechanics
- [ ] 2d/3d unity implementation

# Specifications

## Text adventure game

- [x] Game describes the current game state to the player.
- [x] Game displays a number of actions
- [x] Player can perform any of the displayed actions

## Twitch integration

- [ ] App should be able to signal twitch to start a vote given parameters: 1 Question, X Answers
- [ ] App should be able to receive vote results: Nr. of votes / question
- [ ] (Stretch goal) Viewers can input their own answers and then the community votes for which one to select

# Brainstorm

rooms that you can traverse between
rooms to contain objects you can observe or interact with
objects to have traits:

- usable
- consumable
- carryable
- observable
- composable
- aliases
  objects need to be able to react to actions/events
  inventory that can be filled with objects with the carryable trait
