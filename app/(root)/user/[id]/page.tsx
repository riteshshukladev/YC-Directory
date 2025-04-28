import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import UserStartups from "@/app/components/UserStartups";
import {
  AUTHOR_BY_GITHUB_ID_QUERY,
  AUTHOR_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { StartupCardSkeleton } from "@/app/components/StartupCard";

const page = async ({ params }: { params: Promise<{ id: any }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) return notFound();
  return (
    <>
      <section className="profile_container">
        <div className="profile_card bg-[#ee2b69]">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>
          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
          />
          <p className="text-30-extrabold mt-7 text-center">{user?.username}</p>
          <p className="mt-1 text-14-normal text-center">{user?.bio}</p>
        </div>
        <div className="flex-1 flex flex-col gap-5 lg:mt-5">
          <p className="text-30-bold">
            {session?.id === id ? "Your startups" : `all startups`}
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
