import Image from "next/image";
import UltraSmoothLongSecondsHand, { CurrentTime } from "./clock";
import ScreenSize from "./size";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6 max-w-6xl mx-auto mt-16 w-full">
      <CurrentTime />
      <UltraSmoothLongSecondsHand />
      <ScreenSize />

      <div className="text-right  ">
        <h1 className="font-semibold text-2xl text-gray-12">Jeeho Ahn</h1>
        <p>i think i like engineering</p>
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
  );
}
