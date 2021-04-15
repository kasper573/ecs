export async function ecsApi<P extends object>(
  url: string,
  init?: RequestInit,
  parseResponse: (response: Response) => Promise<P> = emptyResponse
): Promise<ApiResult<P>> {
  try {
    const response = await fetch(`${process.env.ECS_API_URL}${url}`, init);
    if (response.status === 200) {
      const parsed = await parseResponse(response);
      return { type: "success" as const, ...parsed };
    }
    const message = await response.text();
    return { type: "error" as const, message: message ?? response.statusText };
  } catch (e) {
    return {
      type: "error" as const,
      message:
        process.env.NODE_ENV !== "production"
          ? "" + e
          : "Oops, something went wrong",
    };
  }
}

export type ApiResult<P extends object> = ApiSuccess<P> | ApiError;

export type ApiSuccess<P extends object> = ApiResultCase<"success", P>;

export type ApiError = ApiResultCase<"error", { message: string }>;

export type ApiResultCase<T, P extends object> = { type: T } & P;

const emptyResponse = <P>() => Promise.resolve({} as P);
