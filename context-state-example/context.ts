import z from "zod";
import { generateAgentWithContextState } from "../utils/create-agent";
import { HumanMessage, tool, ToolRuntime } from "langchain";
import { RunnableConfig } from "@langchain/core/runnables";

export const ContextStateSchema = z.object({
  name: z.string().describe("The user's name").default("User"),
  favoriteColor: z.string().describe("The user's favorite color").default("blue"),
});


export async function getMyFaviourateColor(){
    const config = {
      configurable: {
        context: {
          name: "John Doe", // Override default
          favoriteColor: "green", // Override default
        },
      },
    };
    const agent = await generateAgentWithContextState("You are a helpful assistant that remembers the user's name and favorite color.", [myFaviourateColor, myName], ContextStateSchema);
    const response1 = await agent.invoke({
        messages: [
            new HumanMessage("What is my name?"), 
            new HumanMessage("What is my favorite color?")
        ],
    }, config);
    for (let message of response1.messages) 
        console.log("[" + message.type + "]:- " + message.text + "\n"); // Should print "User" or the name provided in the context state
}


const myFaviourateColor = tool(
  async (_, config: RunnableConfig) => {
    // Access context directly from the config object
    console.log("Context received in tool:", config.configurable?.context);
    return config.configurable?.context?.favoriteColor || "unknown";
  },
  {
    name: "getMyFaviourateColor",
    description: "Get user's favorite color from context.",
    schema: z.object({}),
  },
);


const myName = tool(
    async (_, config: RunnableConfig) => {
        // Access context directly from the config object
        return config.configurable?.context?.name || "unknown";
    },
{
    name: "getMyName",  
    description: "A tool to get the user's name and favorite color from the context state.",
    schema: z.object({}).describe("No input required"),
});