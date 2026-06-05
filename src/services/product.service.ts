import { authenticatedFetch } from "../lib/api";


export const createProduct = async (
  formData: FormData
) => {
  return authenticatedFetch(
    `${import.meta.env.VITE_API_BASE_URL}/products`,
    {
      method: "POST",
      body: formData,
    }
  );
};