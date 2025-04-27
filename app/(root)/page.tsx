import Image from "next/image";
import SearchForm from "../components/SearchForm";
import StartupCard from "../components/StartupCard";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { StartupTypeCard } from "../components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
export default async function Home({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const query = (await searchParams).query || "";
  const params = { search: query || null };

  const session = await auth();
  console.log(session?.id);

  const { data: posts } = await sanityFetch({ query: STARTUP_QUERY, params });

  type StartupCardType = {
    _createdAt: string;
    _id: string;
    views: number;
    author: { _id: number };
    description: string;
    category: string;
    image: string;
    title: string;
  };

  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading">
          Pitch your startup, <br /> connect with entrepreneurs
        </h1>
        <p className="sub-heading">
          Join us to explore new opportunities and grow your network.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p>No startups found.</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
