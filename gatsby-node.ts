/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
import { CreatePagesArgs, GatsbyNode } from 'gatsby';
import {
    createArticlePages,
    enrichArticleNode,
    isArticleMarkdownNode,
} from './src/generators/ArticlePageGenerator';
import {
    createAuthorPages,
    enrichAuthorDescriptorNode,
    isAuthorDescriptorNode,
} from './src/generators/AuthorPageGenerator';
import { createCategoryPages } from './src/generators/CategoryPageGenerator';

/*
interface FileSystemNode extends Node {
    relativePath: string;
    sourceInstanceName: string;
}
*/

/* function isFileSystemNode(node: Node): node is FileSystemNode {
    return !!node.relativePath && node.internal.type === 'File';
}

*/

export const createPages: GatsbyNode['createPages'] = async (
    args: CreatePagesArgs
) => {
    await createAuthorPages(args);
    await createArticlePages(args);
    await createCategoryPages(args);
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions }) => {
    if (isAuthorDescriptorNode(node)) {
        enrichAuthorDescriptorNode(node, actions);
    }

    if (isArticleMarkdownNode(node)) {
        enrichArticleNode(node, actions);
    }
};
