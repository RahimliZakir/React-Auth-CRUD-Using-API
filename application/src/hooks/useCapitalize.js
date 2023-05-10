const useCapitalize = () => {
  return (content) => {
    if (content === null && content === "") return "";

    return `${content[0].toUpperCase()}${content.substr(1)}`;
  };
};

export { useCapitalize };
