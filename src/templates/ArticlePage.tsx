import { graphql, PageProps } from 'gatsby';
import React from 'react';
import CategoryTitle from '../components/CategoryTitle';
import ArticleBody, {
    FluidArticleImageData,
} from '../components/pagespecific/ArticlePage/ArticleBody';
import SEO from '../components/seo';
import Layout from '../layouts/default-layout';
import { Category } from '../types/Category';

interface ArticlePageDataType {
    markdownRemark: {
        rawMarkdownBody: string;
        fields: {
            slug: string;
            category: Category;
        };
        frontmatter: {
            title: string;
        };
    };
    images: {
        edges: {
            node: {
                childImageSharp: {
                    fluid: FluidArticleImageData;
                };
            };
        }[];
    };
}

export default function ArticlePage({
    data,
}: PageProps<ArticlePageDataType, any>): JSX.Element {
    const { markdownRemark, images } = data;
    const { fields, frontmatter, rawMarkdownBody } = markdownRemark;
    return (
        <Layout category={fields.category}>
            <SEO title={frontmatter.title} />
            <div className="container">
                <div className="row">
                    <div
                        className="col-sm-8 blog-main"
                        style={{ paddingBottom: '20px' }}
                    >
                        <div
                            className="page-header hv-title-container"
                            id="hv-title-container"
                        >
                            <CategoryTitle category={fields.category} />
                            <h1
                                className="hv-article-title"
                                id="hv-article-title"
                            >
                                {frontmatter.title}
                            </h1>
                        </div>

                        <div className="row">
                            <div className="col-sm-8" id="author-and-date" />
                            <div className="col-sm-4">
                                <div id="share-buttons" />
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3 col-sm-offset-1 blog-sidebar" />

                    <div className="col-sm-8 blog-main">
                        <div
                            className="pull-left"
                            style={{ width: '100%', paddingBottom: '50px' }}
                        >
                            <figure>
                                <img
                                    alt="main article"
                                    src="./img/main.jpg"
                                    className="pull-left"
                                    style={{ float: 'left', maxWidth: '100%' }}
                                />
                                <figcaption
                                    className="hv-article-figcaption"
                                    id="hv-article-figcaption"
                                />
                            </figure>
                        </div>

                        <div className="row maintext-row">
                            <div
                                className="col-sm-5 maintext-col"
                                id="article_body"
                            >
                                <ArticleBody
                                    rawMarkdownBody={rawMarkdownBody}
                                    images={images.edges.map(
                                        (edge) =>
                                            edge.node.childImageSharp.fluid
                                    )}
                                />
                            </div>
                        </div>

                        <div className="col-sm-3 col-sm-offset-1 blog-sidebar">
                            <div
                                className="list-group"
                                id="hv-sidebar-newest-list"
                            >
                                <div
                                    className="list-group-item active hv-sidebar-head"
                                    id="hv-sidebar-newest-title"
                                />
                            </div>

                            <div
                                className="list-group"
                                id="hv-sidebar-more-x-list"
                            >
                                <div
                                    className="list-group-item active hv-sidebar-head"
                                    id="hv-sidebar-more-x-title"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            rawMarkdownBody
            fields {
                slug
                category
            }
            frontmatter {
                title
            }
        }
        images: allFile(
            filter: {
                relativeDirectory: { eq: $slug }
                extension: { regex: "/(jpg)|(png)|(gif)|(jpeg)/g" }
            }
        ) {
            edges {
                node {
                    childImageSharp {
                        fluid {
                            srcSet
                            originalName
                        }
                    }
                }
            }
        }
    }
`;
