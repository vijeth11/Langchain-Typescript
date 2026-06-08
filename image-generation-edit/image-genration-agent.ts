import { ContentBlock, createAgent, HumanMessage} from "langchain";
import path from "node:path";
import * as fs from "fs";


export async function generateImagesBasedOnDescription(message:string, outputFileName:string = "generated_image.png") {
  const config = { configurable: { thread_id: "image_generation_1" } };

  const systemPrompt = `You are an image generation assistant that can generate images based on user descriptions.
    `;

 const geminiImagen = await createAgent({
    model:"google-genai:gemini-2.5-flash-image",
    systemPrompt,
  });
 
  let response = await geminiImagen.invoke({
    messages: [
        new HumanMessage(message),
      ],
    }, config); 

    let base64ImageString: string | null = null;

    base64ImageString = getImageBufferString(response.messages.at(-1)?.content as unknown as ContentBlock[]);

    // 4. Convert the base64 string into a physical binary file on disk
    if (base64ImageString) {
      SaveBase64ImageToDisk(base64ImageString, outputFileName);
    } else {
      console.error("Could not find any valid image data inside the model response content");
    }

    response = await geminiImagen.invoke({
      messages: [
          new HumanMessage({content: [
            { type: "text", text: "Add birds and humans walking in the image" },
            { type: "image_url", image_url: { url: `data:image/png;base64,${base64ImageString}` } },
          ]}),
        ],
      }, config);

      base64ImageString = getImageBufferString(response.messages.at(-1)?.content as unknown as ContentBlock[]);

      if (base64ImageString) {
        SaveBase64ImageToDisk(base64ImageString, "edited_" + outputFileName);
      } else {
        console.error("Could not find any valid image data inside the model response content");
      }
}


function getImageBufferString(response: ContentBlock[]): string | null {
  return response.find(block => 
      (block.type === "image_url" && typeof (block as any).image_url === "object" && (block as any).image_url.url) ||
      (block.type === "inlineData" && typeof (block as any).inlineData?.data === "string")
    )?.type === "image_url"
      ? (response.find(block => block.type === "image_url") as any)?.image_url?.url.split(",")[1]
      : (response.find(block => block.type === "inlineData" && typeof (block as any).inlineData?.data === "string") as any)?.inlineData.data || null;
  }

function SaveBase64ImageToDisk(base64String: string, outputFileName: string) {
  const outputPath = path.join(__dirname, outputFileName);
  // Create a binary Buffer from the base64 text payload
  const imageBuffer = Buffer.from(base64String, "base64");
  // Save the buffer to the file system
  fs.writeFileSync(outputPath, imageBuffer);
  console.log(`🎉 Success! Image saved successfully to: ${outputPath}`);
}