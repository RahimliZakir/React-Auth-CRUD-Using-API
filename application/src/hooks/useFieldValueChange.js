import { useState } from "react";

export const useFieldValueChange = (formik) => {
  const [hasChanged, setHasChanged] = useState({});

  const handleFieldValueChange = (fieldName, e) => {
    setHasChanged({ ...hasChanged, [fieldName]: true });
    formik.handleChange(fieldName)(e.target.value);
  };

  return [handleFieldValueChange, hasChanged];
};
