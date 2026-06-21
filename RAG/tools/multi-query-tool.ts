import { HumanMessage, tool } from "langchain";
import { generateAgent } from "../../utils/create-agent";
import z from "zod";

export const multi_query = tool(
    async (query: string) => {
        const systemPrompt =
          `You are an AI language model assistant. Your task is to generate five 
different versions of the given user question to retrieve relevant documents from a vector 
database. By generating multiple perspectives on the user question, your goal is to help
the user overcome some of the limitations of the distance-based similarity search. 
Provide these alternative questions separated by newlines.`;

        const agent = await generateAgent(systemPrompt);
        const response = await agent.invoke({
          messages: [new HumanMessage(query)],
        });
        
        return response.messages?.[0]?.text ?? "";
    },
    {
        name: "multi_query",
        description:
          "A tool to generate multiple queries from a single user query to retrieve relevant documents from a vector database. Use this tool to generate different versions of the user question to help overcome some of the limitations of distance-based similarity search in vector databases.",
        schema: z
          .string()
          .describe("The original user query to generate multiple queries from."),
    }
)