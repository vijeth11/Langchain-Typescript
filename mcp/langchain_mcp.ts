import { generateAgentWithShortTermMemory } from "../utils/create-agent";
import { getMathTools, getTimeTools, getTravelTools } from "./mcp_client";
import { createInterface } from "node:readline";
import { outputMessage } from "../utils/output-interface";
import { readUserInput } from "../utils/input-interface";
import { CreateInvokeAgent } from "../utils/invoke_agent";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "You: ",
});

export async function flightBookingAgent() {
  const config = { configurable: { thread_id: "flight_selection_1" } };
  // Example of creating an agent with tools from multiple servers
  const systemPrompt = `You are a helpful travel assistant that can help users with their travel plans. 
    You have access to tools that can help you with math calculations, getting the current time, and booking flights.
    Use the tools at your disposal to help the user with their travel needs.
    Ask the user for the necessary travel details such as origin, destination, and travel dates. 
    Then use the tools to provide best flight options and calculate the total cost convert the time to local time.
    `;
  const agent = await generateAgentWithShortTermMemory(systemPrompt, [
    // tools from math server
    ...(await getMathTools()),
    // tools from travel server
    ...(await getTravelTools()),
    // tools from time server
    ...(await getTimeTools()),
  ]);

  var invokeAgent = await CreateInvokeAgent(agent, config);

  var response = await invokeAgent(
    "Introduce yourself and tell what you can do",
  );

  outputMessage(response.messages.at(-1)!, rl);
  rl.prompt();

  readUserInput(rl, invokeAgent);

  rl.on("close", () => {
    console.log("Goodbye!");
    process.exit(0);
  });
}
