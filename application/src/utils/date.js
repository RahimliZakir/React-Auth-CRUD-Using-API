const formatDate = (dateStr) => {
  if (dateStr === "" || dateStr === null) return "";

  return new Date(dateStr).toLocaleString();
};

export { formatDate };
