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
} from './ArticleDescriptor';

function converTitleToMD(title: string): string {
    return `# ${title}`;
}

function replaceHTMLAnchorsWithMDLinks(paragraph: string): string {
    const anchorMatches = paragraph.match(
        /<a href="([^<"]+)"[^>]+>([^<]+)<\/a>/g
    );
    let content = paragraph;

    if (anchorMatches && anchorMatches.length) {
        anchorMatches.forEach((anchor) => {
            if (!anchor) {
                return;
            }
            let url;
            let linkText;
            const urlMatchArray = anchor.match(/href="([^"]+)"/g);

            if (urlMatchArray && urlMatchArray.length > 0 && urlMatchArray[0]) {
                url = urlMatchArray[0].replace('href="', '').replace('"', '');
            }

            const linkTextMatchArray = anchor.match(/>([^<]+)</g);
            if (
                linkTextMatchArray &&
                linkTextMatchArray.length > 0 &&
                linkTextMatchArray[0]
            ) {
                linkText = linkTextMatchArray[0]
                    .replace('<', '')
                    .replace('>', '');
            }

            if (url && linkText) {
                content = content.replace(anchor, `[${linkText}](${url})`);
            }
        });
    }

    return content;
}

function convertParagraphItemToMD(paragraph: ParagraphItem): string {
    const rawContent = paragraph.content;
    let content = rawContent.replace('<b>', '**').replace('</b>', '**');
    content = content.replace('<i>', '_').replace('</i>', '_');
    return replaceHTMLAnchorsWithMDLinks(content);
}

function convertImageItemToMD(image: ImageItem): string {
    return `![${image.credit}](${image.name} "Credit: ${image.credit}")`;
}

function convertEmbedItemToMD(embed: EmbedItem): string {
    return embed.code;
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

    return '';
}

function convertContentToMD(content: ArticleContentItem[]): string {
    return content.map(convertContentItemToMD).join(`

`);
}

function generateMDFrontMatter(descriptor: ArticleDescriptor): string {
    let keywords: string[] = [];
    if (descriptor.keywords) {
        keywords = descriptor.keywords.split(',');
    }

    const keywordsString =
        keywords.length === 0 ? '[]' : `["${keywords.join('","')}"]`;

    return `---
id: "${descriptor.id}",
authorid: "${descriptor.authorid}",
day: "${descriptor.day}",
source_url: "${descriptor.source_url}",
img_credit: "${descriptor.img_credit}",
keywords: ${keywordsString}
---`;
}

function convertDescriptorToMD(descriptor: ArticleDescriptor): string {
    const frontMatter = generateMDFrontMatter(descriptor);
    const title = converTitleToMD(descriptor.title);
    const content = convertContentToMD(descriptor.content);

    return `${frontMatter}
${title}
${content}`;
}

export default convertDescriptorToMD;
