import { Actions, CreatePagesArgs, Node } from 'gatsby';
import { resolve } from 'path';

interface ArticleNode extends Node {
    frontmatter: {
        id: string;
        authorhandle: string;
    };
    fileAbsolutePath: string;
    fields: {
        slug: string;
        category: string;
        authorhandle: string;
        authorimg: string;
    };
}
interface ArticleMarkdownData {
    allMarkdownRemark: {
        nodes: ArticleNode[];
    };
}

function isArticleData(data: any): data is ArticleMarkdownData {
    return data && data.allMarkdownRemark && data.allMarkdownRemark.nodes;
}

export function isArticleMarkdownNode(node: any): node is ArticleNode {
    return node.internal.owner === 'gatsby-transformer-remark';
}

export function enrichArticleNode(
    node: ArticleNode,
    { createNodeField }: Actions
) {
    const slugRegex = /\/articles\/(\S+)\/article.md/gm;
    const regexResult = slugRegex.exec(node.fileAbsolutePath);
    const slug = regexResult && regexResult[1];
    const category = slug?.split('/')[0];
    createNodeField({
        node,
        name: `slug`,
        value: slug,
    });
    createNodeField({
        node,
        name: `category`,
        value: category,
    });
    createNodeField({
        node,
        name: `authorimg`,
        value: `/${node.frontmatter.authorhandle}.png/g`,
    });
    createNodeField({
        node,
        name: `authorhandle`,
        value: node.frontmatter.authorhandle,
    });
}

async function createArticlePage(
    actions: Actions,
    { fields }: ArticleNode
): Promise<void> {
    const { createPage } = actions;
    const component = resolve('./src/templates/ArticlePage.tsx');

    if (!component) {
        throw new Error('Something went wrong generating Article pages');
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
            authorhandle: fields.authorhandle,
            authorimg: fields.authorimg,
        },
    });
}

export async function createArticlePages({
    actions,
    graphql,
}: CreatePagesArgs) {
    const result = await graphql(`
        query {
            allMarkdownRemark {
                nodes {
                    frontmatter {
                        id
                        authorhandle
                    }
                    fileAbsolutePath
                    fields {
                        slug
                        authorimg
                        authorhandle
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

    if (isArticleData(data)) {
        await Promise.all(
            data.allMarkdownRemark.nodes.map((articleNode) =>
                createArticlePage(actions, articleNode)
            )
        );
    }
}
