import React from 'react';
import { AspectRatio, Box, Heading, LinkBox, LinkOverlay, SimpleGrid, Spacer, Stack, Text } from "@chakra-ui/layout"
import { ArticleTileData } from "../ArticleCollection/ArticleTile"
import Img from "gatsby-image";
import CategoryTitle from "../CategoryTitle";
import { Link } from '../Link';

interface ArticleHighlightProps {
    article: ArticleTileData;
}

export const ArticleHighlight = ({ article }: ArticleHighlightProps) => {
    const { image, title, category, id, publishDate, excerpt } = article;
    const articleURL = `/${category}/${id}/`;
    return <LinkBox>
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <AspectRatio ratio={16 / 11}>
            {image && <Img
                alt={title}
                fluid={image}
                style={{
                    position: "",
                }}
            />}
        </AspectRatio>
        <Box>
            <Stack minH="100%" spacing={10}>
                <Box>
                    <CategoryTitle category={category} />
                    <LinkOverlay as={Link} to={articleURL} _hover={{ color: `black` }}>
                        <Heading size="3xl">{title}</Heading>
                    </LinkOverlay>
                </Box>
                <Spacer />
                <Box>
                    <Text fontSize="3xl" fontWeight="bold">{publishDate.toLocaleDateString()}</Text>
                    <Text fontSize="4xl" >{excerpt}</Text>
                    <Link fontSize="2xl" to={articleURL} _hover={{ color: `hersenvulsel.${category}` }} color={`hersenvulsel.${category}`} textTransform="uppercase" fontWeight="bold">
                        Lees meer
                    </Link>
                </Box>
            </Stack>
        </Box>
    </SimpleGrid>
    </LinkBox>
}
