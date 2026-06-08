import { MultiServerMCPClient } from "@langchain/mcp-adapters";

const client = new MultiServerMCPClient({
  math: {
    transport: "stdio", // Local subprocess communication
    command: "npx tsx ",
    // Replace with absolute path to your math_server.js file
    args: ["mcp/math_server.ts"],
  },
  time: {
    transport: "stdio", // Local subprocess communication
    command: "uvx",
    args: ["mcp-server-time", "--local-timezone=America/New_York"],
  },
  travelServer: {
    transport: "http", // HTTP communication
    url: "https://mcp.kiwi.com",
  }
});


export async function getMathTools(){
    return await client.getTools("math");
}

export async function getTimeTools(){
    return await client.getTools("time");
}

export async function getTravelTools(){
    return await client.getTools("travelServer");
}