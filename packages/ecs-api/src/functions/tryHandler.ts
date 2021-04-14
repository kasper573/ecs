import { Handler, NextFunction, Request, Response } from "express";

export function tryHandler<T extends Handler>(
  handler: T,
  catcher: (
    err: any,
    request: Request,
    response: Response,
    next: NextFunction
  ) => false | undefined,
  proceed: Handler
): Handler {
  return (request, response, next) => {
    handler(request, response, (err?: any) => {
      if (catcher(err, request, response, next) !== false) {
        proceed(request, response, next);
      }
    });
  };
}
