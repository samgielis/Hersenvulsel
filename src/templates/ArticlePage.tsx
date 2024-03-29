import { Heading, Stack } from '@chakra-ui/layout';
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
            keywords: string[];
        };
        excerpt: string;
    };
    images: {
        edges: {
            node: {
                childImageSharp: {
                    fluid: FluidArticleImageData;
                    original?: {
                        src?: string;
                    }
                },
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
    const { fields, frontmatter, rawMarkdownBody, excerpt } = markdownRemark;
    const mainImage = images.edges.find(
        (edge) => edge.node.childImageSharp.fluid.originalName === 'main.jpg'
    );
    return (
        <Layout>
            <SEO title={frontmatter.title} keywords={frontmatter.keywords} description={excerpt} socialImageUrl={mainImage?.node.childImageSharp.original?.src} />
            <Stack w="100%" spacing={8}>
                <div>
                    <div
                    >
                        <CategoryTitle category={fields.category} />
                        <Heading
                            size="3xl"
                            as="h1"
                            className="hv-article-title"
                        >
                            {frontmatter.title}
                        </Heading>
                    </div>

                    <AuthorAndDate
                        authorhandle={author.authorhandle}
                        authorName={`${author.fname} ${author.lname}`}
                        authorImageSrc={authorImage.fluid.src}
                        dateString={frontmatter.day}
                    />
                </div>
                <div>
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
                </div>
            </Stack>
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
                keywords
            }
            excerpt(pruneLength: 200)
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
                        original {
                            src
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
