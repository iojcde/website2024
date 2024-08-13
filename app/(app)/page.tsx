import Image from "next/image";
import {
  CurrentTime,
  UltraSmoothRoundedLongClock,
} from "./labs/(projects)/clock/clock";
import ScreenSize from "./size";
import Link from "next/link";
import Credits from "./credits";

export default function Home() {
  return (
    <div className="p-8  mx-auto relative  h-dvh overflow-hidden w-full">
      <CurrentTime />
      {/* <UltraSmoothRoundedLongClock /> */}
      <ScreenSize />
      <Credits />

      <div className="max-w-6xl m-auto mt-16 relative z-20">
        {" "}
        <div className="text-right  ">
          <h1 className=" font-semibold text-2xl text-gray-12 font-display ">
            Jeeho Ahn
          </h1>
          <p className="text-gray-10">
            {/* Professional "works on my machine" investigator */}
            Professional digital firefighter
          </p>
        </div>
        <div className="space-y-4  -ml-2 sm:mt-0 mt-12  font-medium">
          <Link className=" w-fit px-2  group block text-gray-12 " href="/labs">
            Labs{" "}
            {/* <ArrowRight
                   size={16}
            /> */}
            <span className="group-hover:translate-x-0 inline-block -translate-x-2 transition opacity-0 group-hover:opacity-100 group-hover:scale-105 ">
              {" "}
              →
            </span>
          </Link>

          <Link
            className=" w-fit px-2 group  block text-gray-12"
            href="/projects"
          >
            Projects{" "}
            <span className="group-hover:translate-x-0 inline-block -translate-x-2 transition opacity-0 group-hover:opacity-100 group-hover:scale-105 ">
              {" "}
              →
            </span>
          </Link>

          <Link className=" w-fit px-2 group  block text-gray-12" href="/blog">
            Blog{" "}
            <span className="group-hover:translate-x-0 inline-block -translate-x-2 transition opacity-0 group-hover:opacity-100 group-hover:scale-105 ">
              {" "}
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Jeeho Ahn",
  description: "Jeeho Ahn's personal website",
};
