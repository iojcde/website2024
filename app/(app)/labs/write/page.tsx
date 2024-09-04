"use client";
import ProjectLayout from "../(projects)/project-layout";
import { AutocompleteTextbox } from "react-ghost-text";
import { Textarea } from "@/app/components/ui/textarea";
import { experimental_useObject as useObject } from "ai/react";
import Markdown from "react-markdown";
import { useCallback, useState, useEffect } from "react";

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const Brainstorm = () => {
  const [input, setInput] = useState("");

  const { object: improvedObject, submit: improveit } = useObject({
    api: "/api/write/improve",
    schema: improveSchema,
  });

  const { object: suggestedCompletionsObject, submit: brainstormit } =
    useObject({
      api: "/api/write/suggest",
      schema: suggestSchema,
    });

  useEffect(() => {
    // Load saved input from localStorage when component mounts
    const savedInput = localStorage.getItem("brainstormInput");
    if (savedInput) {
      setInput(savedInput);
      cloudmaker(savedInput);
    }
  }, []);

  const cloudmaker = useCallback(
    debounce(async (input) => {
      brainstormit({ input });
    }, 1000),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = e.target.value;
    setInput(newInput);
    localStorage.setItem("brainstormInput", newInput); // Save to localStorage
    cloudmaker(newInput);
  };

  return (
    <ProjectLayout title="Write" date="August 2024">
      <div className="container gap-8 flex max-w-screen-xl w-full">
        <div className="max-w-3xl w-full">
          <h2 className="font-bold">Write</h2>
          <Textarea
            className="h-96 mt-2"
            onChange={handleInputChange}
            value={input}
          />
          <div>
            <div className="stats mt-4 text-gray-11 font-mono text-xs">
              {input.length} characters
            </div>
          </div>
        </div>

        <div className="max-w-md w-full">
          <h2 className="font-bold ">Suggestions</h2>
          <ul className="space-y-2 mt-2 text-gray-11 text-sm">
            {suggestedCompletionsObject?.suggestedCompletions?.map(
              (suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="flex mt-12 gap-8 container max-w-screen-xl min-h-48">
        <Button
          onClick={async () => {
            improveit({ input });
          }}
          className="mt-4"
        >
          Improve it!
        </Button>

        <div>
          <h2>Improvements</h2>

          <ul className="text-xs flex gap-4 overflow-x-scroll max-w-screen-xl border rounded-lg p-4 w-full">
            {improvedObject?.improvements?.map(
              ({ original, improvement, description, i }: any) => (
                <li key={i} className="min-w-48">
                  <p className="mb-2 font-semibold">{description}</p>
                  <Markdown className="  prose-sm text-xs">
                    {improvement}
                  </Markdown>
                  &uarr;
                  <div className="text-gray-11">{original}</div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="max-w-screen-xl mt-12 container">
        <h2 className="font-bold">Translator</h2>
        <Translator />
      </div>

      <div className="max-w-screen-xl mt-12 container">
        <h2 className="font-bold">Chat</h2>

        <Chat />
      </div>
    </ProjectLayout>
  );
};

export default Brainstorm;

const Translator = () => {
  const { object, submit: translateit } = useObject({
    api: "/api/write/translate",
    schema: translateSchema,
  });

  const translate = useCallback(
    debounce(async (input, lang) => {
      translateit({
        input,
        lang,
      });
    }, 1000),
    []
  );

  return (
    <div className="flex  gap-8">
      <Textarea
        className="h-48 w-full mt-2"
        onChange={async (e) => {
          translate(e.target.value, "korean");
        }}
      />
      <div className="w-full">
        <h2 className="font-bold">Output</h2>
        <div>{object?.output}</div>
      </div>
    </div>
  );
};

import { useChat } from "ai/react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { readStreamableValue } from "ai/rsc";
import { improveSchema } from "@/app/api/write/improve/schema";
import { suggestSchema } from "@/app/api/write/suggest/schema";
import { translateSchema } from "@/app/api/write/translate/schema";

function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    keepLastMessageOnError: true,
  });

  return (
    <>
      <div className="h-96 relative overflow-auto rounded-lg border  p-4">
        {messages.map((message) => (
          <div className="flex gap-2 mt-2" key={message.id}>
            <div className="w-12">
              {message.role === "user" ? "User: " : "AI: "}{" "}
            </div>
            <Markdown className={"prose prose-sm"}>{message.content}</Markdown>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className=" flex gap-8 inset-x-0 bottom-2">
        <Input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
