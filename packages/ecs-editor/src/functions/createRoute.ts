import { push, RouterLocation } from "connected-react-router";
import { RouteProps } from "react-router-dom";
import { matchPath } from "react-router";

export function createRoute<Params extends { [K in keyof Params]?: string }>(
  props: RouteProps,
  createPath: (params: Params) => string
) {
  const pushRoute = (params: Params) => push(createPath(params));

  const match = (location: RouterLocation<unknown>) =>
    matchPath<Params>(location.pathname, props);

  return { push: pushRoute, props, match };
}
