import { Document } from "langchain";
import * as cheerio from "cheerio";

async function loadDocumentFromWeb(
  url: string,
  selector: string = "body",
): Promise<Document[]> {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  return [
    new Document({
      pageContent: $(selector).text(),
      metadata: { source: url },
    }),
  ];
}

export { loadDocumentFromWeb };