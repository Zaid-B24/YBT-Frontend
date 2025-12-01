export const fetchEventCategoriesAPI = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/events/filters`
  );
  if (!response.ok) return { categories: [] }; // Fallback
  return response.json();
};

export const fetchEventsAPI = async ({ pageParam, filter }) => {
  const params = new URLSearchParams();
  if (pageParam) params.append("cursor", pageParam);
  params.append("limit", 10);
  if (filter === "past") {
    params.append("timeFilter", "past");
  } else if (filter === "upcoming" || filter === "all") {
    params.append("timeFilter", "upcoming");
  } else {
    params.append("category", filter);
    params.append("timeFilter", "upcoming");
  }

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/events/user?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
};
