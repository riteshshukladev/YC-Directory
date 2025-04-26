import React from "react";
import Ping from "./Ping";
const View = ({ id }: { id: string }) => {
  return (
    <div className="view_container w-fit fixed right-5 bottom-5">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text bg-[#ffc6d8]">
        <span className="font-black">100views</span>
      </p>
    </div>
  );
};

export default View;
