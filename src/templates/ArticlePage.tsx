import { graphql, PageProps } from 'gatsby';
import React from 'react';
import CategoryTitle from '../components/CategoryTitle';
import SEO from '../components/seo';
import Layout from '../layouts/default-layout';
import { Category } from '../types/Category';

interface ArticlePageDataType {
    markdownRemark: {
        html: string;
        fields: {
            slug: string;
            category: Category;
        };
        frontmatter: {
            title: string;
        };
    };
}

export default function ArticlePage({
    data,
}: PageProps<ArticlePageDataType, any>): JSX.Element {
    const { markdownRemark } = data;
    const { fields, frontmatter, html } = markdownRemark;
    return (
        <Layout category={fields.category}>
            <SEO title={frontmatter.title} />
            <CategoryTitle category={fields.category} />

            <div>This is an article, {fields?.slug}</div>
            <div>In the category, {fields?.category}</div>
            <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </Layout>
    );
}

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            fields {
                slug
                category
            }
            frontmatter {
                title
            }
        }
    }
`;
