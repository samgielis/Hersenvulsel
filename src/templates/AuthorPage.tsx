import { graphql, PageProps } from 'gatsby';
import React from 'react';
import { FluidObject } from 'gatsby-image';
import Layout from '../layouts/default-layout';
import SEO from '../components/seo';
import './AuthorPage.css';
import ArticleCollection, {
    ArticleTileData,
} from '../components/ArticleCollection';

interface RawArticleData {
    node: {
        frontmatter: {
            id: string;
        };
        fields: {
            slug: string;
            category: string;
            title: string;
        };
    };
}

export interface AuthorsJsonNode {
    bio: string;
    contact: string;
    fname: string;
    id: string;
    lname: string;
    url: string;
    urlname: string;
    fields: {
        slug: string;
        authorimg: string;
        authorid: string;
    };
}

interface ImageNode {
    node: {
        absolutePath: string;
        childImageSharp: {
            fluid: FluidObject;
        };
    };
}

interface AuthorPageDataType {
    authorsJson: AuthorsJsonNode;
    allFile: {
        nodes: {
            childImageSharp: {
                fixed: {
                    src: string;
                };
            };
        }[];
    };
    allMarkdownRemark: {
        edges: RawArticleData[];
    };
    articleThumbnails: {
        edges: ImageNode[];
    };
}

function findImageForArticle(
    articleId: string,
    images: ImageNode[]
): FluidObject | undefined {
    const result = images.filter((image) => {
        return image.node.absolutePath.indexOf(articleId) > -1;
    });
    if (result.length > 0) {
        return result[0].node.childImageSharp.fluid;
    }
    return undefined;
}

function rawArticleToThumbnailData(
    data: RawArticleData,
    image?: FluidObject
): ArticleTileData {
    return {
        title: data.node.fields.title,
        category: data.node.fields.category,
        id: data.node.frontmatter.id,
        image,
    };
}

const AuthorPage = ({
    data,
}: PageProps<AuthorPageDataType, any>): JSX.Element => {
    const author = data.authorsJson;
    const imgUrl = data.allFile.nodes[0].childImageSharp.fixed.src;
    const thumbnailImages = data.articleThumbnails.edges;
    const articles = data.allMarkdownRemark.edges.map((rawData) => {
        const correspondingThumbnail = findImageForArticle(
            rawData.node.frontmatter.id,
            thumbnailImages
        );
        return rawArticleToThumbnailData(rawData, correspondingThumbnail);
    });
    return (
        <Layout>
            <SEO title={`${author.fname} ${author.lname}`} />
            <div>
                <div className="container">
                    <div className="row">
                        <div
                            className="col-sm-12 pad-bot-20"
                            style={{
                                paddingTop: '20px',
                                textAlign: 'center',
                                display: 'table-cell !important',
                                verticalAlign: 'middle !important',
                            }}
                        >
                            <div className="row">
                                <div className="col-sm-4" />
                                <div className="col-sm-4 pad-bot-20">
                                    <img
                                        alt={`${author.fname} ${author.lname}`}
                                        src={imgUrl}
                                        style={{ width: '190px' }}
                                    />
                                </div>
                                <div className="col-sm-4" />
                            </div>
                            <div className="row">
                                <div className="col-sm-3" />
                                <div className="col-sm-6">
                                    <h5
                                        className="hv-article-title hv-auth-name"
                                        id="hv-auth-name"
                                    >{`${author.fname} ${author.lname}`}</h5>
                                    <p
                                        className="hv-auth-bio"
                                        id="hv-auth-bio"
                                        dangerouslySetInnerHTML={{
                                            __html: author.bio,
                                        }}
                                    />
                                    <p className="hv-auth-links">
                                        <i className="fa fa-link hv-auth-info-fa" />
                                        <a
                                            id="hv-auth-link"
                                            href={author.url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {author.urlname}
                                        </a>
                                        <br />
                                        <i className="fa fa-envelope hv-auth-info-fa" />
                                        <a
                                            id="hv-auth-mail"
                                            href={`mailto:${author.contact}`}
                                        >
                                            {author.contact}
                                        </a>
                                    </p>
                                </div>
                                <div className="col-sm-3" />
                            </div>
                            <h2
                                id="hv-most-recent-mr"
                                className="hv-c-default hv-category-title"
                                style={{ paddingTop: '20px' }}
                            >
                                DOOR {author.fname} ({articles.length})
                            </h2>

                            <div
                                className="row"
                                style={{ paddingTop: '-50px' }}
                            >
                                <div className="col-sm-3" />
                                <div className="col-sm-6 pad-bot-20">
                                    <div
                                        id="author-chart"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div className="col-sm-3" />
                            </div>

                            <ArticleCollection articles={articles} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AuthorPage;

export const query = graphql`
    query($slug: String!, $authorimg: String!, $authorid: String!) {
        authorsJson(fields: { slug: { eq: $slug } }) {
            bio
            contact
            fname
            id
            lname
            url
            urlname
        }
        allFile(
            filter: {
                sourceInstanceName: { eq: "authorimages" }
                relativePath: { regex: $authorimg }
            }
        ) {
            nodes {
                childImageSharp {
                    fixed {
                        src
                    }
                }
            }
        }
        allMarkdownRemark(
            filter: { frontmatter: { authorid: { eq: $authorid } } }
        ) {
            edges {
                node {
                    frontmatter {
                        id
                    }
                    fields {
                        category
                        slug
                        title
                    }
                }
            }
        }
        articleThumbnails: allFile(
            filter: { relativePath: { regex: "/main.jpg/g" } }
        ) {
            edges {
                node {
                    absolutePath
                    childImageSharp {
                        fluid(maxWidth: 300) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;
