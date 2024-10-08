import { Spotlight } from "@/app/components/spotlight";
import { UltraSmoothRoundedLongClock } from "./clock";
import Link from "next/link";
import ProjectLayout from "../project-layout";

const ClockPage = () => {
  return (
    <ProjectLayout title={"Clock"} date={"July 2024"}>
      <div className="relative bg-gray-2 w-full overflow-hidden h-[90dvh]  ">
        <Spotlight fill="var(--gray-6)" />
        <UltraSmoothRoundedLongClock />
      </div>
      <div className="container max-w-screen-sm px-6">
        <p className="mt-12  leading-relaxed">
          So I built this clock.
          <br /> It&apos;s a clock.
          <br /> It tells time.
          <br /> It&apos;s inspired by{" "}
          <a
            className="underline"
            href="https://www.unisonhome.com/braun-bc17-black-wall-clock.html"
          >
            the BC17
          </a>
          .
          <br /> <br />I like it.
          <br /> It&apos;s pretty cool.
          <br /> I like clocks. <br />
          Clocks are cool.
        </p>

        <div className="mt-24 text-gray-10 text-sm">
          Built with{` `}
          <a href="https://react.dev">React</a>
          {` `}
          and
          {` `}
          <a href="https://tailwindcss.com">Tailwind CSS</a>
          {` `}
        </div>
      </div>
    </ProjectLayout>
  );
};

export default ClockPage;
