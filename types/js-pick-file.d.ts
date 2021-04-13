declare module "js-pick-file" {
  export function pickFile(
    options?: Partial<HTMLInputElement>
  ): Promise<FileList> {}
}
