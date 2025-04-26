import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/app/components/View";

export const experimental__ppr = true;
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = await params;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, id);

  if (!post) {
    return notFound();
  }

  const md = new markdownit();
  const parsedContent = md.render(post?.pitch || "");
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag tag-tri bg-[#FBE843]">
          {formatDate(post?._createdAt)}
        </p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section_container">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              ></Image>
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium text-black/30">
                  @{post.author.username}
                </p>
              </div>
            </Link>
            <div className="category-tag">{post.category}</div>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className="prose max-w-4xl font-sans break-all"
            ></article>
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />
      </section>

      <section>
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id.id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
