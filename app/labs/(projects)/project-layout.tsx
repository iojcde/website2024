import Link from "next/link";

const ProjectLayout: React.FC<{
  title: string;
  date: string;
  children: React.ReactNode;
}> = ({ children, title, date }) => {
  return (
    <div>
      <div className=" w-full lg:py-24 py-12">
        <div className="max-w-screen-xl mx-auto relative px-6">
          <Link
            href="/labs"
            className="lg:absolute hover:text-gray-12 transition flex text-gray-11 items-center gap-1  text-sm no-underline left-4 top-0 mb-4"
          >
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
            Labs{" "}
          </Link>
          <div className="container max-w-screen-sm mt-4 pb-12">
            <h1 className="text-white text-2xl font-medium">{title}</h1>
            <span className="text-sm text-gray-10 ">{date}</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
export default ProjectLayout;
