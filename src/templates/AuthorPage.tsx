import { graphql, PageProps } from 'gatsby';
import React from 'react';

export interface AuthorsJsonNode {
    bio: string;
    contact: string;
    fname: string;
    id: string;
    lname: string;
    fields: {
        slug: string;
    };
}

interface AuthorPageDataType {
    authorsJson: AuthorsJsonNode;
}
export default function AuthorPage({
    data,
}: PageProps<AuthorPageDataType, any>): JSX.Element {
    const author = data.authorsJson;
    return (
        <div>
            {author.fname} {author.lname}
        </div>
    );
}

export const query = graphql`
    query($slug: String!) {
        authorsJson(fields: { slug: { eq: $slug } }) {
            bio
            contact
            fname
            id
            lname
        }
    }
`;
