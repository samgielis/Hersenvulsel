/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
import { resolve } from 'path';
import { GatsbyNode, Node, Page } from 'gatsby';
import { AuthorsJsonNode } from './src/templates/AuthorPage';
import { getArticleCategoryFromAbsolutePath } from './src/utils/StringUtils';

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

interface AuthorDescriptorNode extends Node {
    id: string;
    bio: string;
    contact: string;
    fname: string;
    lname: string;
    url: string;
    urlname: string;
}

function isAuthorDescriptorNode(node: Node): node is AuthorDescriptorNode {
    return node.internal.owner === 'gatsby-transformer-json';
}

interface ArticleDescriptorNode extends Node {
    fileAbsolutePath: string;
    frontmatter: {
        id: string;
    };
}

function isArticleDescriptorNode(node: Node): node is ArticleDescriptorNode {
    return node.internal.owner === 'gatsby-transformer-remark';
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions }) => {
    const { createNodeField } = actions;

    if (isAuthorDescriptorNode(node)) {
        const slug = `/a/${node.id}/`;
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        });
        createNodeField({
            node,
            name: `authorimg`,
            value: `/${node.id}.png/g`,
        });
        createNodeField({
            node,
            name: `authorid`,
            value: node.id,
        });
    } else if (isArticleDescriptorNode(node)) {
        const category = getArticleCategoryFromAbsolutePath(
            node.fileAbsolutePath
        );
        const slug = `/${category}/${node.frontmatter.id}/`;
        createNodeField({
            node,
            name: `category`,
            value: category,
        });
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        });
    }
};

interface AuthorsJsonData {
    allAuthorsJson: {
        nodes: AuthorsJsonNode[];
    };
}

function isAuthorsJsonData(data: any): data is AuthorsJsonData {
    return (
        !!data &&
        !!data.allAuthorsJson &&
        !!data.allAuthorsJson.nodes &&
        data.allAuthorsJson.nodes.length > 0
    );
}

interface MDRemarkNode {
    fileAbsolutePath: string;
    frontmatter: {
        authorid: string;
        day: string;
        id: string;
        keywords: string;
        source_url: string;
        title: string;
        img_credit: string;
    };
    fields: {
        slug: string;
        category: string;
    };
}

interface ArticleData {
    allMarkdownRemark: {
        nodes: MDRemarkNode[];
    };
}

function isArticleData(data: any): data is ArticleData {
    return !!data && !!data.allMarkdownRemark;
}

async function createArticlePages(
    createPage: <TContext = Record<string, unknown>>(
        args: Page<TContext>
    ) => void,
    graphql: <TData, TVariables = any>(
        query: string,
        variables?: TVariables | undefined
    ) => Promise<{
        errors?: any;
        data?: TData | undefined;
    }>
): Promise<void> {
    const result = await graphql(`
        query {
            allMarkdownRemark {
                nodes {
                    fileAbsolutePath
                    frontmatter {
                        authorid
                        day
                        id
                        keywords
                        source_url
                        title
                        img_credit
                    }
                    fields {
                        slug
                        category
                    }
                }
            }
        }
    `);

    if (!result || !result.data) {
        return;
    }

    const { data } = result;

    if (!isArticleData(data)) {
        return;
    }

    await Promise.all(
        data.allMarkdownRemark.nodes.map(async ({ fields }: MDRemarkNode) => {
            const component = resolve('./src/templates/ArticlePage.tsx');

            if (!component) {
                return;
            }

            // eslint-disable-next-line no-console
            console.log('Creating ArticlePage', fields.slug);

            await createPage({
                path: fields.slug,
                component,
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: fields.slug,
                    category: fields.category,
                },
            });
        })
    );
}

async function createAuthorPages(
    createPage: <TContext = Record<string, unknown>>(
        args: Page<TContext>
    ) => void,
    graphql: <TData, TVariables = any>(
        query: string,
        variables?: TVariables | undefined
    ) => Promise<{
        errors?: any;
        data?: TData | undefined;
    }>
): Promise<void> {
    const result = await graphql(`
        query {
            allAuthorsJson {
                nodes {
                    bio
                    contact
                    fname
                    id
                    lname
                    url
                    urlname
                    fields {
                        slug
                        authorimg
                        authorid
                    }
                }
            }
        }
    `);

    if (!result || !result.data) {
        return;
    }

    const { data } = result;

    if (!isAuthorsJsonData(data)) {
        return;
    }

    await Promise.all(
        data.allAuthorsJson.nodes.map(async ({ fields }: AuthorsJsonNode) => {
            const component = resolve('./src/templates/AuthorPage.tsx');

            if (!component) {
                return;
            }

            // eslint-disable-next-line no-console
            console.log('Creating AuthorPage', fields.slug);

            await createPage({
                path: fields.slug,
                component,
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: fields.slug,
                    authorimg: fields.authorimg,
                    authorid: fields.authorid,
                },
            });
        })
    );
}

export const createPages: GatsbyNode['createPages'] = async ({
    actions,
    graphql,
}) => {
    const { createPage } = actions;
    await createAuthorPages(createPage, graphql);
    await createArticlePages(createPage, graphql);
};
