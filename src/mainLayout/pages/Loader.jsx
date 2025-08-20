import React from "react";
import { ClockLoader } from "react-spinners";

const Loader = ({ color = "#00fff5", size = 50, loading = true }) => {
  return (
    <div className="flex justify-center items-center h-64">
      <ClockLoader color={color} size={size} loading={loading} />
    </div>
  );
};

export default Loader;
