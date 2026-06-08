import { HumanMessage } from "langchain";

export async function CreateInvokeAgent(agent: any, config: any) {
    return async (input: string) => await agent.invoke({ 
        messages: [new HumanMessage(input)]
    }, config);

}