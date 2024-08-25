import React from "react";

const Spinner: React.FC = () => {
  return (
    <div
      className="border-primary h-12 w-12 rounded-full border-4 border-t-transparent"
      style={{
        animation: "spin 0.5s linear infinite",
      }}
    ></div>
  );
};

export default Spinner;
