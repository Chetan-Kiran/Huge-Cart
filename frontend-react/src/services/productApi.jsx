import axios from "axios";

const API = "http://localhost:8080/api/product";

// GET ALL PRODUCTS
export const getProducts = async () => {
  const response = await axios.get(API);
  return response.data;
};

// CREATE PRODUCT
export const createProduct = async (product) => {
  const response = await axios.post(API, product);
  return response.data;
};
