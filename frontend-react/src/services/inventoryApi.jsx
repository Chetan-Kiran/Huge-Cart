import axios from "axios";

const BASE = "http://localhost:8080/api/inventory";

// GET INVENTORY BY SKU
export const getInventory = async (skuCode) => {
  const response = await axios.get(`${BASE}/${skuCode}`);
  return response.data;
};

// UPDATE INVENTORY QUANTITY
export const updateInventoryQuantity = async (skuCode, quantity) => {
  const response = await axios.post(`${BASE}/updateQuantity`, {
    skuCode,
    quantity,
  });

  return response.data;
};
