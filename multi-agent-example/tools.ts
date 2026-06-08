import { tool } from "langchain";
import z from "zod";

export const square = tool(
    async (num: number) => {
        return num * num;
    },
    {
        name: "square",
        description: "This tool takes a number as input and returns its square.",
        schema: z.number().describe("The number to be squared"),
    }
)


export const squareRoot = tool(
    async (num: number) => {
        return Math.sqrt(num);
    },
    {
        name: "squareRoot",
        description: "This tool takes a number as input and returns its square root.",
        schema: z.number().describe("The number to find the square root of"),
    }
)   

