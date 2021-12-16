import { Box, Heading, Spacer, VStack } from '@chakra-ui/layout';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { CustomThemeProvider } from '../components/CustomThemeProvider';
import SEO from '../components/seo';

interface AllArticlesData {
    articles: {
        nodes: {
            fields: {
                slug: string
            }
        }[]
    }
    brains: {
        childImageSharp: {
            fixed: {
                src: string
            }
        }
    }
}

const NotFoundPage = (): JSX.Element => {
    const { articles, brains } = useStaticQuery<AllArticlesData>(graphql`
        query categoryArticles {
            articles: allMarkdownRemark {
                nodes {
                fields {
                    slug
                }
                }
            }
            brains: file(relativePath: { eq: "hv-footer.png" }) {
                childImageSharp {
                    fixed {
                        src
                    }
                }
            }
        }
    `);

    const chosenArticle = articles.nodes[Math.floor(Math.random() * articles.nodes.length)];
    const chosenArticleURL = chosenArticle.fields.slug;

    const [dotcount, setDotcount] = useState(0)
    const [completionCount, setCompletionCount] = useState(0)
  
    useEffect(() => {
        setTimeout(() => { setDotcount((dotcount + 1)%4 )}, 500)
    }, [dotcount])
    
    useEffect(() => {
        setTimeout(() => { setCompletionCount(1)})
        setTimeout(() => { window.location.href = "/" + chosenArticleURL }, 2000)
    }, [])
    return <CustomThemeProvider>
        <SEO title="Random" />
        <Box bgColor={"hersenvulsel.highlight"} w="100vw" h="100vh" p={5} textTransform="uppercase" color="white">
            <VStack m="auto" h="100%" w="100%">
                <Spacer />
                <Box pb={10} opacity={completionCount} transition={"opacity 2s ease-in-out"} >
                                <img
                                width="200px"
                                    src={brains.childImageSharp.fixed.src}
                                />
                            </Box>
                        <Heading size="3xl">
                        /random
                    </Heading>
                    <Heading bgColor={"hersenvulsel.darkgray"} p={2} size="lg">
                        Avontuur berekenen
                        <Box as="span" opacity={dotcount > 0 ? 1 : 0}>.</Box>
                        <Box as="span" opacity={dotcount > 1 ? 1 : 0}>.</Box>
                        <Box as="span" opacity={dotcount > 2 ? 1 : 0}>.</Box>
                    </Heading>
                <Spacer />
            </VStack>
        </Box>
    </CustomThemeProvider>
};

export default NotFoundPage;
