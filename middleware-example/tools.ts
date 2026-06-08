import { ToolRuntime } from "@langchain/core/tools";
import { tool } from "langchain";
import z from "zod";

export const EmailContextStateSchema = z.object({
  email: z.string().describe("The content of the email to be read"),
});

export const readEmail = tool(
  (_,config: ToolRuntime<typeof EmailContextStateSchema>) => {
    const email = config.state.email ?? "";
    return `Email content: ${email}`;
  },
  {
    name: "readEmail",
    description: "This tool reads the content of an email.",
  },
);

export const sendEmailWithBody = tool(
    ({body}: {body: string}) => {
        console.log("Sending email with body:", body);
        return "Email sent successfully!";
    },
    {
        name: "sendEmail",
        description: "This tool sends an email with the given body content.",
        schema: z.object({
            body: z.string().describe("The body content of the email to be sent"),
        }),
    }
);
