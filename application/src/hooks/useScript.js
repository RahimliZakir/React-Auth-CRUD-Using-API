import { useEffect } from "react";

const useScript = (url) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.type = "text/babel";
    document.body.append(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export { useScript };
