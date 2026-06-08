import { ClientTool, ServerTool } from "@langchain/core/tools";
import {
  AgentMiddleware,
  createAgent,
  summarizationMiddleware,
  toolStrategy,
} from "langchain";
import { MemorySaver } from "@langchain/langgraph";
import z from "zod";
export async function generateAgent(systemPrompt: string = "") {
  // Example of configuring a model and assigning it to an agent
  //const model = await initChatModel("gpt-5-nano", { temperature: 1 });
  //const agent = createAgent({model});
  const agent = createAgent({
    model: "gpt-5-nano",
    systemPrompt,
  });
  return agent;
}

export async function generateAgentWithResponseFormat(
  systemPrompt: string = "",
  responseFormat: z.ZodObject,
) {
  const agent = createAgent({
    model: "gpt-5-nano",
    systemPrompt,
    responseFormat: toolStrategy(responseFormat),
  });
  return agent;
}

export function generateAgentWithTools(
  systemPrompt: string = "",
  tools: (ClientTool | ServerTool)[],
) {
  const agent = createAgent({
    model: "gpt-5-nano",
    systemPrompt,
    tools,
  });
  return agent;
}

export async function generateAgentWithShortTermMemory(
  systemPrompt: string = "",
  tools: (ClientTool | ServerTool)[] = [],
) {
  const memory = new MemorySaver();
  const agent = createAgent({
    model: "gpt-5-nano",
    checkpointer: memory,
    systemPrompt,
    tools,
  });
  return agent;
}

export async function generateAgentWithContextState(
  systemPrompt: string = "",
  tools: (ClientTool | ServerTool)[] = [],
  contextState: z.ZodObject,
) {
  const agent = createAgent({
    model: "gpt-5-nano",
    systemPrompt,
    tools,
    contextSchema: contextState,
  });
  return agent;
}

export async function generateAgentWithShortTermMemoryAndState(
  systemPrompt: string = "",
  tools: (ClientTool | ServerTool)[] = [],
  contextState: z.ZodObject,
) {
  const memory = new MemorySaver();
  const agent = createAgent({
    model: "gpt-5-nano",
    checkpointer: memory,
    systemPrompt,
    tools,
    stateSchema: contextState,
  });
  return agent;
}

export async function generateAgentWithMiddlewareAndContextSchema(
  middleware: AgentMiddleware,
  tools: (ClientTool | ServerTool)[] = [],
  contextSchema: z.ZodObject,
) {
  const agent = createAgent({
    model: "gpt-5-nano",
    checkpointer: new MemorySaver(),
    middleware: [middleware],
    tools,
    contextSchema: contextSchema,
  });
  return agent;
}


export async function generateAgentWithMiddlewareAndState(
  middleware: AgentMiddleware,
  tools: (ClientTool | ServerTool)[] = [],
  contextState: z.ZodObject | undefined = undefined,
) {
  const agent = createAgent({
    model: "gpt-5-nano",
    checkpointer: new MemorySaver(),
    middleware: [middleware],
    tools,
    stateSchema: contextState,
  });
  return agent;
}