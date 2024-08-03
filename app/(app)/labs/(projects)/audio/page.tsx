import dynamic from "next/dynamic";
import ProjectLayout from "../project-layout";

const AudioAnalyzer = dynamic(() => import("./analyser"), {
  ssr: false,
});
function App() {
  return (
    <ProjectLayout title="Audio Analyser " date="July 2024">
      <div className="relative pb-24 w-full  bg-black py-24">
        <div className="rounded-2xl mx-auto top-0 border border-gray-4 inset-x-0 p-6 w-[65rem] bg-gray-1 ">
          <AudioAnalyzer />
        </div>
      </div>
    </ProjectLayout>
  );
}

export default App;
