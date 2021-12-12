import { graphql, PageProps } from 'gatsby';
import React from 'react';
import { FluidObject } from 'gatsby-image';
import Layout from '../layouts/default-layout';
import SEO from '../components/seo';
import ArticleCollection, { sortCollection } from '../components/ArticleCollection';
import { Stack } from '@chakra-ui/layout';
import { ArticleTileData } from '../components/ArticleCollection/ArticleTile';
import { CategoryThemedHeading } from '../components/CategoryThemedHeading';
import { SpotlightArticle } from '../components/SpotlightArticle';
import { Category } from '../types/Category';

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

interface CategoryPageDataType {
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

type CategoryPageContext = {
    category: string;
    categoryRegex: string;
}

export default function CategoryPage({
    data,
    pageContext
}: PageProps<CategoryPageDataType, CategoryPageContext>): JSX.Element {
    const { category } = pageContext;
    const thumbnailImages = data.articleThumbnails.edges;
    const articles = data.allMarkdownRemark.edges.map((rawData) => {
        const correspondingThumbnail = findImageForArticle(
            rawData.node.frontmatter.id,
            thumbnailImages
        );
        return rawArticleToThumbnailData(rawData, correspondingThumbnail);
    });
    const [mostRecentArticle, ...otherArticles] = sortCollection(articles, "NEWEST_FIRST");
    return (
        <Layout containerSize='lg'>
            <SEO title={category} />
            <Stack spacing={40}>
                <Stack spacing={{base: 5, md: 10}}>
                    <CategoryThemedHeading size="2xl">Meest recent</CategoryThemedHeading>
                    <SpotlightArticle article={mostRecentArticle} />
                </Stack>
                <ArticleCollection articles={otherArticles} collectionTitle={'Meer artikels'} />
            </Stack>
        </Layout>
    );
}

export const query = graphql`
    query($categoryRegex: String!, $categoryThumbnailsRegex: String!) {
        allMarkdownRemark(
            filter: {fileAbsolutePath: {regex: $categoryRegex}}
        ) {
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
        articleThumbnails: allFile(
            filter: { relativePath: { regex: $categoryThumbnailsRegex } }
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
