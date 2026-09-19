import axios from "./axiosConfig";

const API = "/api/inventory";

export const getInventory = async (skuCode) => {
  const response = await axios.get(`${API}/${skuCode}`);
  return response.data;
};

export const updateInventoryQuantity = async (skuCode, quantity) => {
  const response = await axios.post(`${API}/updateQuantity`, {
    skuCode,
    quantity,
  });
  return response.data;
};
