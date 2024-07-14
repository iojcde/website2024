import Image from "next/image";
import {
  CurrentTime,
  UltraSmoothRoundedLongClock,
} from "./labs/(projects)/clock/clock";
import ScreenSize from "./size";
import Link from "next/link";
import { Spotlight } from "./components/spotlight";
import Credits from "./credits";

export default function Home() {
  return (
    <div className="p-6  mx-auto relative  h-dvh overflow-hidden w-full">
      <CurrentTime />
      <UltraSmoothRoundedLongClock />
      <ScreenSize />
      <Credits />
      <Spotlight fill="var(--gray-10)" />

      <div className="max-w-6xl m-auto mt-16 relative z-20">
        {" "}
        <div className="text-right  ">
          <h1 className="font-semibold text-2xl text-gray-12">Jeeho Ahn</h1>
          <p className="text-gray-10">shikanoko nokonoko koshitantan</p>
        </div>
        <div className="space-y-4 -ml-2 ">
          <Link className="block w-fit px-2" href="/labs">
            Labs
          </Link>

          <Link className="block w-fit px-2" href="/projects">
            Projects
          </Link>

          <Link className="block w-fit px-2" href="/notes">
            Notes
          </Link>
        </div>
      </div>
    </div>
  );
}
