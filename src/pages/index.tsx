import React from 'react';
import SEO from '../components/seo';
import Layout from '../layouts/default-layout';
import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { Category } from '../types/Category';
import { ArticleTileData } from '../components/ArticleCollection/ArticleTile';
import ArticleCollection, { sortCollection } from '../components/ArticleCollection';
import { SpotlightArticle } from '../components/SpotlightArticle';
import { SimpleGrid, Stack } from '@chakra-ui/layout';
import { SecondarySpotlightArticle } from '../components/SecondarySpotlightArticle';

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
    let sortedArticles = sortCollection(articlesWithoutSpotlight, "NEWEST_FIRST");
    const wetenschapSpotlight = sortedArticles.find(article => article.category === "wetenschap");
    const geschiedenisSpotlight = sortedArticles.find(article => article.category === "geschiedenis");
    const mensenSpotlight = sortedArticles.find(article => article.category === "mensen");
    const natuurSpotlight = sortedArticles.find(article => article.category === "natuur");
    const entertainmentSpotlight = sortedArticles.find(article => article.category === "entertainment");
    const faitsdiversSpotlight = sortedArticles.find(article => article.category === "faitsdivers");

    const leftoverArticles = sortedArticles.filter(article => {
        return article.id !== wetenschapSpotlight?.id && article.id !== geschiedenisSpotlight?.id && article.id !== mensenSpotlight?.id
        && article.id !== natuurSpotlight?.id && article.id !== entertainmentSpotlight?.id && article.id !== faitsdiversSpotlight?.id
    })

    if (!spotlightArticle) {
        return <></>;
    }

    return (
        <Layout containerSize='lg' >
            <SEO title="Home"/>
            <Stack spacing={40}>
                <SpotlightArticle article={spotlightArticle} />
                <SimpleGrid columns={{base: 1, md: 3}} spacingX={12} spacingY={16}>
                    {wetenschapSpotlight && <SecondarySpotlightArticle article={wetenschapSpotlight} />}
                    {geschiedenisSpotlight && <SecondarySpotlightArticle article={geschiedenisSpotlight} />}
                    {mensenSpotlight && <SecondarySpotlightArticle article={mensenSpotlight} />}
                    {natuurSpotlight && <SecondarySpotlightArticle article={natuurSpotlight} />}
                    {entertainmentSpotlight && <SecondarySpotlightArticle article={entertainmentSpotlight} />}
                    {faitsdiversSpotlight && <SecondarySpotlightArticle article={faitsdiversSpotlight} />}
                </SimpleGrid>
                <ArticleCollection articles={leftoverArticles} collectionTitle={'Meer artikels'} />
            </Stack>
        </Layout>
    );
}

export default IndexPage;
