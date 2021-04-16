import { push } from "connected-react-router";
import { Location } from "history";
import { RouteProps } from "react-router-dom";
import { matchPath } from "react-router";

export function createRoute<Params extends { [K in keyof Params]?: string }>(
  props: RouteProps,
  createPath: (params: Params) => string
) {
  const pushRoute = (params: Params) => push(createPath(params));

  const match = (location: Location<unknown>) =>
    matchPath<Params>(location.pathname, props);

  const href = (params: Params) =>
    `${window.location.origin}${createPath(params)}`;

  return { push: pushRoute, props, match, href };
}
