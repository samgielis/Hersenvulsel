import React from 'react';
import { AspectRatio, Box, Heading, LinkBox, LinkOverlay, Spacer, Stack, Text } from "@chakra-ui/layout"
import { ArticleTileData } from "../ArticleCollection/ArticleTile"
import Img from "gatsby-image";
import CategoryTitle from "../CategoryTitle";
import { Link } from '../Link';

interface SecondarySpotlightArticleProps {
    article: ArticleTileData;
}

export const SecondarySpotlightArticle = ({ article }: SecondarySpotlightArticleProps) => {
    const { image, title, category, id, publishDate, excerpt } = article;
    const articleURL = `/${category}/${id}/`;
    return <LinkBox>
        <Stack>
            <CategoryTitle category={category} />
            <AspectRatio ratio={16 / 11}>
                {image && <Img
                    alt={title}
                    fluid={image}
                    style={{
                        position: "",
                    }}
                    />}
            </AspectRatio>
            <LinkOverlay as={Link} to={articleURL} _hover={{ color: `black` }}>
                <Heading size="xl" minH={{base: "", md: "140px"}}>{title}</Heading>
            </LinkOverlay>
            <Spacer />
            <Box>
                    <Text fontSize="xl" fontWeight="bold">{publishDate.toLocaleDateString()}</Text>
                <Text fontSize="2xl" >{excerpt}</Text>
                <Link fontSize="lg" to={articleURL} _hover={{ color: `hersenvulsel.${category}` }} color={`hersenvulsel.${category}`} textTransform="uppercase" fontWeight="bold">
                    Lees meer
                </Link>
            </Box>
        </Stack>
    </LinkBox>
}
