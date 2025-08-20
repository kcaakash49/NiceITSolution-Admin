import type { CreateHardwareProductSchema } from "@kcaakash/validators";
import axios from "axios";

export async function fetchCategories() {
  console.log("Request to fetch");
  const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ftth/get-categories`,{
    withCredentials: true
  });
  return data; // should be [{ id, name }]
}

export async function createProduct(product: CreateHardwareProductSchema) {
  const { data } = await axios.post("/api/hardware/products", product);
  return data;
}

export async function createCategory(category: { name: string, isLengthNeeded: boolean }) {
  
  const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ftth/add-category`, category, {
    withCredentials: true
  });
  return data;
}
