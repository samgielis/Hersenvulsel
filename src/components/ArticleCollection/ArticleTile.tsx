import React from 'react';
import { AspectRatio, Box, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import Img, { FluidObject } from "gatsby-image";
import { Category } from '../../types/Category';
import { Link } from '../Link';

export interface ArticleTileData {
    title: string;
    category: Category;
    id: string;
    image?: FluidObject;
    publishDate: Date;
    excerpt?: string;
}

export const ArticleTile = ({ title, category, id, image }: Omit<ArticleTileData, "publishDate">) => {
    return (
        <LinkBox>
            <AspectRatio ratio={16 / 9} backgroundColor="black">
                <Box w="100%" h="100%">
                    {image ? (
                        <Img

                            alt={title}
                            fluid={image}
                            style={{
                                width: '100%',
                                height: "100%",
                                opacity: ".7",
                                position: "absolute",
                                zIndex: 0
                            }}
                        />
                    ) : (
                        <div />
                    )}

                        <Text textTransform="uppercase" className="hv-tile-category">{category}</Text>
                        <Box w="100%" zIndex={1}>

                            <Heading m={2} size="lg" textAlign="center" as="h2" fontWeight="normal" className="hv-tile-title hv-tile-title-default">
                                <span>
                        <LinkOverlay as={Link} to={`/${category}/${id}/`} _hover={{ textDecor: "none" }} className='thumblink' >
                                    {title}
                        </LinkOverlay>
                                </span>
                            </Heading>
                        </Box>
                </Box>
            </AspectRatio>
        </LinkBox>
    );
};
