import api from "./api";

export const getInventoryMetrics = async () => {
  const response = await api.get("/inventory/metrics");
  return response.data;
};

export const getBarGraphData = async () => {
  const response = await api.get("/inventory/optimization-bars");
  return response.data;
};

export default {
  getInventoryMetrics,
  getBarGraphData,
};

