import { HumanMessage } from "langchain";
import {
  generateAgent,
  generateAgentWithResponseFormat,
} from "../utils/create-agent";
import z from "zod";

export async function structuredPrompt(question: string) {
  const system_prompt = `
You are a science fiction writer, create a space capital city at the users request.

Please keep to the below structure.

Name: The name of the capital city

Location: Where it is based

Vibe: 2-3 words to describe its vibe

Economy: Main industries

`;
  const agent = await generateAgent(system_prompt);
  const response = await agent.invoke({
    messages: [new HumanMessage(question)],
  });
  console.log(response.messages.at(-1)?.text);
}

export async function structuredOutputPrompt(question: string) {
  const system_prompt =
    "You are a science fiction writer, create a capital city at the users request.";
  // This definition can also be done in Json Schema
  const capitalInfo = z.object({
    name: z.string().describe("The name of the capital city"),
    location: z.string().describe("Where it is based"),
    vibe: z.string().describe("2-3 words to describe its vibe"),
    economy: z.string().describe("Main industries"),
  });

  const agent = await generateAgentWithResponseFormat(
    system_prompt,
    capitalInfo,
  );
  const response = await agent.invoke({
    messages: [new HumanMessage(question)],
  });
  console.log(response.structuredResponse);
}
