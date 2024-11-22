import React, { useLayoutEffect, useRef } from "react";
import "./PageLoader.css";

const PageLoader: React.FC = () => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const hideLoader = () => {
      if (loaderRef.current) {
        loaderRef.current.style.display = "none"; // Immediately hide the loader
      }
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader); // Directly add the listener
    }

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("load", hideLoader); // Use the same function reference
    };
  }, []);

  return (
    <div id="page-loader-wrapper" ref={loaderRef}>
      <h2 data-text="Dashboard" className="animated-text">
        Nile Auto catalogue
      </h2>
    </div>
  );
};

export default PageLoader;