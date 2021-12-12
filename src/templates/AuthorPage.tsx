import { graphql, PageProps } from 'gatsby';
import React from 'react';
import { FluidObject } from 'gatsby-image';
import Layout from '../layouts/default-layout';
import SEO from '../components/seo';
import ArticleCollection, {
} from '../components/ArticleCollection';
import { ProfileDetails } from '../components/pagespecific/AuthorPage/ProfileDetails';
import { Stack } from '@chakra-ui/layout';
import { ArticleTileData } from '../components/ArticleCollection/ArticleTile';


interface RawArticleData {
    node: {
        frontmatter: {
            id: string;
            day: string;
        };
        rawMarkdownBody: string;
        fileAbsolutePath: string;
    };
}

export interface AuthorsJsonNode {
    bio: string;
    contact: string;
    fname: string;
    authorhandle: string;
    lname: string;
    url: string;
    urlname: string;
    fields: {
        slug: string;
        authorimg: string;
        authorhandle: string;
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

function getArticleTitleFromRawMarkdown(raw: string): string {
    const regexResult = raw.match(/# ([^\n]+)\n/);
    if (!regexResult || regexResult.length < 2) {
        return '';
    }
    return regexResult[1];
}

function getArticleCategoryFromAbsolutePath(path: string): string {
    const regexResult = path.match(/\/articles\/([^/]+)\//);
    if (!regexResult || regexResult.length < 2) {
        return '';
    }
    return regexResult[1];
}

function rawArticleToThumbnailData(
    data: RawArticleData,
    image?: FluidObject
): ArticleTileData {
    return {
        title: getArticleTitleFromRawMarkdown(data.node.rawMarkdownBody),
        category: getArticleCategoryFromAbsolutePath(
            data.node.fileAbsolutePath
        ),
        id: data.node.frontmatter.id,
        image,
        publishDate: new Date(data.node.frontmatter.day),
    };
}

export default function AuthorPage({
    data,
}: PageProps<AuthorPageDataType, any>): JSX.Element {
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
        <Layout containerSize='lg'>
            <SEO title={`${author.fname} ${author.lname}`} />
            <Stack spacing={20}>
                <ProfileDetails author={author} profileImgURL={imgUrl} />
                <ArticleCollection articles={articles} collectionTitle={`DOOR ${author.fname} (${articles.length})`} />
            </Stack>
        </Layout>
    );
}

export const query = graphql`
    query($slug: String!, $authorimg: String!, $authorhandle: String!) {
        authorsJson(fields: { slug: { eq: $slug } }) {
            bio
            contact
            fname
            authorhandle
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
            filter: { frontmatter: { authorhandle: { eq: $authorhandle } } }
        ) {
            edges {
                node {
                    frontmatter {
                        id
                        day
                    }
                    rawMarkdownBody
                    fileAbsolutePath
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
