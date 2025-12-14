export type Article = {
  id: string;
  userId?: number;
  title?: string;
  body?: string;
  publishedAt?: string;
};
export type Product = {
  _id: string;
  title: string;
  desc: string;
  price: number;
  inStock: boolean;
  quantity: number;
};
export type Err = {
  error: Error;
  reset: () => void;
};
export type Plan = {
  status: string;
  price: number;
};
