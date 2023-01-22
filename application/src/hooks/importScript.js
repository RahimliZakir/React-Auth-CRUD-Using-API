import { useEffect } from "react";

const useImportScript = (resourceUrl, show) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = resourceUrl;
    script.type = "text/javascript";
    script.async = true;

    Array.from(document.head.children).forEach((item) => {
      if (item.tagName === "SCRIPT" && item.src !== script.src) {
        document.head.append(script);
      }
    });

    // show
    //   ? document.head.appendChild(script)
    //   : Array.from(document.head.children).forEach((item) => {
    //       if (
    //         item !== undefined &&
    //         item.tagName === "SCRIPT" &&
    //         item.src === script.src
    //       ) {
    //         document.head.removeChild(item);
    //       }
    //     });
  }, [resourceUrl, show]);
};

export { useImportScript };
