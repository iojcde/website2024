import type { Metadata } from "next";

import { RelatedPosts } from "@/app/blocks/RelatedPosts";
import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { draftMode, headers } from "next/headers";
import React, { cache } from "react";
import RichText from "@/app/components/RichText";

import type { Post } from "../../../../payload-types";

import { PostHero } from "@/app/components/PostHero";
import { formatDateTime, generateMeta } from "@/lib/utils";
// import PageClient from "./page.client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise });
  const posts = await payload.find({
    collection: "posts",
    draft: false,
    limit: 1000,
    overrideAccess: false,
  });

  return posts.docs?.map(({ slug }) => slug);
}

export default async function Post({ params: { slug = "" } }) {
  const url = "/posts/" + slug;
  const post = await queryPostBySlug({ slug });

  if (!post) return notFound();

  const l = post.content;

  const titles = l.root.children
    .filter((node) => {
      return (
        node.type == "heading" &&
        (node.tag == "h1" || node.tag == "h2" || node.tag == "h3")
      );
    })
    .map((n) => (n.children as any)[0].text);

  return (
    <article className="pt-28 pb-16">
      {/* <div className="fixed inset-x-0 h-20 top-0 z-10 bg-gradient-to-b from-gray-1 to-transparent pointer-events-none backdrop-blur-[1px] [mask-image:linear-gradient(to_bottom,var(--gray-12)_25%,transparent)]"></div> */}
      <div className="fixed inset-x-0 h-20 bottom-0 z-10 bg-gradient-to-t from-gray-1 to-transparent pointer-events-none backdrop-blur-[1px] [mask-image:linear-gradient(to_top,var(--gray-12)_25%,transparent)]"></div>

      <div className="container relative max-w-screen-xl">
        <div className="sm:absolute lg:fixed  translate-x-0 px-6">
          <Link
            href="/blog"
            className="hover:text-gray-12 transition flex text-gray-11 items-center gap-1  text-sm no-underline  mb-4"
          >
            {" "}
            <svg
              width="18px"
              height="18px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              color="currentColor"
            >
              <path
                d="M10.25 4.75l-3.5 3.5 3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M6.75 8.25h6a4 4 0 014 4v7"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            Blog{" "}
          </Link>

          <div className="sm:flex hidden flex-col gap-3 text-gray-11 text-xs mt-16">
            {titles.map((title) => (
              <a href={`#${title}`} key={title}>
                {title}
              </a>
            ))}
          </div>
        </div>
        <div className="container max-w-screen-sm px-6 pb-12">
          <h1 className=" text-xl font-semibold">{post.title}</h1>
          <span className="text-sm text-gray-10 ">
            {new Date(post.publishedAt as string).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>

          <RichText
            // className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[1fr]"
            className="w-full mt-12"
            content={post.content}
            enableGutter={false}
          />
        </div>
      </div>

      <RelatedPosts
        className="mt-12"
        docs={post.relatedPosts?.filter((post) => typeof post === "object")}
      />
    </article>
  );
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: any };
}): Promise<Metadata> {
  const post = await queryPostBySlug({ slug });

  return generateMeta({ doc: post });
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode();

  const payload = await getPayloadHMR({ config: configPromise });

  const result = await payload.find({
    collection: "posts",
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});

export const revalidate = 10;
