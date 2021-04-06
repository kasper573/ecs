export type TreeNode<T> = {
  value: T;
  children: TreeNode<T>[];
  parent?: TreeNode<T>;
};
