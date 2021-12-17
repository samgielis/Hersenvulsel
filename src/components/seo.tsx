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
    keywords?: string[];
    socialImageUrl?: string;
    disableAds?: boolean;
}

const SEO = ({
    description = '',
    lang = 'en',
    meta = [],
    title,
    keywords,
    socialImageUrl = "",
    disableAds,
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
                    property: `og:image`,
                    content: socialImageUrl,
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
            <link rel="image_src" href={socialImageUrl} />
            {!disableAds && <script data-ad-client="ca-pub-4533326203427746" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>}
        </Helmet>
    );
};

export default SEO;
