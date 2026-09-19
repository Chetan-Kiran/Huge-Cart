import axios from "./axiosConfig";

const API = "/api/order";

// PLACE ORDER
export const placeOrder = async (order) => {
  const response = await axios.post(API, order);
  return response.data;
};

// GET ALL ORDERS
export const getAllOrders = async () => {
  const response = await axios.get(API);
  return response.data;
};
