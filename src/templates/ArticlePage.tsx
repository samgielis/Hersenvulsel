import { graphql, PageProps } from 'gatsby';
import React from 'react';

export default function ArticlePage({
    data,
}: PageProps<any, any>): JSX.Element {
    return <div>This is an article, {data}</div>;
}

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            fields {
                slug
            }
        }
    }
`;
