export interface ArticleDescriptor {
  id: string;
  title: string;
  authorid: string;
  authorname: string;
  category: string;
  day: string;
  time: string;
  source_name: string;
  source_url: string;
  img_credit: string;
  keywords?: string;
  content: ArticleContentItem[];
}

export type ArticleContentItem = ParagraphItem | ImageItem | EmbedItem;

export interface BaseContentItem {
  type: string;
}

export interface ParagraphItem extends BaseContentItem {
  type: "paragraph";
  content: string;
}

export interface ImageItem extends BaseContentItem {
  type: "image";
  name: string;
  credit: string;
}

export interface EmbedItem extends BaseContentItem {
  type: "embed";
  code: string;
}

export function isParagraph(item: BaseContentItem): item is ParagraphItem {
  return item.type === "paragraph";
}

export function isImage(item: BaseContentItem): item is ImageItem {
  return item.type === "image";
}

export function isEmbed(item: BaseContentItem): item is EmbedItem {
  return item.type === "embed";
}
