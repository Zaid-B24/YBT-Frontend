export const fetchEventCategoriesAPI = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/events/filters`
    );
    if (!response.ok) {
      // Maintain structure even on error
      return { success: false, data: { categories: [] } };
    }
    return response.json();
  } catch (error) {
    // Handle network errors (e.g., server offline)
    return { success: false, data: { categories: [] } };
  }
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

///Admin

export const fetchAdminEventsAPI = async ({ limit, sortBy, cursor }) => {
  const token = localStorage.getItem("adminToken");
  console.log("Admin token, ", token);
  const params = new URLSearchParams({ limit, sortBy });
  if (cursor) params.append("cursor", cursor);
  if (!token) throw new Error("No admin token found.");
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/events/admin?${params.toString()}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const updateEventStatusAPI = async ({ eventId, status }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/events/${eventId}/update-status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update event status.");
  }

  return response.json();
};

export const deleteEventAPI = async (eventId) => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("Authentication token not found.");

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/events/${eventId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete event.");
  }
  return { success: true };
};
