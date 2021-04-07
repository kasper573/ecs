# Abstract

- Replace NativeComponents solution with serializable JS/TS (or something?)
- Persisting object definitions
- Sandbox user submitted scripts
- Script editor (monaco?)

# Tasks

- Onboarding component:
  <IntroTooltip
  title="This property value has changed. You can right click and select reset to revert to the original value"
  id="ResetPropertyValue" // store in localstorage and only show once
  when={hasBaseDiff} // show only when this property is true. If omitted, show at any time
  />
- Convert ActionPoller to ECS component
- TreeView drag in instances panel should allow movement into a folder by dropping between items
  (this is also how reordering should be done)
- Create Reactive component (should behave as mobx reaction/when)
- Create equivalent of unity scriptable objects
- Entity.isActive editor/runtime sync

- Update Collectable to use an Entity that has Inventory component as target.
  (Make entity instances draggable and component properties drop zones)

- Implement create definition for instance action
- Implement apply prop diff to definition action
- Implement apply instance diff to definition action
- Scope support for tree views

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

# Nice to have

- Localization
- Implement "Apply to definition" action for each component property
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

- Rename defaultECS to exampleECS
- Refactor/simplify/improve mock functions for ecs-serializable unit tests
- Cover more (all!) test cases in ecs-serializable
- replace zod (zod doesn't support readonly)
- ComponentInitializerId should also be universally unique
- Get rid of / simplify CridList/CrudListItem into CommonList/CommonListItem
  (replace hard coded menu items with menuItems prop, just like TreeView)
- Explore hook categorization ("rendering hooks" vs "behavior hooks")
  Should I stop using rendering hooks in favor of event controlled components (ie. passing in an EventEmitter to control state)

# Bugs

- NestedMenuItem package breaks auto focus for fields in dialogs opened by the menu item
- redux-undo sometimes undos way too much. Repro: delete campfire, undo.
