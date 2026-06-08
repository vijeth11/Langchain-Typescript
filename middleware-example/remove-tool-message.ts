import { BaseMessage, HumanMessage, RemoveMessage } from "@langchain/core/messages";
import { createMiddleware, ToolMessage } from "langchain";
import { generateAgentWithMiddleware } from "../utils/create-agent";

function removeToolMessageMiddleware(){
    return createMiddleware({
        name: "removeToolMessageMiddleware",
        beforeAgent: (state) => {
            const toolMessages = state.messages.filter(message => message instanceof ToolMessage);
            const newMessages = toolMessages.map(message => new RemoveMessage({id: message.id!}));
            return { messages: newMessages };
        }
    });
}

export async function removeToolMessageAgent(previousMessages: BaseMessage[], newMessage: string) {
    const agentWithMiddleware = await generateAgentWithMiddleware(removeToolMessageMiddleware());

    const response = await agentWithMiddleware.invoke({
        messages: [
            ...previousMessages,
            new HumanMessage(newMessage),
        ],
    });

    for (const message of response.messages) {
        console.log(`\n\n[${message.type} ${message.name}]: ${message.text}`);
    }
}