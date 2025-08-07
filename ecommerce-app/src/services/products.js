// services/products.js
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

// products.js
export async function getProducts() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

export async function getProductById(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}