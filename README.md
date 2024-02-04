# ECS &middot; [![status](https://github.com/kasper573/ecs/actions/workflows/main.yml/badge.svg)](https://github.com/kasper573/ecs/actions)

An ECS game editor built with Typescript and React.

## Getting started

- Have docker set up on your system
- Run `docker-compose up -d db` to start the postgres database (required by the api).
- Run `yarn dev:api` to start the editor api in dev/watch mode
- Run `yarn dev:web` to start the editor app in dev/watch mode
  Open [http://localhost:8080](http://localhost:8080) to view the editor in the browser.

## Other scripts

In the project directory, you can run:

### `yarn run:api`

Starts the editor API without watch mode.

### `yarn test`

Launches the test runner.

### `yarn build:editor`

Builds the editor SPA for production to the `packages/ecs-editor/dist` folder.
