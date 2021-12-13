/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function createStyleSheetNode(href: string): HTMLLinkElement {
    const node = document.createElement('link');
    node.type = 'text/css';
    node.href = href;
    node.rel = 'stylesheet';
    return node;
}
interface SEOProperties {
    description?: string;
    lang?: string;
    meta?: HTMLMetaElement[];
    title: string;
    keywords?: string[];
}

const SEO = ({
    description = '',
    lang = 'en',
    meta = [],
    title,
    keywords,
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

    useEffect(() => {
        document.head.prepend(
            createStyleSheetNode(
                'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'
            )
        );
        document.head.prepend(
            createStyleSheetNode(
                'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'
            )
        );
    }, []);

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
                {
                    name: 'google-site-verification',
                    content: 'SqwmsNtaL3wujyp36G3HDwQF6qqmm4TeducdLnH8eIw',
                },
                {
                    name: 'keywords',
                    content: (keywords?.join(", ") || "") + ", weetjes, nieuws, wetenschap, entertainment, interessant, hersenen, geschiedenis, natuur, mensen, varia, trivia, wist je datjes, wist u dat",
                }
            ].concat(meta)}
        >
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js" />
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" />
        </Helmet>
    );
};

export default SEO;
