import axios from "axios";
import axios from "./axiosConfig"
const API = `${import.meta.env.VITE_API_URL}/api/order`;

// POST Order (already used in Checkout)
export const placeOrder = async (order) => {
  const response = await axios.post(API, order);
  return response.data;
};

// GET All Orders (Admin Dashboard)
export const getAllOrders = async () => {
  const response = await axios.get(API);
  return response.data;
};
