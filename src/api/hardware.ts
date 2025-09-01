import type { CategorySchema, CreateHardwareProductSchema } from "@kcaakash/validators";
import axios from "axios";

export async function fetchCategories() {
  console.log("Request to fetch");
  const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ftth/get-categories`,{
    withCredentials: true
  });
  return data; // should be [{ id, name }]
}

export async function createProduct(product: CreateHardwareProductSchema) {
  const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ftth/add-product`, product, {
    withCredentials: true
  });
  return data;
}

export async function createCategory(category: CategorySchema) {
  
  const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ftth/add-category`, category, {
    withCredentials: true
  });
  return data;
}

export async function removeCategory(categoryId : {categoryId: string}) {
  const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ftth/delete-category`, categoryId, {
    withCredentials: true
  });

  return data;
}