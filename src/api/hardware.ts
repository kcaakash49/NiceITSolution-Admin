import type { CreateHardwareProductSchema } from "@kcaakash/validators";
import axios from "axios";



//getting Categories
export async function fetchCategories() {
  console.log("Request to fetch");
  const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ftth/get-categories`,{
    withCredentials: true
  });
  return data; // should be [{ id, name }]
}

//adding Product
export async function createProduct(product: CreateHardwareProductSchema) {
  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ftth/add-product`, product, {
    withCredentials: true
  });
  console.log("Resposne", response);
  return response?.data;
}

//adding Category
export async function createCategory(category: FormData) {
  const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ftth/add-category`, category, {
    withCredentials: true,
    headers: {
      "Content-Type" : "multipart/form-data"
    }
  });
  return data;
}

export async function removeCategory(categoryId : {categoryId: string}) {
  const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ftth/delete-category`, categoryId, {
    withCredentials: true
  });

  return data;
}