const siteUrl = `https://hersenvulsel.be`;

export const siteMetadata = {
    title: `Hersenvulsel`,
    description: `Hersenvulsel is een website boordevol interessante weetjes en entertainment.`,
    author: `Sam Gielis`,
    siteUrl,
    categories: [
        'Wetenschap',
        'Geschiedenis',
        'Mensen',
        'Natuur',
        'Entertainment',
        'Faits Divers',
    ],
    spotlightArticleIds: ['belle-en-het-beest-gearrangeerd-huwelijk'],
};

export const plugins = [
    `gatsby-plugin-react-helmet`,

    {
        resolve: `gatsby-plugin-google-gtag`,
        options: {
            // You can add multiple tracking ids and a pageview event will be fired for all of them.
            trackingIds: [
                "G-GV5CW60KGE", // Google Analytics / GA4
            ],
            // This object gets passed directly to the gtag config command
            // This config will be shared across all trackingIds
            gtagConfig: {
                anonymize_ip: true,
                cookie_expires: 0,
            },
            // This object is used for configuration specific to this plugin
            pluginConfig: {
                // Puts tracking script in the head instead of the body
                head: true,
                // Setting this parameter is also optional
                respectDNT: true,
            },
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `images`,
            path: `${__dirname}/src/images`,
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `authorimages`,
            path: `${__dirname}/data/authors`,
        },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
        resolve: `gatsby-plugin-manifest`,
        options: {
            name: `gatsby-starter-default`,
            short_name: `starter`,
            start_url: `/`,
            background_color: `#663399`,
            theme_color: `#663399`,
            display: `minimal-ui`,
            icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
        },
    },
    `gatsby-transformer-json`,
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            name: 'articles',
            path: 'data/articles',
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `authors`,
            path: 'data/authors',
        },
    },
    `@chakra-ui/gatsby-plugin`,
    {
        resolve: `gatsby-plugin-sitemap`,
        options: {
            query: `
            {
              allSitePage {
                nodes {
                  path
                }
              }
          }`,
            resolveSiteUrl: () => siteUrl,
            serialize: (props: { path: string }) => {
                console.log("Data", props)
                return {
                    url: `${siteUrl}${props.path}`,
                    changefreq: `daily`,
                    priority: 0.7,
                    lastmod: new Date().toISOString()
                }
            }
        }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
];
