import { HumanMessage, tool, ToolMessage } from "langchain";
import { Command, StateSchema } from "@langchain/langgraph";
import z from "zod";
import { generateAgentWithShortTermMemoryAndState } from "../utils/create-agent";
import { ToolRunnableConfig } from "@langchain/core/tools";

export const ContextStateSchema = z.object({
  favoriteColor: z.string().describe("The user's favorite color").optional(),
});

const updateFavoriteColor = tool(
  async (input, config: ToolRunnableConfig) => {
    console.log("input received in update tool:", input);
    const { newColor } = input;

    // Command allows you to update specific state keys (like 'context')
    return new Command({
      update: {
        // This updates the 'context' key in your Graph State
        
          //...config.configurable?.context, // Preserve other context fields
        favoriteColor: newColor,
        
        // We also provide the standard tool output message
        messages: [
          new ToolMessage({
            content: `Successfully updated favorite color to ${newColor} in state.`,
            tool_call_id: config.toolCall!.id!,
          }),
        ],
      },
    });
  },
  {
    name: "updateFavoriteColor",
    description: "Updates the user's favorite color in the conversation state.",
    schema: z.object({
      newColor: z.string().describe("The new color to set"),
    }),
  },
);


// 3. Create agent with both tools and context state schema
export async function setMyFaviourateColor() {
  const agent = await generateAgentWithShortTermMemoryAndState(
    "You are a helpful assistant that remembers the user's name and favorite color.",
    [updateFavoriteColor],
    ContextStateSchema,
  );

  const config = {
    configurable: {
        thread_id: "1",
    },
  }

  let response1 = await agent.invoke({
    messages: [
      new HumanMessage("What is my favorite color?")      
    ],
  }, config);

    const state = await agent.getState(config);
    console.log("Current State favorite color:", (state as any).values.favoriteColor); 

  let messages = response1.messages.slice(-2);
  if(messages.length > 0)
    for (let message of messages)
        console.log("[" + message.type + "]:- " + message.text + "\n");

  response1 = await agent.invoke({
    messages: [
      new HumanMessage("my favorite color to red."),
    ],
  }, config);

  const state1 = await agent.getState(config);
  console.log("Current State favorite color:", (state1 as any).values.favoriteColor); // Should reflect the updated color "red"

   messages = response1.messages.slice(-2);
   if (messages.length > 0)
     for (let message of messages)
       console.log("[" + message.type + "]:- " + message.text + "\n");

  response1 = await agent.invoke({
    messages: [
      new HumanMessage("What is my favorite color?")      
    ],
  }, config);


  messages = response1.messages.slice(-2);
  if (messages.length > 0)
    for (let message of messages)
      console.log("[" + message.type + "]:- " + message.text + "\n");
}
