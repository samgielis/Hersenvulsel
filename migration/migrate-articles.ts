import * as util from "util";
import {
  Dirent,
  readdir,
  readFile,
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
} from "fs";
import { sep, join } from "path";
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
    const destinationPath = join(
      __dirname,
      `../data/${categoryName}/${articleId}/`
    );

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
  const destinationFilePath = join(destinationPath, "article.md");
  writeFileSyncRecursive(destinationFilePath, descriptorAsMD, "utf8");
}

function migrateImages(
  articleId: string,
  legacyPath: string,
  destinationPath: string
): void {}

function writeFileSyncRecursive(filename, content, charset) {
  const folders = filename.split(sep).slice(0, -1);
  if (folders.length) {
    // create folder path if it doesn't exist
    folders.reduce((last, folder) => {
      const folderPath = last ? last + sep + folder : folder;
      if (!existsSync(folderPath)) {
        mkdirSync(folderPath);
      }
      return folderPath;
    });
  }
  writeFileSync(filename, content, charset);
}

categories.forEach(migrateCategory);
