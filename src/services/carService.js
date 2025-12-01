export const fetchFilterAPI = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/cars/filters`);
  if (!response.ok) throw new Error("Failed to fetch filters");
  return response.json();
};

export const fetchCarsAPI = async (filters = {}) => {
  const params = new URLSearchParams();

  const paramMapping = {
    collectionType: "collectionType",
    brand: "brands",
    brands: "brands",
    year: "registrationYear",
    stages: "stages",
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

  const apiUrl = `${process.env.REACT_APP_API_URL}/cars?${params.toString()}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Server responded with ${response.status}`);
  }

  return response.json();
};
