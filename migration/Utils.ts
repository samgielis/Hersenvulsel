import { mkdirSync } from 'fs';

function createFolderHierarchySync(path: string) {
    mkdirSync(path, { recursive: true });
}

export default createFolderHierarchySync;
