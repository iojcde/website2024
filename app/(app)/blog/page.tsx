import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { Media } from "@/payload-types";
const payload = await getPayloadHMR({ config });

const NotesPage = async () => {
  const data = await payload.find({
    collection: "posts",
  });
  console.log(data);

  return (
    <div className=" pt-24 container max-w-screen-sm px-6">
      <div className=" text-2xl font-semibold">Blog</div>

      <div className=" flex flex-col gap-6   mt-12">
        {data.docs.map((doc) => {
          const publishedAt = new Date(
            doc.publishedAt as string
          ).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });

          return (
            <Link
              href={`/blog/${doc.slug}`}
              key={doc.id}
              className="sm:flex gap-4 no-underline outline-none focus:underline justify-between"
            >
              <div className="font-semibold text-lg">{doc.title}</div>
              <span className="text-right text-sm text-gray-11 whitespace-nowrap">
                {publishedAt}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NotesPage;
export const revalidate = 10;
