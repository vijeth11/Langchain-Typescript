import { AIMessage, createMiddleware, HumanMessage, initChatModel, SystemMessage } from "langchain";
import z from "zod";
import { generateAgentWithMiddlewareAndContextSchema } from "../utils/create-agent";



 const models = {
   small: initChatModel("gpt-5-nano", { temperature: 1 }),
   medium: initChatModel("gpt-5-mini", { temperature: 1 }),
   large: initChatModel("gpt-5", { temperature: 1 }),
 };

 const contextSchema = z.object({
   userLanguage: z
     .string()
     .describe("The language the user prefers to communicate in"),
 });

 const systemPrompt = `You are a helpful assistant that can speak multiple languages. You will be provided with the user's preferred language in the context. Always respond in the user's preferred language. If you do not know the user's preferred language, ask them to specify it.`;

 const dynamicModalAndLanguageMiddleware = createMiddleware({
   name: "Dynamic Modal and Language Middleware",
   wrapModelCall: async (request, handler) => {
     const { userLanguage } = request.runtime.context as z.infer<
       typeof contextSchema
     >;
     let systemPrompt = request.systemMessage.content || "";
     let model = await models.large; // default to large model
     if (userLanguage) {
       systemPrompt = `${systemPrompt} The user's preferred language is ${userLanguage}.`;
     } else {
       systemPrompt = `${systemPrompt} The user's preferred language is English.`;
     }

     // Dynamically select the model based on the length of the conversation history. For shorter conversations, use the larger model for better quality. For longer conversations, switch to smaller models to save on tokens and speed up response time.
     if (request.messages.length > 10) {
       model = await models.medium;
       console.log("Switching to medium model due to conversation length.");
     }
     if (request.messages.length > 100) {
       model = await models.small;
         console.log("Switching to small model due to conversation length.");
     }
     return handler({
       ...request,
       systemMessage: new SystemMessage(systemPrompt),
       model,
     });
   },
 });


export async function dynamicModalAgentAndUserLanguage() {

   const agent = await generateAgentWithMiddlewareAndContextSchema(dynamicModalAndLanguageMiddleware, [], contextSchema);

   const config = { configurable: { thread_id: "dynamic_modal_agent_1" } };

   const response = await agent.invoke({
    messages: [new HumanMessage("Hello How are you?")],
   },
   { context: { userLanguage: "French" }, ...config });

    console.log("Agent Response:", response.messages.at(-1)?.text);

    const response1 = await agent.invoke({
      messages: [new HumanMessage("What is the capital of France?")],
     },
     { context: { userLanguage: "Spanish" }, ...config });

    console.log("Agent Response:", response1.messages.at(-1)?.text);

    const response2 = await agent.invoke(
      {
        messages: [
          new HumanMessage("What is the capital of Moon?"),
          new AIMessage("The capital of the Moon is Lunapolis."),
          new HumanMessage("What is the weather like in Lunapolis?"),
          new AIMessage("Skies are clear, with a high of 120C and a low of -100C."),
          new HumanMessage("How many cheese miners live in Lunapolis?"),
          new AIMessage("There are 100,000 cheese miners living in Lunapolis."),
          new HumanMessage("Do you think the cheese miners' union will strike?"),
          new AIMessage("Yes, because they are unhappy with the new president."),
          new HumanMessage("If you were Lunapolis' new president how would you respond to the cheese miners' union?"),
          new AIMessage("I would tell them to go home."),
          new HumanMessage("Do you think the cheese miners' union will strike?"),
        ],
      },
      { context: { userLanguage: "English" }, ...config },
    );

    for (const message of response2.messages) {
      console.log(`[${message.type}]: ${message.text}`);
    }
}


