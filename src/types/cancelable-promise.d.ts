declare module "cancelable-promise" {
  export class CancelablePromise<T> extends Promise<T> {
    cancel(): void;
    isCanceled(): boolean;
  }
}
