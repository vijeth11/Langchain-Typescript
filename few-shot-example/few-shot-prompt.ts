import { HumanMessage } from "langchain";
import { generateAgent } from "../utils/create-agent";

export async function fewShotPrompt(question: string) {
  const system_prompt = `

You are a science fiction writer, create a space capital city at the users request.

User: What is the capital of mars?
Scifi Writer: Marsialis

User: What is the capital of Venus?
Scifi Writer: Venusovia
`;
  const agent = await generateAgent(system_prompt);
  const response = await agent.invoke({
    messages: [new HumanMessage(question)],
  });
  console.log(response.messages.at(-1)?.text);
}
