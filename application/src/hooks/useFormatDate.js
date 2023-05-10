export const useFormatDate = () => {
  const formatDate = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (dateStr) => {
    if (dateStr === "" || dateStr == null) return "";

    const createdDate = new Date(dateStr);

    return `${formatDate(createdDate.getDate())}.${formatDate(
      createdDate.getMonth() + 1
    )}.${createdDate.getFullYear()} ${formatDate(
      createdDate.getHours()
    )}:${formatDate(createdDate.getMinutes())}:${formatDate(
      createdDate.getSeconds()
    )}`;
  };
};
