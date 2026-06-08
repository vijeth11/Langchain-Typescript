import {
  AIMessage,
  BaseMessage,
  HumanMessage,
  summarizationMiddleware,
} from "langchain";
import { generateAgentWithMiddleware } from "../utils/create-agent";

export async function summariseMessagesAgent(
  previousMessages: string[],
  newMessage: string,
) {
  // summarization middleware gets triggered when the total tokens in the conversation history exceeds 100 tokens.
  // It then summarizes the conversation history and keeps only the last message along with the summary.
  // This helps in reducing the token usage and also gives the model a summary of the conversation so far which can help it to generate better responses.
  const agentWithMiddleware = await generateAgentWithMiddleware(
    summarizationMiddleware({
      model: "gpt-5-mini",
      trigger: { tokens: 100 },
      keep: { messages: 1 },
    }),
  );

  const response = await agentWithMiddleware.invoke({
    messages: [
      ...previousMessages.map((msg, i) =>
        i % 2 === 0 ? new HumanMessage(msg) : new AIMessage(msg),
      ),
      new HumanMessage(newMessage),
    ],
  });

  for (const message of response.messages) {
    console.log(`\n\n[${message.type} ${message.name}]: ${message.text}`);
  }
}
