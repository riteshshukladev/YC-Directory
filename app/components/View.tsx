import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { after } from "next/server";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
// const {VIEW}
const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );
  return (
    <div className="view_container w-fit fixed right-5 bottom-5">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text bg-[#ffc6d8]">
        <span className="font-black">
          {typeof totalViews === "number"
            ? totalViews === 1
              ? "1 view"
              : `${totalViews} views`
            : "0 views"}
        </span>
      </p>
    </div>
  );
};

export default View;
