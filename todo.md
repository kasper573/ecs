# Abstract

- Replace NativeComponents solution with serializable JS/TS (or something?)
- Sandbox user submitted scripts
- Script editor (monaco?)

# Tasks

- Create Reactive component (should behave as mobx reaction/when)
- Create equivalent of unity scriptable objects

- Update Collectable to use an Entity that has Inventory component as target.
  (Make entity instances draggable and component properties drop zones)

- Make it possible to change icon for components (and indirectly entities)
  Leaf entities containing only one component get that components icon.
  Leaf entities containing multiple components get recipe icon.

- Implement create definition for instance action
- Implement "Apply to definition" action for each component property
- Implement apply prop diff to definition action
- Implement apply instance diff to definition action
- Scope support for tree views

- system template support, create empty demoable template that is used when creating the first system

- Property bag refactor/removal

  - Situational component properties (define what this means before you start working. Will need property overloads).
  - Improve type definitions
  - New property-bag feature, overrides: Allow partial extend for base properties (but still require full info for new props)
    (This will replace the custom property overrides solution in ie. Collectable.ts)
  - Replace with component class + reflection: reflect-metadata, https://github.com/Brunodev09/runtime-reflection-typescript

- Dynamic content window
  (allow arbitrary content to be opened in the content window, ie. entity instance/definition, component definition)

- Allow adding custom components
  - By defining properties in editor
  - By adding a single file script with a Component.extends
  - By adding multiple files hosted on server
  - implement inspector for ComponentDefinition
- TreeViewItem rename should be inline, also bind it to F2 hotkey or double click

- Convert ActionPoller to ECS component
- TreeView drag should be cancelable by escape key

# Container tasks

- Version tagging
- Confirm that I can backup volume data from postgres by brute force dl/up using scp
- Use a shared base image containing node modules (for api/web)
- Use restart_policy instead of restart: always
- See if it's possible to remove redundant yarn install
  (reuse the same installation for testing and building of web/api)
- Bundle the api to reduce image file size
- Not running as root
- Attached storage (don't use postgres and sqlite docker services, use dbs provided by DO instead)
- Ditch it all, do kubernetes

# Nice to have

- Option to save runtime to disk
- Localization
- Copy paste objects and component properties (separate duplicate into copy and paste actions)
- Implement multi select (Inspector should support editing shared elements of selections)
- Implement duplicate system action
- Find or create type safe wrapper for react-dnd
- Have a look at ECS projects on NPM and see I could use one of them:
  - https://ecsy.io/
  - https://github.com/nidorx/ecs-lib
  - https://nova-engine.github.io/ecs/
  - https://javelin.games/ecs/

# Refactor

- Refactor/simplify/improve mock functions for ecs-serializable unit tests
- Cover more (all!) test cases in ecs-serializable
- replace zod (zod doesn't support readonly)
- ComponentInitializerId should also be universally unique
- Get rid of / simplify CrydList/CrudListItem into CommonList/CommonListItem
  (replace hard coded menu items with menuItems prop, just like TreeView)
- Explore hook categorization ("rendering hooks" vs "behavior hooks")
  Should I stop using rendering hooks in favor of event controlled components (ie. passing in an EventEmitter to control state)
- Refactor actions and reducers into proper slices (intro module should also redux instead of context)

# Bugs

- NestedMenuItem package breaks auto focus for fields in dialogs opened by the menu item
- redux-undo sometimes undos way too much. Repro: delete campfire, undo.
- Removing TextAdventureRenderer from entity instance (but not definition) does not actually remove the runtime component
- Cannot perform actions for interactives in inventory
