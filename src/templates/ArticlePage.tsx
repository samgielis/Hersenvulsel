import { graphql, PageProps } from 'gatsby';
import React from 'react';
import CategoryTitle from '../components/CategoryTitle';
import ArticleBody, {
    FluidArticleImageData,
} from '../components/pagespecific/ArticlePage/ArticleBody';
import AuthorAndDate from '../components/pagespecific/ArticlePage/AuthorAndDate';
import MainArticleImage from '../components/pagespecific/ArticlePage/MainArticleImage';
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
            img_credit: string;
            day: string;
            source_name: string;
            source_url: string;
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
    author: {
        authorhandle: string;
        bio: string;
        contact: string;
        count: string;
        fname: string;
        lname: string;
        url: string;
        urlname: string;
    };
    authorImage: {
        fluid: {
            src: string;
        };
    };
}

export default function ArticlePage({
    data,
}: PageProps<ArticlePageDataType, any>): JSX.Element {
    const { markdownRemark, images, author, authorImage } = data;
    const { fields, frontmatter, rawMarkdownBody } = markdownRemark;
    const mainImage = images.edges.find(
        (edge) => edge.node.childImageSharp.fluid.originalName === 'main.jpg'
    );
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
                            <AuthorAndDate
                                authorhandle={author.authorhandle}
                                authorName={`${author.fname} ${author.lname}`}
                                authorImageSrc={authorImage.fluid.src}
                                dateString={frontmatter.day}
                            />
                        </div>
                    </div>

                    <div className="col-sm-3 col-sm-offset-1 blog-sidebar" />

                    <div className="col-sm-8 blog-main">
                        <MainArticleImage
                            srcSet={
                                mainImage?.node.childImageSharp.fluid.srcSet ||
                                ''
                            }
                            credit={frontmatter.img_credit}
                        />
                        <ArticleBody
                            rawMarkdownBody={rawMarkdownBody}
                            images={images.edges.map(
                                (edge) => edge.node.childImageSharp.fluid
                            )}
                            sourceName={markdownRemark.frontmatter.source_name}
                            sourceUrl={markdownRemark.frontmatter.source_url}
                        />

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
    query($slug: String!, $authorhandle: String!, $authorimg: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            rawMarkdownBody
            fields {
                slug
                category
            }
            frontmatter {
                title
                img_credit
                day
                source_name
                source_url
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
        author: authorsJson(authorhandle: { eq: $authorhandle }) {
            authorhandle
            bio
            contact
            count
            fname
            lname
            url
            urlname
        }
        authorImage: imageSharp(
            fluid: { originalName: { regex: $authorimg } }
        ) {
            fluid {
                src
            }
        }
    }
`;
