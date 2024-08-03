import { Car } from "lucide-react";
import { Card } from "./card";

const Labs = () => {
  return (
    <div className=" bg-gray-2 pt-12">
      <div className="sticky top-0 px-6 bg-gray-2 z-20 py-2">
        <h1 className="font-bold">Labs</h1>
      </div>
      <div className="lg:columns-3 sm:columns-2 gap-2 pt-12 p-2 min-h-full">
        <Card
          href="/labs/clock"
          title="Clock"
          date="July 2024"
          image="https://cdn.jcde.xyz/u/xqOmYO.png"
          dark
        />
        <Card
          href="/labs/audio"
          title="Audio Analyser"
          date="July 2024"
          image="https://cdn.jcde.xyz/u/QsUvnY.png"
          dark
        />
        <Card
          href="/labs/planner"
          title="Planner"
          date="July 2024"
          video="https://cdn.jcde.xyz/u/KzIgSK.mp4"
          dark
        />
      </div>
    </div>
  );
};

export default Labs;

export const metadata = {
  title: "Labs",
  description: "A collection of experiments and projects I've worked on.",
};
