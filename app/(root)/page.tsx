import Image from "next/image";
import SearchForm from "../components/SearchForm";
import StartupCard from "../components/StartupCard";
import { auth } from "@/auth";
export default async function Home({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const query = (await searchParams).query || "";

  const posts = [
    {
      _createdAt: new Date(),
      _id: "1",
      views: 100,
      author: { _id: 1, name: "John Doe" },
      description: "A brief description of the startup.",
      category: "Technology",
      image:
        "https://plus.unsplash.com/premium_photo-1740193654717-fb995d3d6d15?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "We robots",
    },
  ];

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
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p>No startups found.</p>
          )}
        </ul>
      </section>
    </>
  );
}
