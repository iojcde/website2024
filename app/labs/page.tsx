import { Card } from "./card";

const Labs = () => {
  return (
    <div className="p-4">
      <div className="lg:columns-3">
        <Card
          href="/labs/clock"
          title="Clock"
          date="July 2024"
          image="https://cdn.jcde.xyz/u/Bj9aZV.png"
        />
        <Card
          href="/labs/audio"
          title="Audio Analyser"
          date="July 2024"
          image="https://cdn.jcde.xyz/u/QsUvnY.png"
        />
      </div>
    </div>
  );
};

export default Labs;
