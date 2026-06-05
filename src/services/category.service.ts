import { authenticatedFetch } from "../lib/api";


export const getCategories = async () => {
  return authenticatedFetch(
    `${import.meta.env.VITE_API_BASE_URL}/categories`
  );
};

export const getCategoriesRoot = async () => {
  return authenticatedFetch(
    `${import.meta.env.VITE_API_BASE_URL}/categories/with-subcategories`
  );
};

export const createCategory = async (
  formData: FormData
) => {
  return authenticatedFetch(
    `${import.meta.env.VITE_API_BASE_URL}/categories`,
    {
      method: "POST",
      body: formData,
    }
  );
};