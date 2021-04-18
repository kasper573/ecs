# ECS &middot; [![status](https://github.com/ksandin/ecs/actions/workflows/main.yml/badge.svg)](https://github.com/ksandin/ecs/actions)

An ECS game engine and editor built with Typescript and React.

> This project is primarily focused on making text adventure games engines with twitch.tv integration,
> but both the engine and editor is built on a generic Entity Component System and could be used
> to build other games if the proper components are developed.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

### Development

- Have docker set up on your system
- Run `docker-compose up -d db` to start the postgres database (required by the api).
- Run `yarn dev:api` to start the editor api in dev/watch mode
- Run `yarn dev:editor` to start the editor app in dev/watch mode
  Open [http://localhost:8080](http://localhost:8080) to view the editor in the browser.

### Production

- Have docker set up on your system
- Run `docker-compose up -d` to install postgres, node api and web server for production.
  Open [http://localhost](http://localhost) to view the dockerized editor in the browser.

## Other scripts

In the project directory, you can run:

### `yarn run:api`

Starts the editor API without watch mode.

### `yarn test`

Launches the test runner.

### `yarn build:editor`

Builds the editor SPA for production to the `packages/ecs-editor/dist` folder.
