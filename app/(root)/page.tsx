import Image from "next/image";
import SearchForm from "../components/SearchForm";
export default async function Home({searchParams}: {searchParams: {query: string}}) {
  const query = (await searchParams).query || "";
  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading">
          Pitch your startup, <br /> connect with entrepreneurs
        </h1>
        <p className="sub-heading">
          Join us to explore new opportunities and grow your network.
        </p>
        <SearchForm query={query}/>
      </section>
    </>
  );
}
