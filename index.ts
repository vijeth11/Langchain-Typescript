import { simpleChatWithAgent } from "./sample_chat/chat";
import { AIMessage, createAgent, HumanMessage, initChatModel, ToolMessage } from "langchain";
import { fewShotPrompt } from "./few-shot-example/few-shot-prompt";
import { structuredOutputPrompt, structuredPrompt } from "./structured-response/structured-prompt";
import { searchTheWeb } from "./tools-example/tool";
import { shortMemoryExample } from "./memory-example/short-memory";
import { flightBookingAgent } from "./mcp/langchain_mcp";

// loads environment variables from .env file
import * as dotenv from "dotenv";
import { getMyFaviourateColor } from "./context-state-example/context";
import { setMyFaviourateColor } from "./context-state-example/update-state";
import { multiAgentExample } from "./multi-agent-example/multi-agent-parent";
import { summariseMessagesAgent } from "./middleware-example/summarise";
import { removeToolMessageAgent } from "./middleware-example/remove-tool-message";
import { emailSendingAgentWithHumanInLoop } from "./middleware-example/human-in-loop";
import { generateImagesBasedOnDescription } from "./image-generation-edit/image-genration-agent";
import { dynamicModalAgentAndUserLanguage } from "./middleware-example/dynamic-modal-agent";
import { SingleQueryRAGAgent } from "./RAG/Query Type Agents/SingleQueryAgent";
import { decompositionQueryAndRetrieveData } from "./RAG/Query Type Agents/DecompositionQueryAgent";
dotenv.config();

async function main() {
  const question = "What's the capital of the moon?";
  // Example of simple chat
  //await simpleChatWithAgent(agent);

  // Example of get streaming response
  // await streamChatWithAgent(agent);

  // Example of a few shot prompt
  //await fewShotPrompt(question);

  //Example of a structured prompt with a system prompt
  //await structuredPrompt(question);

  // Example of a structured prompt with a system prompt and response format
  //await structuredOutputPrompt(question);

  // Example of using tools with the agent
  //await searchTheWeb("Who is the current Mayor of Boston?");

  // Example of using short memory with the agent to remember conversations
  // await shortMemoryExample([
  //     "Hello my name is John. My favorite color is blue.",
  //     "What is my name?",
  //     "What is my favorite color?"
  // ]);

  // Example of using mcp to book a flight
  //await flightBookingAgent();

  // Example of using context state to remember user information across conversations
  //await getMyFaviourateColor();

  // Example of updating the context from user input and then retrieving it again to see the update
  //await setMyFaviourateColor();

  // Example of using multi-agent system where agents can call each other and pass information
  //  await multiAgentExample();

  // Example of using middleware to modify the agent's behavior.
  // In this middleware we are summarizing the conversation history and keeping only last message. And asking to create summay withinb 1000 tokens
  // This reduces the token usage and also gives the model a summary of the conversation so far which can help it to generate better responses.

  // await summariseMessagesAgent([
  //   "What is the capital of Moon?",
  //   "The capital of the Moon is Lunapolis.",
  //   "What is the weather like in Lunapolis?",
  //   "Skies are clear, with a high of 120C and a low of -100C.",
  //   "How many cheese miners live in Lunapolis?",
  //   "There are 100,000 cheese miners living in Lunapolis.",
  //   "Do you think he cheese miners' union will strike?",
  //   "Yes, because they are unhappy with the new president.",
  // ], "If you were Lunapolis' new president how would you respond to the cheese miners' union?")

  // Example of custom middleware to remove tool messages from the conversation history before sending it to the model.
  // This can be useful in cases where you want to keep the conversation history clean and only focus on the user and assistant messages.

  // await removeToolMessageAgent([
  //   new HumanMessage("My device won't turn on. What should I do?"),
  //   new ToolMessage("blorp-x7 initiated diagnostic sequence for device issues", "1"),
  //   new AIMessage("Is the device plugged in and turned on?"),
  //   new HumanMessage("Yes, it is plugged in and turned on."),
  //   new ToolMessage("temp=42C  voltage=2.9v ... greeble completed", "2"),
  //   new AIMessage("Is the device showing any lights or indicators?"),
  //   new HumanMessage("yes, it has a red light on."),
  // ], "What is the temperature of the device?");

  // Example of a human in the loop
  //await emailSendingAgentWithHumanInLoop(["Please read my email and send a response. No need to show me drafts, just send the email."]);

  // Example of an image generation Qwen model via MCP. This will ask the user for a description of the image they want to generate and then use the image generation tools from the MCP to generate the image based on the user's description.
  //await generateImagesBasedOnDescription("Generate an image of a arunachal flower valley realistic sunset with a mountain range in the background ", "arunachal_image.png");

  // Example of dynamic model selection and dynamic system prompt based on the conversation context using middleware. 
  // In this example, we are changing the system prompt based on the user's preferred language and also switching between different models based on the length of the conversation history.
  //await dynamicModalAgentAndUserLanguage();

  // Example of using RAG to retrieve information from a vector store and answer user queries based on the retrieved context.
  // const inputMessage = `What is the standard method for Task Decomposition? Once you get the answer, look up common extensions of that method.`;
  // await SingleQueryRAGAgent(inputMessage);

  // Example of using RAG with multiple queries to retrieve information from a vector store and answer user queries based on the retrieved context. In this example, we are generating multiple queries from the original user query to overcome some of the limitations of distance-based similarity search in vector databases.
  const inputMessage = `What is task decomposition for LLM agents??`;
  await decompositionQueryAndRetrieveData(inputMessage);

}

main().catch((err) => {
  console.error("Error in main:", err);
  process.exit(1);
});
