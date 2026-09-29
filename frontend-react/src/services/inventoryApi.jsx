import axios from "./axiosConfig";

const BASE = "/api/inventory";

export const getInventory = async (skuCode) => {
  const response = await axios.get(`${BASE}/${skuCode}`);
  return response.data;
};

export const updateInventoryQuantity = async (skuCode, quantity) => {
  const response = await axios.post(`${BASE}/updateQuantity`, {
    skuCode,
    quantity,
  });

  return response.data;
};
