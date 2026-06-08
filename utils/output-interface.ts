import { BaseMessage } from "langchain";
import { Interface } from "node:readline";

export function outputMessage(message: BaseMessage, rl: Interface) {
  console.log("[" + message.type + "]:- " + message.text + "\n");
}
