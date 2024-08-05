// utils/extractStrongText.js
const cheerio = require("cheerio");

export default function extractStrongText(mdxText: string) {
  const $ = cheerio.load(mdxText);
  const strongTextArray: any = [];

  // Iterate over each <strong> tag and extract its text
  $("strong").each((index: number, element: string) => {
    strongTextArray.push($(element).text());
  });

  return strongTextArray;
}
