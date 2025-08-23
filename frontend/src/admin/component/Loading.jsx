import React from "react";
import { Atom } from "react-loading-indicators";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      <Atom color="#000000" size="medium" text="" textColor="" />
    </div>
  );
};

export default Loading;
