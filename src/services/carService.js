export const fetchCarsAPI = async (filters = {}) => {
  const params = new URLSearchParams();

  const paramMapping = {
    collectionType: "collectionType",
    brands: "brands",
    year: "registrationYear",
    stages: "stages",
    sortBy: "sortBy",
    designerId: "designerId",
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

  const apiUrl = `${process.env.REACT_APP_API_URL}/cars?${params.toString()}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Server responded with ${response.status}`);
  }

  return response.json();
};
