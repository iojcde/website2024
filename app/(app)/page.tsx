import Image from "next/image";
import {
  CurrentTime,
  UltraSmoothRoundedLongClock,
} from "./labs/(projects)/clock/clock";
import ScreenSize from "./size";
import Link from "next/link";
import Credits from "./credits";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

export default function Home() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="tracking-[-0.01em] text-md font-semibold">Jeeho Ahn</h1>
        <div className="flex gap-4 items-center mt-1 ">
          <a className="p-1" href="https://github.com/iojcde">
            <GitHubLogoIcon />
          </a>

          <a className="p-1" href="https://twitter.com/iojcde">
            <TwitterLogoIcon />
          </a>

          <a className="p-1" href="https://instagram.com/iojcde">
            <InstagramLogoIcon />
          </a>
        </div>
      </div>

      <p className="mt-24 font-normal max-w-prose mx-auto text-pretty ">
        <span className=" font-serif italic">Crafting...</span>
        <br />
        <br />
        Hi! I&apos;m{` `}
        <Tooltip>
          <TooltipTrigger className="underline decoration-dotted decoration-gray-10  underline-offset-2">
            Jeeho
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              Pronounced as
              <span className="font-semibold"> Jee - Ho</span>
            </p>
          </TooltipContent>
        </Tooltip>
        , a designer and software engineer based in South Korea.
        <br />
        <br />
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
        <br /> I&apos;m familiar with TypeScript and Go, and am currently in the
        process of learning Rust. Currently, I&apos;m currently a student at
        Dankook University affiliated Software Highschool.
        <br />
        <br />
        Recently, I&apos;ve been working on hobby projects such as implementing
        the Raft consensus algorithm in Rust, and building{" "}
        <a href="https://github.com/iojcde/potatokv">
          a distributed key-value store
        </a>
        .
        <br />
        <br />
        Contact me at <a href="mailto:io@jcde.xyz">io@jcde.xyz</a>.
      </p>

      <ScreenSize />
      <CurrentTime />
    </div>
  );
}

export const metadata = {
  title: "Jeeho Ahn",
  description: "Jeeho Ahn's personal website",
};
