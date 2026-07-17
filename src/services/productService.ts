import type { Product } from "@/types";
import { apiFetch } from "./api";


export function getProducts(): Promise<Product[]> {
  return apiFetch<Product[]>("/products")
}

export function getCategories(): Promise<string[]> {
  return apiFetch<string[]>("/products/categories");
}


export function getProductsByCategory(category: string): Promise<Product[]> {
  return apiFetch<Product[]>(`/products/category/${category}`)
}

export function getProductById(id: number): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`);
}
