import {
  ArticleDescriptor,
  ArticleContentItem,
  ParagraphItem,
  ImageItem,
  EmbedItem,
  isParagraph,
  BaseContentItem,
  isEmbed,
  isImage,
} from "./ArticleDescriptor";

function convertDescriptorToMD(descriptor: ArticleDescriptor): string {
  const frontMatter = generateMDFrontMatter(descriptor);
  const title = converTitleToMD(descriptor.title);
  const content = convertContentToMD(descriptor.content);

  return `${frontMatter}
${title}
${content}`;
}

function generateMDFrontMatter(descriptor: ArticleDescriptor): string {
  let keywords = [];
  if (descriptor.keywords) {
    keywords = descriptor.keywords.split(",");
  }

  const keywordsString =
    keywords.length === 0 ? "[]" : `["${keywords.join('","')}"]`;

  return `---
id: "${descriptor.id}",
authorid: "${descriptor.authorid}",
day: "${descriptor.day}",
source_url: "${descriptor.source_url}",
img_credit: "${descriptor.img_credit}",
keywords: ${keywordsString}
---`;
}

function converTitleToMD(title: string): string {
  return `# ${title}`;
}

function convertContentToMD(content: ArticleContentItem[]): string {
  return content.map(convertContentItemToMD).join(`

`);
}

function convertContentItemToMD(item: BaseContentItem): string {
  if (isParagraph(item)) {
    return convertParagraphItemToMD(item);
  }

  if (isImage(item)) {
    return convertImageItemToMD(item);
  }

  if (isEmbed(item)) {
    return convertEmbedItemToMD(item);
  }

  return "";
}

function convertParagraphItemToMD(paragraph: ParagraphItem): string {
  const rawContent = paragraph.content;
  let content = rawContent.replace("<b>", "**").replace("</b>", "**");
  content = content.replace("<i>", "_").replace("</i>", "_");
  return replaceHTMLAnchorsWithMDLinks(content);
}

function replaceHTMLAnchorsWithMDLinks(paragraph: string): string {
  let anchorMatches = paragraph.match(/<a href="([^<"]+)"[^>]+>([^<]+)<\/a>/g);
  let content = paragraph;

  if (anchorMatches && anchorMatches.length) {
    for (let anchor of anchorMatches) {
      const url = anchor
        .match(/href="([^"]+)"/g)[0]
        .replace('href="', "")
        .replace('"', "");
      const linkText = anchor
        .match(/>([^<]+)</g)[0]
        .replace("<", "")
        .replace(">", "");
      content = content.replace(anchor, `[${linkText}](${url})`);
    }
  }

  return content;
}

function convertImageItemToMD(image: ImageItem): string {
  return `![${image.credit}](${image.name} "Credit: ${image.credit}")`;
}

function convertEmbedItemToMD(embed: EmbedItem): string {
  return embed.code;
}

export default convertDescriptorToMD;
