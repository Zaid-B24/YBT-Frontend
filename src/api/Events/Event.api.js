import { apiClient } from "../client";

export const getEventFilter = async () => {
  try {
    const response = await apiClient.get("/events/filters");

    if (!response) {
      return { success: false, data: { categories: [] } };
    }
    return response;
  } catch (error) {
    return { success: false, data: { categories: [] } };
  }
};

export const getPublicEvents = async ({ pageParam, filter }) => {
  const params = {
    limit: 10,
  };
  if (pageParam) params.cursor = pageParam;

  if (filter === "past") {
    params.timeFilter = "past";
  } else if (filter === "upcoming" || filter === "all") {
    params.timeFilter = "upcoming";
  } else {
    params.category = filter;
    params.timeFilter = "upcoming";
  }

  const response = await apiClient.get("/events/user", { params });
  return {
    data: Array.isArray(response?.data) ? response.data : [],
    hasNextPage: response?.hasNextPage ?? false,
    nextCursor: response?.nextCursor ?? null,
  };
};

export const getEventBySlug = async (slug) => {
  const response = await apiClient.get(`/events/${slug}`);
  return response?.data || null;
};
