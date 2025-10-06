import api from "./api";

// Fetch SC Overview metrics (Quick Commerce) with optional filters via query params
export const getSCOverviewMetrics = async ({ sku = "", channel = "" } = {}) => {
  const response = await api.get("/supply-chain/quick-commerce/metrics", {
    params: { sku, channel },
  });
  return response.data;
};

export default {
  getSCOverviewMetrics,
};
