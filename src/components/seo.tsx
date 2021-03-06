/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface SEOProperties {
    description?: string;
    lang?: string;
    meta?: HTMLMetaElement[];
    title: string;
}

const SEO = ({
    description = '',
    lang = 'en',
    meta = [],
    title,
}: SEOProperties): JSX.Element => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                    }
                }
            }
        `
    );

    const metaDescription = description || site.siteMetadata.description;

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`${site.siteMetadata.title} - %s`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
            ].concat(meta)}
        >
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
            />
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
            />
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js" />
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" />
        </Helmet>
    );
};

export default SEO;
