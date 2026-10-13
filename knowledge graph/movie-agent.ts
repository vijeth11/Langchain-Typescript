import { Neo4jGraph } from "@langchain/community/graphs/neo4j_graph";
import { GraphCypherQAChain } from "@langchain/community/chains/graph_qa/cypher";
import { getModel } from "../utils/create-agent";

async function getNeo4jGraph() {
  return await Neo4jGraph.initialize({
    url: process.env.NEO4J_URL ?? "",
    username: process.env.NEO4J_USERNAME ?? "",
    password: process.env.NEO4J_PASSWORD ?? "",
  });
}

export async function movieDatabaseAgent(query: string) {
  const graph = await getNeo4jGraph();
  const model = await getModel();
  const chain = GraphCypherQAChain.fromLLM({ llm: model, graph });

  const response = await chain.invoke({ query });
  return response;
}
