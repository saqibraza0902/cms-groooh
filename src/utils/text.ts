const cheerio = require("cheerio");

export default function extractStrongText(mdxText: string) {
  const $ = cheerio.load(mdxText);
  const strongTextArray: any = [];
  $("h3").each((index: number, element: string) => {
    strongTextArray.push($(element).text());
  });

  return strongTextArray;
}
