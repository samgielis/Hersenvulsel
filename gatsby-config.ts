export const siteMetadata = {
    title: `Hersenvulsel`,
    description: `Hersenvulsel is een website boordevol interessante weetjes en entertainment.`,
    author: `Sam Gielis`,
    categories: [
        'Wetenschap',
        'Geschiedenis',
        'Mensen',
        'Natuur',
        'Entertainment',
        'Faits Divers',
    ],
};

export const plugins = [
    `gatsby-plugin-react-helmet`,
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
];
