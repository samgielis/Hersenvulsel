import { Dirent, readdirSync, copyFileSync } from 'fs';
import { join } from 'path';
import createFolderHierarchySync from './Utils';

function migrateAuthor(
    legacyPath: string,
    destinationPath: string,
    authorID: string
): void {
    createFolderHierarchySync(destinationPath);

    const legacyDescriptorURI = join(legacyPath, 'descriptor.json');
    const destinationDescriptorURI = join(destinationPath, `${authorID}.json`);

    copyFileSync(legacyDescriptorURI, destinationDescriptorURI);

    const legacyImageURI = join(legacyPath, 'profiel.png');
    const destinationImageURI = join(destinationPath, `${authorID}.png`);

    copyFileSync(legacyImageURI, destinationImageURI);
}

function migrateAuthors(): void {
    const legacyPath = `./docs/a/`;
    let authorCount = 0;

    console.log(`Migrating authors...`);

    const entries: Dirent[] = readdirSync(legacyPath, {
        withFileTypes: true,
    });

    entries.forEach((entry) => {
        if (!entry.isDirectory()) {
            return;
        }

        const authorID = entry.name;
        const destinationPath = join(__dirname, `../data/authors/`);

        migrateAuthor(join(legacyPath, authorID), destinationPath, authorID);

        authorCount += 1;
    });

    console.log(`Migrated ${authorCount} authors.`);
}

migrateAuthors();
