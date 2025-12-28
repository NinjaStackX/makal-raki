export enum Role {
  "ADMIN",
  "USER",
}
export type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  role: Role;
};
export type Article = {
  id: number;
  title: string;
  body: string;
  published: boolean;
  authorId: number;
  createdAt: object;
  updatedAt: object;
  author: User;
  comments: Comment[];
};
export type Comment = {
  id: number;
  content: string;
  articleId: number;
  userId: number;
};
export type Err = {
  error: Error;
  reset: () => void;
};
type Dialog = {
  open: boolean;
  setOpen: (v: boolean) => void;
  toggleDialog: () => void;
  item: Article | User | null | undefined | unknown;
  // استبدل any بنفس الأنواع المسموحة في item
  setItem?: (v?: unknown) => void;
};
