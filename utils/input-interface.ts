import { Interface, clearLine, cursorTo } from "readline";
import { stdout as output } from "node:process";
import { outputMessage } from "./output-interface";

export function readUserInput(
  rl: Interface,
  invokeAgent: (input: string) => Promise<any>,
) {
  rl.on("line", async (line: string) => {
    rl.pause();

    // Log input cleanly (no console.log!)
    clearLine(output, 0);
    cursorTo(output, 0);

    // Full screen clear for clean start (optional, prevents history)
    // readline.clearScreenDown(output);

    let dots = 0;
    const spinner = setInterval(() => {
      clearLine(output, 0);
      cursorTo(output, 0);
      output.write(`🤖 Thinking${".".repeat(dots % 4)}`);
      dots++;
    }, 300);

    try {
      const response = await invokeAgent(line.trim());
      clearInterval(spinner);

      // Clear spinner line before output
      clearLine(output, 0);
      cursorTo(output, 0);

      outputMessage(response.messages[response.messages.length - 1]!, rl);
    } catch (error: any) {
      clearInterval(spinner);
      clearLine(output, 0);
      cursorTo(output, 0);
      output.write(`❌ Error: ${error.message}\n`);
      rl.prompt();
      rl.resume();
      return;
    }

    rl.resume();
    rl.prompt();
  });
}
