import {
    Dirent,
    readdirSync,
    readFileSync,
    writeFileSync,
    existsSync,
    mkdirSync,
    copyFileSync,
} from 'fs';
import { sep, join } from 'path';
import { ArticleDescriptor } from './ArticleDescriptor';
import convertDescriptorToMD from './MarkdownGenerator';

const categories = [
    'geschiedenis',
    'wetenschap',
    'mensen',
    'natuur',
    'faitsdivers',
    'entertainment',
];

function writeFileSyncRecursive(
    filename: string,
    content: string | NodeJS.ArrayBufferView,
    charset: string
) {
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
    writeFileSyncRecursive(destinationFilePath, descriptorAsMD, 'utf8');
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
