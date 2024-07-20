import { Car } from "lucide-react";
import { Card } from "./card";

const Labs = () => {
  return (
    <div className="p-4">
      <div className="lg:columns-3 sm:columns-2 columns-1">
        <Card
          href="/labs/clock"
          title="Clock"
          date="July 2024"
          image="https://cdn.jcde.xyz/u/xqOmYO.png"
        />
        <Card
          href="/labs/audio"
          title="Audio Analyser"
          date="July 2024"
          image="https://cdn.jcde.xyz/u/QsUvnY.png"
        />
        <Card
          href="/labs/planner"
          title="Planner"
          date="July 2024"
          video="https://cdn.jcde.xyz/u/rMemdM.mp4"
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
