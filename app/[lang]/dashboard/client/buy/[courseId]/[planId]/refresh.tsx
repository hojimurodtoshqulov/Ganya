"use client";
import { FC, useEffect } from "react";

let count = 0;
const Refresh: FC = (): JSX.Element => {
  count++;
  console.log(`refresh page: ${count}`);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        window.location.reload();
      }
    };

    const handlePopState = () => {
      window.location.reload();
    };

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("popstate", handlePopState);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("popstate", handlePopState);
    };
  });
  return <div className="hidden">Refresh page for every page change</div>;
};

export default Refresh;
