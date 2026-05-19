export const formatDateRange = (startDateStr, endDateStr) => {
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const formattedStart = new Intl.DateTimeFormat("en-US", options).format(
    startDate,
  );

  if (endDateStr && startDate.toDateString() !== endDate.toDateString()) {
    const formattedEnd = new Intl.DateTimeFormat("en-US", options).format(
      endDate,
    );
    return `${formattedStart} - ${formattedEnd}`;
  }

  return formattedStart;
};
