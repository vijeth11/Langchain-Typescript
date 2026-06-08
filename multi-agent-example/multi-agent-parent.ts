import { generateAgentWithTools } from "../utils/create-agent";
import { squareAgentExample, squareRootAgentExample } from "./sub-agents";

const agent  = generateAgentWithTools("You are math agent which only calculates the square and square root of a number using given tools. If any other thing asked respond i do not know", [squareAgentExample, squareRootAgentExample]);

export async function multiAgentExample() {
    const result1 = await agent.invoke({
        messages: [
            {
                role: "user",
                content: "What is the square of 5?",
            },
        ],
    });
    console.log("Square Agent Response:", result1.messages.at(-1)?.text);

    const result2 = await agent.invoke({
        messages: [
            {
                role: "user",
                content: "What is the square root of 25?",
            },
        ],
    });
    console.log("Square Root Agent Response:", result2.messages.at(-1)?.text);
}