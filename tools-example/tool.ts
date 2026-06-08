import { HumanMessage, tool } from "langchain";
import { generateAgentWithTools } from "../utils/create-agent";
import z from "zod";
import { tavily } from "@tavily/core";
import { env } from "node:process";

export async function searchTheWeb(question: string) {
  let system_prompt = `You are a helpful assistant that can search the web to answer questions. Use the provided search tool to find information on the web and answer the user's question.`;
  const agent = await generateAgentWithTools(system_prompt, [websearchTool]);

  const response = await agent.invoke({
    messages: [new HumanMessage(question)],
  });

  for (let message of response.messages) {
    console.log("[" + message.type + "]:- " + message.text + "\n");
  }
}

const websearchTool = tool(
  async (search: string) => {
    // Here you would implement the actual web search logic, for example by calling a search API.
    // It has 1000 credits per month, and 1 search costs 1 credit, so use it wisely.
    const client = tavily({ apiKey: env.TAVILY_API_KEY! });
    const response = await client.search(search);
    return response;
  },
  {
    name: "websearch",
    description:
      "A tool to search the web for information. Use this tool to find information on the web to answer the user's question.",
    schema: z
      .string()
      .describe("The search query to find information on the web."),
  },
);
