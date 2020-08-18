/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
import { resolve } from 'path';
import { GatsbyNode, Node, Page } from 'gatsby';
import { AuthorsJsonNode } from './src/templates/AuthorPage';

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
};
