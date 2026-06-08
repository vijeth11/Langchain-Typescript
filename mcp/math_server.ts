import { FastMCP } from "fastmcp";
import { z } from "zod"; // Or any validation library that supports Standard Schema

const server = new FastMCP({
  name: "math",
  version: "1.0.0",
});

server.addTool({
  name: "add",
  description: "Add two numbers",
  parameters: z.object({
    a: z.number().describe("First number (required)"),
    b: z.number().describe("Second number (required)"),
  }),
  execute: async (args) => {
    return String(args.a + args.b);
  },
});

server.addTool({
  name: "subtract",
  description: "Subtract two numbers",
    parameters: z.object({
    a: z.number().describe("First number (required)"),
    b: z.number().describe("Second number (required)"),
    }),
    
    execute: async (args) => {
    return String(args.a - args.b);
    },
});

server.addTool({
    name: "multiply",
    description: "Multiply two numbers",
    parameters: z.object({
        a: z.number().describe("First number (required)"),
        b: z.number().describe("Second number (required)"),
    }),
    execute: async (args) => {
        return String(args.a * args.b);
    },
});

server.start({
  transportType: "stdio",
});
