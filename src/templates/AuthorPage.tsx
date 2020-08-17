import { graphql, PageProps } from 'gatsby';
import React from 'react';
import Layout from '../layouts/default-layout';

export interface AuthorsJsonNode {
    bio: string;
    contact: string;
    fname: string;
    id: string;
    lname: string;
    url: string;
    urlname: string;
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
        <Layout>
            <div>
                <div className="container">
                    <div className="row">
                        <div
                            className="col-sm-12 pad-bot-20"
                            style={{
                                paddingTop: '20px',
                                textAlign: 'center',
                                display: 'table-cell !important',
                                verticalAlign: 'middle !important',
                            }}
                        >
                            <div className="row">
                                <div className="col-sm-4" />
                                <div className="col-sm-4 pad-bot-20">
                                    <img
                                        alt={`${author.fname} ${author.lname}`}
                                        src="./profiel.png"
                                        style={{ width: '190px' }}
                                    />
                                </div>
                                <div className="col-sm-4" />
                            </div>
                            <div className="row">
                                <div className="col-sm-3" />
                                <div className="col-sm-6">
                                    <h5
                                        className="hv-article-title hv-auth-name"
                                        id="hv-auth-name"
                                    >{`${author.fname} ${author.lname}`}</h5>
                                    <p
                                        className="hv-auth-bio"
                                        id="hv-auth-bio"
                                        dangerouslySetInnerHTML={{
                                            __html: author.bio,
                                        }}
                                    />
                                    <p className="hv-auth-links">
                                        <i className="fa fa-link hv-auth-info-fa" />
                                        <a
                                            id="hv-auth-link"
                                            href={author.url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {author.urlname}
                                        </a>
                                        <br />
                                        <i className="fa fa-envelope hv-auth-info-fa" />
                                        <a
                                            id="hv-auth-mail"
                                            href={`mailto:${author.contact}`}
                                        >
                                            {author.contact}
                                        </a>
                                    </p>
                                </div>
                                <div className="col-sm-3" />
                            </div>
                            <h2
                                id="hv-most-recent-mr"
                                className="hv-c-default hv-category-title"
                                style={{ paddingTop: '20px' }}
                            >
                                DOOR
                            </h2>

                            <div
                                className="row"
                                style={{ paddingTop: '-50px' }}
                            >
                                <div className="col-sm-3" />
                                <div className="col-sm-6 pad-bot-20">
                                    <div
                                        id="author-chart"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div className="col-sm-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
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
            url
            urlname
        }
    }
`;