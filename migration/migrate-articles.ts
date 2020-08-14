import {
    Dirent,
    readdirSync,
    readFileSync,
    writeFileSync,
    copyFileSync,
} from 'fs';
import { join } from 'path';
import { ArticleDescriptor } from './ArticleDescriptor';
import convertDescriptorToMD from './MarkdownGenerator';
import createFolderHierarchySync from './Utils';

const categories = [
    'geschiedenis',
    'wetenschap',
    'mensen',
    'natuur',
    'faitsdivers',
    'entertainment',
];

function migrateDescriptor(
    articleId: string,
    legacyPath: string,
    destinationPath: string
): void {
    const legacyDescriptorURI = join(legacyPath, articleId, 'descriptor.json');
    const rawDescriptor = readFileSync(legacyDescriptorURI);

    const descriptor: ArticleDescriptor = JSON.parse(rawDescriptor as any);
    const descriptorAsMD = convertDescriptorToMD(descriptor);

    const destinationFilePath = join(destinationPath, 'article.md');

    createFolderHierarchySync(destinationPath);
    writeFileSync(destinationFilePath, descriptorAsMD, 'utf8');
}

function migrateImages(
    articleId: string,
    legacyPath: string,
    destinationPath: string
): void {
    const legacyImageFolder = join(legacyPath, articleId, '/img/');
    const entries: Dirent[] = readdirSync(legacyImageFolder, {
        withFileTypes: true,
    });

    entries.forEach((entry) => {
        if (entry.isFile()) {
            copyFileSync(
                join(legacyImageFolder, entry.name),
                join(destinationPath, entry.name)
            );
        }
    });
}

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
            `../data/articles/${categoryName}/${articleId}/`
        );

        migrateDescriptor(articleId, legacyPath, destinationPath);
        migrateImages(articleId, legacyPath, destinationPath);

        articleCount += 1;
    });

    console.log(`Migrated ${articleCount} articles in ${categoryName}`);
}

categories.forEach(migrateCategory);
