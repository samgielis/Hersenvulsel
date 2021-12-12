import React from 'react';
import SEO from '../components/seo';
import Layout from '../layouts/default-layout';
import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { Category } from '../types/Category';
import { ArticleTileData } from '../components/ArticleCollection/ArticleTile';
import ArticleCollection from '../components/ArticleCollection';
import { SpotlightArticle } from '../components/SpotlightArticle';
import { Stack } from '@chakra-ui/layout';

interface RawArticleData {
    node: {
        excerpt?: string
        frontmatter: {
            id: string;
            day: string;
        };
        rawMarkdownBody: string;
        fileAbsolutePath: string;
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


type IndexPageData = {
    site: {
        siteMetadata: {
            spotlightArticleIds: string[]
        }
    }
    rawArticles: {
        edges: RawArticleData[];
    };
    rawArticleThumbnails: {
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

function getArticleCategoryFromAbsolutePath(path: string): Category {
    const regexResult = path.match(/\/articles\/([^/]+)\//);
    if (!regexResult || regexResult.length < 2) {
        return 'wetenschap';
    }
    return regexResult[1] as Category;
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
        excerpt: data.node.excerpt,
    };
}

const IndexPage = (): JSX.Element => {
    const { site, rawArticles, rawArticleThumbnails }: IndexPageData = useStaticQuery(graphql`
        query homepageQuery {
            site {
                siteMetadata {
                    spotlightArticleIds
                }
            }
            rawArticles: allMarkdownRemark {
                edges {
                    node {
                        excerpt(pruneLength: 200)
                        frontmatter {
                            id
                            day
                        }
                        rawMarkdownBody
                        fileAbsolutePath
                    }
                }
            }
            rawArticleThumbnails: allFile(
                filter: { relativePath: { regex: "/main/" } }            ) {
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
    `);

    const thumbnailImages = rawArticleThumbnails.edges;
    const articles = rawArticles.edges.map((rawData) => {
        const correspondingThumbnail = findImageForArticle(
            rawData.node.frontmatter.id,
            thumbnailImages
        );
        return rawArticleToThumbnailData(rawData, correspondingThumbnail);
    });

    console.log(articles.map(a => a.image))
    const spotlightArticleId = site.siteMetadata.spotlightArticleIds[0];
    let spotlightArticle: ArticleTileData | undefined = undefined;
    const articlesWithoutSpotlight = articles.filter(article => {
        if (article.id === spotlightArticleId) {
            spotlightArticle = article;
            return false;
        }
        return true;
    })
    //const [mostRecentArticle, ...otherArticles] = sortCollection(articlesWithoutSpotlight, "NEWEST_FIRST");

    if (!spotlightArticle) {
        return <></>;
    }
    return (
        <Layout containerSize='lg' >
            <SEO title="Home"/>
            <Stack spacing={20}>
                <SpotlightArticle article={spotlightArticle} />
                <ArticleCollection articles={articlesWithoutSpotlight} collectionTitle={'Meer artikels'} />
            </Stack>
        </Layout>
    );
}

export default IndexPage;
