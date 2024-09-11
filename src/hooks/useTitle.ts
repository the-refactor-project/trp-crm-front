import { useEffect } from "react";

const useTitle = (title: string) => {
  const baseTitle = "Dinereitor - TRP";

  useEffect(() => {
    document.title = title + " | " + baseTitle;
  }, [title]);
};

export default useTitle;
