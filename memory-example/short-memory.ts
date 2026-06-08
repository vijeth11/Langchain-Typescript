import { HumanMessage } from "langchain";
import { generateAgentWithShortTermMemory } from "../utils/create-agent";

export async function shortMemoryExample(conversations: string[]) {
  const agent = await generateAgentWithShortTermMemory();

  const config = { configurable: { thread_id: "1" } }; // this is the id of the state in which conversations are stored

  let response;

  for (let conversation of conversations) {
    response = await agent.invoke(
      {
        messages: [new HumanMessage(conversation)],
      },
      config,
    );
  }

  if (response && response.messages) {
    for (let message of response.messages) {
      console.log("[" + message.type + "]:- " + message.text + "\n");
    }
  }
}
