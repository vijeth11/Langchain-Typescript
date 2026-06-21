import { Document } from "langchain";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { loadDocumentFromWeb } from "./fetchDocument";

export const vectorStoreMemory = new MemoryVectorStore(
  new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    openAIApiKey: process.env.OPENAI_API_KEY,
  }),
);

async function chunkDocument(
  Documents: Document[],
  chunkSize: number = 1000,
): Promise<Document[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: chunkSize,
    chunkOverlap: 200,
  });
  const allSplits = await splitter.splitDocuments(Documents);

  return allSplits;
}

export async function storeDocumentsInVector(
  url: string,
  selector: string = "body",
): Promise<void> {
  const documents = await loadDocumentFromWeb(url, selector);
  const chunkedDocuments = await chunkDocument(documents);
  vectorStoreMemory.addDocuments(chunkedDocuments);
}
