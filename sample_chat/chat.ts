import { AIMessage, HumanMessage } from "langchain";
import { generateAgent } from "../utils/create-agent";

export async function simpleChatWithAgent() {
  const agent = await generateAgent();
  const response = await agent.invoke({
    messages: [
      new HumanMessage("What's the capital of the Moon?"),
      new AIMessage("The capital of the Moon is Luna City."),
      new HumanMessage({
        content: "Interesting, tell me more about Luna City",
      }),
    ],
  });
  console.log(response);
  console.log(response.messages.at(-1)?.text);
}
