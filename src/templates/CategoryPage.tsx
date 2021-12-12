import { graphql, PageProps } from 'gatsby';
import React from 'react';
import { FluidObject } from 'gatsby-image';
import Layout from '../layouts/default-layout';
import SEO from '../components/seo';
import ArticleCollection, {
} from '../components/ArticleCollection';
import { Stack } from '@chakra-ui/layout';
import { ArticleTileData } from '../components/ArticleCollection/ArticleTile';
import { CategoryThemedHeading } from '../components/CategoryThemedHeading';

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

type CategoryPageContext = {
    category: string;
    categoryRegex: string;
}

export default function CategoryPage({
    data,
    pageContext
}: PageProps<CategoryPageDataType, CategoryPageContext>): JSX.Element {
    const {category} = pageContext;
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
            <SEO title={category} />
            <Stack spacing={20}>
                <CategoryThemedHeading size="2xl">Meest recent</CategoryThemedHeading>
                <ArticleCollection articles={articles} collectionTitle={'Meer artikels'} />
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
