import ProjectLayout from "../project-layout";
import { PlannerComponent } from "./planner";

const Planner = () => {
  return (
    <ProjectLayout title="Planner" date="July 2024">
      <div className="bg-gray-2 py-4">
        <PlannerComponent />
      </div>{" "}
    </ProjectLayout>
  );
};

export default Planner;
