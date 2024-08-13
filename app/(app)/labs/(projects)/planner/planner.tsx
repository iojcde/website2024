"use client";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { plannit } from "./plannit";
import { Input } from "@/app/components/ui/input";

export const PlannerComponent = () => {
  const [constraints, setConstraints] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [rest, setRest] = useState(10);
  const [loading, setLoading] = useState(false);

  const [schedules, setSchedules] = useState<
    {
      items: {
        end: string;
        start: string;
        activity: string;
      }[];
    }[]
  >([]);

  return (
    <>
      {" "}
      <div className="container max-w-screen-sm rounded-xl bg-gray-1 p-6 border mx-auto">
        <h2 className="text-gray-11 font-medium text-sm">
          Input constraints for your daily plan
        </h2>
        <div className="prose dark:prose-invert prose-gray">
          <div className="mt-4 text-gray-11 p-2 border rounded-md">
            {constraints.map((c) => (
              <div key={c}>
                <span className="select-none">•{` `}</span>
                {c}
              </div>
            ))}
            {constraints.length == 0 && (
              <div className="text-gray-10 text-sm text-center py-2">
                No constraints yet
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <Textarea
            value={input}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setConstraints([...constraints, ...input.trim().split("\n")]);
                setInput("");
              }
            }}
            onChange={(e) => setInput(e.target.value)}
            className="border border-gray-6 resize-none"
            placeholder="3 hours of study, 1 hour of exercise, and 1 hour of reading. "
          />
          <button
            onClick={() => {
              setConstraints([...constraints, input]);
              setInput("");
            }}
            className=" w-14 aspect-square rounded-full items-center flex justify-center  border   transition"
          >
            <Plus />
          </button>
        </div>

        <div className="flex items-center w-full mt-8">
          <div className=" flex gap-2 w-full  justify-start  text-sm  text-gray-11 items-baseline">
            <div className="w-full text-sm max-w-fit mr-2 text-gray-10">
              {" "}
              Rest time
            </div>
            <Input
              type="number"
              className="w-16"
              defaultValue={10}
              onChange={(e) => setRest(parseInt(e.target.value))}
            />{" "}
            mins
          </div>
          <Button
            variant={"secondary"}
            className="hover:bg-red-500"
            onClick={() => {
              setConstraints([]);
            }}
          >
            Clear
          </Button>
          <Button
            onClick={async () => {
              setLoading(true);
              const currentTime = new Date();
              const date =
                currentTime.toDateString() +
                " " +
                currentTime.toLocaleTimeString();

              const output = await plannit({ constraints, date, rest });
              setLoading(false);

              setSchedules(output.schedules);
            }}
            className="ml-2"
            disabled={loading}
          >
            {loading && <Loader2 className=" animate-spin mr-2" size={14} />}
            {loading ? "Generating..." : "Generate"}
          </Button>
        </div>
      </div>
      <div className="mt-4 max-w-screen-sm mx-auto p-6 rounded-xl border bg-gray-1">
        <h3 className="text-gray-11">Output</h3>
        <div className="mt-4 space-y-6">
          {schedules.length == 0 && (
            <div className="text-gray-10 text-sm text-center py-2">
              No schedules generated yet
            </div>
          )}
          {schedules.map((s, i) => (
            <div key={i} className=" gap-4">
              <table className="prose dark:prose-invert prose-sm ">
                <thead>
                  <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Activity</th>
                  </tr>
                </thead>

                <tbody>
                  {s.items.map((item, i) => (
                    <tr key={i}>
                      <td>{item.start}</td>
                      <td>{item.end}</td>
                      <td>{item.activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
