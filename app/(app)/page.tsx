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
    <div>
      <div className="p-8  mx-auto sticky top-0   h-dvh overflow-hidden w-full">
        <CurrentTime />
        {/* <UltraSmoothRoundedLongClock /> */}
        <ScreenSize />
        <Credits />

        <div className="max-w-6xl m-auto mt-16 relative z-30">
          {" "}
          <div className="text-right  ">
            <h1 className=" font-semibold text-2xl text-gray-12 font-dispxlay ">
              Jeeho Ahn
            </h1>
            <p className="text-gray-10 ">distributed systems enjoyer</p>
          </div>
          <div className="space-y-4 z-50 relative -ml-2 sm:mt-0 mt-12  font-medium">
            <Link
              className=" w-fit px-2  group block text-gray-12 "
              href="/labs"
            >
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

            <Link
              className=" w-fit px-2 group  block text-gray-12"
              href="/blog"
            >
              Blog{" "}
              <span className="group-hover:translate-x-0 inline-block -translate-x-2 transition opacity-0 group-hover:opacity-100 group-hover:scale-105 ">
                {" "}
                →
              </span>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 sm:pt-0 pt-32 flex flex-col items-center z-0 justify-center"></div>
      </div>
      <div className="bg-black h-[300vh] p-24  selection:text-black  z-10 relative w-full text-white ">
        <div className="text-4xl font-bold">
          <div>Hello!</div>
          <p className="mt-24">I&apos;m Jeeho Ahn.</p>
          <p className="mt-8 text-3xl">
            I&apos;m interested in distributed systems,
            <br />
            programming languages, and web development.
          </p>
        </div>

        <p className="mt-24 font-normal max-w-prose  text-pretty">
          I&apos;ve worked on various open source projects such as
          {` `}
          <a target="_blank" href="https://github.com/partykit/partykit">
            PartyKit
          </a>
          ,{` `}
          <a target="_blank" href="https://github.com/liveduo/destack">
            {" "}
            Destack
          </a>
          , and more.
          <br /> I&apos;m familiar with TypeScript and Go, and am currently in
          the process of learning Rust. Currently, I&apos;m currently a student
          at Dankook University affiliated Software Highschool.
          <br />
          <br />
          Recently, I&apos;ve been working on hobby projects such as
          implementing the Raft consensus in Rust, and building a distributed
          key-value store.
        </p>

        <p className="mt-12">
          I also enjoy designing and building websites. This website was built
          with Next.js and{" "}
          <a target="_blank" href="https://payloadcms.com">
            PayloadCMS
          </a>
          .
        </p>

        <p className="mt-24">
          <a href="mailto:io@jcde.xyz" className="underline">
            Contact me
          </a>
        </p>

        <p className="mt-12">Jeeho Ahn</p>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Jeeho Ahn",
  description: "Jeeho Ahn's personal website",
};
