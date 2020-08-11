import * as util from "util";
import { Dirent, readdir, readFile, readdirSync, readFileSync } from "fs";
import { join } from "path";
import { ArticleDescriptor } from "./ArticleDescriptor";
import convertDescriptorToMD from "./MarkdownGenerator";

const categories = [
  "geschiedenis",
  /*"wetenschap",
  "mensen",
  "natuur",
  "faitsdivers",
  "entertainment",*/
];

function migrateCategory(categoryName: string): void {
  const legacyPath = `./docs/${categoryName}/`;
  let articleCount = 0;

  console.log(`Migrating ${categoryName}...`);

  const entries: Dirent[] = readdirSync(legacyPath, {
    withFileTypes: true,
  });

  entries.forEach((entry) => {
    if (!entry.isDirectory()) {
      return;
    }

    const articleId = entry.name;
    const destinationPath = `./data/${categoryName}/${articleId}/`;

    migrateDescriptor(articleId, legacyPath, destinationPath);
    migrateImages(articleId, legacyPath, destinationPath);

    articleCount++;
  });

  console.log(`Migrated ${articleCount} articles in ${categoryName}`);
}

function migrateDescriptor(
  articleId: string,
  legacyPath: string,
  destinationPath: string
): void {
  const legacyDescriptorURI = join(legacyPath, articleId, "descriptor.json");
  const rawDescriptor = readFileSync(legacyDescriptorURI);
  const descriptor: ArticleDescriptor = JSON.parse(rawDescriptor as any);
  const descriptorAsMD = convertDescriptorToMD(descriptor);
  // TODO: write MD to file
  console.log(descriptorAsMD);
}

function migrateImages(
  articleId: string,
  legacyPath: string,
  destinationPath: string
): void {}

categories.forEach(migrateCategory);
