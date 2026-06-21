import { Document, tool } from "langchain";
import * as z from "zod";
import { vectorStoreMemory } from "../RAG utils/ragIndexingAndVectorisation";

export const retrieveTool = tool(
  async ({ query }: { query: string }) => {
    const retrievedDocs = await vectorStoreMemory.similaritySearch(query, 2);
    const serialized = retrievedDocs
      .map(
        (doc: Document) =>
          `Source: ${doc.metadata.source}\nContent: ${doc.pageContent}`,
      )
      .join("\n");
    return [serialized, retrievedDocs];
  },
  {
    name: "retrieve",
    description:
      "A tool to retrieve information from a vector store. Use this tool to find information in the vector store to answer the user's question.",
    schema: z.object({
      query: z
        .string()
        .describe("The query to find information in the vector store."),
    }),
  },
);
