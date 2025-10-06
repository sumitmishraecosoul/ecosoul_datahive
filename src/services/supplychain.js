import api from "./api";

// Fetch SC Overview metrics (Quick Commerce) with optional filters via query params
export const getSCOverviewMetrics = async ({ sku = "", channel = "" } = {}) => {
  const response = await api.get("/supply-chain/quick-commerce/metrics", {
    params: { sku, channel },
  });
  return response.data;
};

export const getQuickCommerceMetrics = async ({ sku = "", channel = "" } = {}) => {
  const response = await api.get("/supply-chain/quick-commerce/metric-card-data", {
    params: { sku, channel },
  });
  return response.data;
};

export const getQuickCommerceData = async ({ sku = ""} = {}) => {
  const response = await api.get("/supply-chain/quick-commerce/data", {
    params: {sku},
  });
  return response.data;
};

export default {
  getSCOverviewMetrics,
  getQuickCommerceMetrics,
  getQuickCommerceData,
};
