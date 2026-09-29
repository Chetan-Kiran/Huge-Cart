import axios from "./axiosConfig";

const API = "/api/order";

export const placeOrder = async (order) => {
  const response = await axios.post(API, order);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await axios.get(API);
  return response.data;
};
