"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { plannit } from "./plannit";
import { Input } from "@/components/ui/input";

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
    <div className="container max-w-screen-sm rounded-xl bg-gray-1 p-6 border mx-auto">
      <h2 className="text-gray-11 font-medium">
        Input constraints for you daily plan
      </h2>
      <div className="prose dark:prose-invert">
        <div className="mt-4 text-gray-11  text-lg ">
          {constraints.map((c) => (
            <div key={c}>• {c}</div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Textarea
          value={input}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setConstraints([...constraints, input]);
              setInput("");
            }
          }}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-5 resize-none"
          placeholder="3 hours of study, 1 hour of exercise, and 1 hour of reading. "
        />
        <button
          onClick={() => {
            setConstraints([...constraints, input]);
            setInput("");
          }}
          className=" w-14 aspect-square rounded-full items-center flex justify-center bg-black   transition"
        >
          <Plus />
        </button>
      </div>
      <div className=" flex gap-2 max-w-fit mt-4 ml-auto text-sm  text-gray-11 items-baseline">
        <div className="w-full text-sm mr-2 text-gray-10"> Rest time</div>
        <Input
          type="number"
          className="w-16 mt-2"
          defaultValue={10}
          onChange={(e) => setRest(parseInt(e.target.value))}
        />{" "}
        mins
      </div>
      <div className="flex  justify-end mt-8">
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

      <div className="space-y-4">
        {schedules.map((s, i) => (
          <table key={i} className="prose dark:prose-invert ">
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
        ))}
      </div>
    </div>
  );
};
