export const capitalize = (content) => {
  if (content !== null && content !== "")
    return `${content[0].toUpperCase()}${content.substr(1)}`;

  return "";
};
