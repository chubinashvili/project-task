import { useState, useEffect } from "react";

interface UseMobileWidthProps {
  width: number;
}

const getWidth = (): number => {
  if (typeof window !== "undefined") {
    return (
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    );
  }
  return 0;
};

export const useMobileWidth = (): UseMobileWidthProps => {
  let [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1000,
  );

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const resizeListener = () => {
      clearTimeout(timeoutId!);

      timeoutId = setTimeout(() => setWidth(getWidth()), 150);
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", resizeListener);
      }
    };
  }, []);

  return { width };
};
