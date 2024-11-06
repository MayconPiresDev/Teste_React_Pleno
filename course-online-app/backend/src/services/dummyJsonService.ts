import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products';

export const listProducts = async (page: number, limit: number) => {
  const response = await axios.get(`${BASE_URL}?limit=${limit}&skip=${(page - 1) * limit}`);
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createProduct = async (data: Record<string, any>) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateProduct = async (id: string, data: Record<string, any>) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteProductById = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
