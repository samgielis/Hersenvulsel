import { graphql, PageProps } from 'gatsby';
import React from 'react';
import Layout from '../layouts/default-layout';
import SEO from '../components/seo';
import './AuthorPage.css';

interface ArticlePageDataType {
    articleData: {
        frontmatter: {
            authorid: string;
            day: string;
            id: string;
            img_credit: string;
            keywords: string;
            source_url: string;
            title: string;
        };
        rawMarkdownBody: string;
        fields: {
            slug: string;
            title: string;
            category: string;
        };
    };
}
export default function ArticlePage({
    data,
}: PageProps<ArticlePageDataType, any>): JSX.Element {
    const article = data.articleData;

    return (
        <Layout>
            <SEO title={`${article.fields.title}`} />
            <div>{article.fields.title}</div>
        </Layout>
    );
}

export const query = graphql`
    query($slug: String!) {
        articleData: markdownRemark(fields: { slug: { eq: $slug } }) {
            frontmatter {
                authorid
                day
                id
                img_credit
                keywords
                source_url
                title
            }
            rawMarkdownBody
            fields {
                slug
                title
                category
            }
        }
    }
`;
