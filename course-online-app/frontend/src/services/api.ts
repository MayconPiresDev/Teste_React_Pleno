import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const createProduct = async (product: { title: string; brand: string }) => {
  const response = await axios.post(`${API_URL}/products`, product); // Remova o `/add` se não for necessário
  return response.data;
};