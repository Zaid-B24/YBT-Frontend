export const fetchBikeFilterAPI = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/bikes/filters`
  );
  if (!response.ok) throw new Error("Failed to fetch filters");
  return response.json();
};

export const fetchBikesAPI = async (filters = {}) => {
  const params = new URLSearchParams();

  const paramMapping = {
    brand: "brands",
    brands: "brands",
    year: "registrationYear",
    sortBy: "sortBy",
    designerId: "designerId",
    cursor: "cursor",
  };

  for (const key in filters) {
    const value = filters[key];

    if (key === "price" && value) {
      const [min, max] = value.toString().split("-");
      if (min) params.append("minPrice", min);
      if (max) params.append("maxPrice", max);
      continue;
    }
    const paramName = paramMapping[key];

    if (paramName && value !== undefined && value !== null && value !== "") {
      const formattedValue = Array.isArray(value) ? value.join(",") : value;
      params.append(paramName, formattedValue);
    }
  }

  const apiUrl = `${process.env.REACT_APP_API_URL}/bikes?${params.toString()}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Server responded with ${response.status}`);
  }

  return response.json();
};

export const searchBikesAPI = async (filters = {}) => {
  const params = new URLSearchParams();

  const paramMapping = {
    q: "q",
    sortBy: "sortBy",
    cursor: "cursor",
  };

  for (const key in filters) {
    const value = filters[key];
    const paramName = paramMapping[key];

    if (paramName && value !== undefined && value !== null && value !== "") {
      const formattedValue = Array.isArray(value) ? value.join(",") : value;
      params.append(paramName, formattedValue);
    }
  }

  // 2. Point specifically to the /search endpoint
  const apiUrl = `${
    process.env.REACT_APP_API_URL
  }/bikes/search?${params.toString()}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Search failed with status ${response.status}`);
  }

  return response.json();
};
