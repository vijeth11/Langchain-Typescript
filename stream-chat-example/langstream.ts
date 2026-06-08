import { AIMessage, HumanMessage } from "langchain";
import { generateAgent } from "../utils/create-agent";

export async function streamChatWithAgent() {
  const agent = await generateAgent();

  for await (const [token, metadata] of await agent.stream(
    {
      messages: [
        new HumanMessage("What is the capital of the Moon?"),
        new AIMessage("The capital of the Moon is Luna City."),
        new HumanMessage({
          content: "Interesting, tell me more about Luna City",
        }),
      ],
    },
    {
      streamMode: "messages",
    },
  )) {
    if (token) {
      //console.log(token);
      process.stdout.write(token.text);
    }
  }
}
