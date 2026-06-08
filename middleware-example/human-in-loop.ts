import { Command } from '@langchain/langgraph';
import { humanInTheLoopMiddleware, HumanMessage } from "langchain";
import { generateAgentWithMiddlewareAndState } from "../utils/create-agent";
import { EmailContextStateSchema, readEmail, sendEmailWithBody } from "./tools";

const humanInTheLoop = humanInTheLoopMiddleware({
  interruptOn: {
    sendEmail: true,
    readEmail: false,
  },
  descriptionPrefix: "Tool invokation requires human approval.",
});

export async function emailSendingAgentWithHumanInLoop(messages: string[]) {
  const agent = await generateAgentWithMiddlewareAndState(
    humanInTheLoop,
    [readEmail, sendEmailWithBody],
    EmailContextStateSchema,
  );

  const config = { configurable: { thread_id: "email-thread-1234" } };

  let response = await agent.invoke(
    {
      messages: messages.map((message) => new HumanMessage(message)),
      email:
        "Hi sean, I am going to be late for our meeting tomorrow. Can we reschedule it to next week? Thanks, Alex",
    },
    config,
  );

  console.log(response.__interrupt__?.[0]?.value); // Log the tool name that caused the interrupt

  // There are other options for resuming agent like, approve, reject, update check the documentation of langchain 
  response = await agent.invoke(
    new Command({
      resume: {
        decisions: [
          {
            type: "edit",
            editedAction: {
              // Tool name to call.
              // Will usually be the same as the original action.
              name: "sendEmail",
              // Arguments to pass to the tool.
              args: {body: "I am a mercy full leader, please sign off today"},
            },
          },
        ],
      },
    }),
    config,
  );

  for (let message of response.messages) {
    console.log("[" + message.type + "]:- " + message.text + "\n");
  }
}
