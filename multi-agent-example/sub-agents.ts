import { HumanMessage, tool } from "langchain";
import { generateAgentWithTools } from "../utils/create-agent";
import { square } from "./tools";
import z from "zod";

const agent1 = generateAgentWithTools("You are an agent which only calculates the square of a number using given tools. If any other thing asked respond i do not know", [square]);
const agent2 = generateAgentWithTools("You are an agent which only calculates the square root of a number using given tools. If any other thing asked respond i do not know", [square]);

export const squareAgentExample = tool(
    async ({input}:{input: number}) => {
        const result = await agent1.invoke({
            messages: [
                new HumanMessage(`What is the square of ${input}?`),
            ],
        });
        return result.messages.at(-1)?.text || "No response";
    },
    {
        name: "squareAgentExample",
        description: "An agent that calculates the square of a number",
        schema: z.object({
            input: z.number().describe("The number to be squared")
        })
    }
)

export const squareRootAgentExample = tool(
    async ({input}:{input: number}) => {
        const result = await agent2.invoke({
            messages: [
                new HumanMessage(`What is the square root of ${input}?`),
            ],
        });
        return result.messages.at(-1)?.text || "No response";
    },
    {
        name: "squareRootAgentExample",
        description: "An agent that calculates the square root of a number",
        schema: z.object({
            input: z.number().describe("The number to find the square root of")
        })
    }
)