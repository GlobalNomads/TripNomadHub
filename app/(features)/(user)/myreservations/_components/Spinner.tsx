import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary-green-300"></div>
    </div>
  );
};

export default Spinner;
