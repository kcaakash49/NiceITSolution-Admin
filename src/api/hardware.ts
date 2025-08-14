import type { CreateHardwareProductSchema } from "@kcaakash/validators";
import axios from "axios";

export async function fetchCategories() {
  const { data } = await axios.get("/api/hardware/categories");
  return data; // should be [{ id, name }]
}

export async function createProduct(product: CreateHardwareProductSchema) {
  const { data } = await axios.post("/api/hardware/products", product);
  return data;
}

export async function createCategory(category: { name: string }) {
  const { data } = await axios.post("/api/hardware/categories", category);
  return data;
}
