import Image from "next/image";
import {
  CurrentTime,
  UltraSmoothRoundedLongClock,
} from "./labs/(projects)/clock/clock";
import ScreenSize from "./size";
import Link from "next/link";
import { Spotlight } from "./components/spotlight";
import Credits from "./credits";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="p-8  mx-auto relative  h-dvh overflow-hidden w-full">
      <CurrentTime />
      {/* <UltraSmoothRoundedLongClock /> */}
      <ScreenSize />
      <Credits />
      <Spotlight fill="var(--gray-11)" />

      <div className="max-w-6xl m-auto mt-16 relative z-20">
        {" "}
        <div className="text-right  ">
          <h1 className=" font-medium  text-3xl text-gray-12 font-display ">
            Jeeho Ahn
          </h1>
          <p className="text-gray-10">i wanna be an engineer</p>
        </div>
        <div className="space-y-4 -ml-2 sm:mt-0 mt-12 ">
          <Link className=" w-fit px-2  group block " href="/labs">
            Labs{" "}
            {/* <ArrowRight
                   size={16}
            /> */}
            <span className="group-hover:translate-x-0 inline-block -translate-x-2 transition opacity-0 group-hover:opacity-100 group-hover:scale-105 ">
              {" "}
              
            </span>
          </Link>

          <Link className=" w-fit px-2 group  block " href="/projects">
            Projects{" "}
            <span className="group-hover:translate-x-0 inline-block -translate-x-2 transition opacity-0 group-hover:opacity-100 group-hover:scale-105 ">
              {" "}
              
            </span>
          </Link>

          <Link className=" w-fit px-2 group  block" href="/notes">
            Notes{" "}
            <span className="group-hover:translate-x-0 inline-block -translate-x-2 transition opacity-0 group-hover:opacity-100 group-hover:scale-105 ">
              {" "}
              
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
