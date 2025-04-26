import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
// const {VIEW}
const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  return (
    <div className="view_container w-fit fixed right-5 bottom-5">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text bg-[#ffc6d8]">
        <span className="font-black">
          {totalViews.length > 1 ? `${totalViews} views` : `${totalViews} view`}
        </span>
      </p>
    </div>
  );
};

export default View;
