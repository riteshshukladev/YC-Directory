import React from "react";
import { STARTUP_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import StartupCard from "./StartupCard";
const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUP_BY_AUTHOR_QUERY, { id });
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: any) => (
          <StartupCard key={startup._id} post={startup}></StartupCard>
        ))
      ) : (
        <p>No startups found.</p>
      )}
    </>
  );
};

export default UserStartups;
