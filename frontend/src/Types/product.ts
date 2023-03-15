export interface CategoryType {
  id: number;
  name: string;
  image: string;
}

export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryType;
  images: string[];
}

export interface AddProductType {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface ModifyProductType {
  index?: number | undefined;
  update: ProductType;
}

export interface CartType extends ProductType {
  count: number;
}

export interface ProductUpdateType {
  id: number;
  price: number;
  title: string;
  description: string;
}

export interface ProductCreateType {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export type CreateCategoryType =
  | "Clothes"
  | "Electronics"
  | "Furniture"
  | "Shoes"
  | "Others";

export type ProductListType =
  | "All"
  | "Clothes"
  | "Electronics"
  | "Furniture"
  | "Shoes"
  | "Others";

export type SortType = "None" | "Lowest" | "Highest";
