import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ProjectLayout from "../project-layout";
import { PlannerComponent } from "./planner";
import { AlertCircle } from "lucide-react";

const Planner = () => {
  return (
    <ProjectLayout title="Planner" date="July 2024">
      <div className="bg-gray-2 py-24 border-y">
        <div className="max-w-screen-sm mx-auto mb-2">
          {/* <Alert className="bg-gray-1">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription className="text-gray-11">
              This is not a live demo. It won&apos;t generate any schedules for
              you.
            </AlertDescription>
          </Alert> */}
        </div>
        <PlannerComponent />
      </div>{" "}
    </ProjectLayout>
  );
};

export default Planner;
