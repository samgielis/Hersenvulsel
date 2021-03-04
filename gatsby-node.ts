/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
import { resolve } from 'path';
import { Actions, CreatePagesArgs, GatsbyNode, Node } from 'gatsby';
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

export const createPages: GatsbyNode['createPages'] = async (args: CreatePagesArgs) => {
    await createAuthorPages(args);
};


/* AUTHOR PAGES */
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

async function createAuthorPages({ actions, graphql }: CreatePagesArgs) {
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

    if (isAuthorsJsonData(data)) {
        await Promise.all(
            data.allAuthorsJson.nodes.map(authorNode => createAuthorPage(actions, authorNode))
        );
    }

}

async function createAuthorPage(actions: Actions, { fields }: AuthorsJsonNode): Promise<void> {
    const { createPage } = actions;
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
}