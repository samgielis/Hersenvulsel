import React from 'react';
import { AspectRatio, Box, Heading, Text } from "@chakra-ui/layout";
import { Link } from "gatsby";
import Img, { FluidObject } from "gatsby-image";

export interface ArticleTileData {
    title: string;
    category: string;
    id: string;
    image?: FluidObject;
    publishDate: Date;
}

export const ArticleTile = ({ title, category, id, image }: Omit<ArticleTileData, "publishDate">) => {
    return (
        <AspectRatio ratio={16 / 9} backgroundColor="black">
            <Box>
                {image ? (
                    <Img
                        alt={title}
                        fluid={image}
                        style={{
                            width: '100%',
                            height: "100%",
                            opacity: ".7"
                        }}
                    />
                ) : (
                    <div />
                )}
                <b>
                    <Text textTransform="uppercase" className="hv-tile-category">{category}</Text>
                </b>

                <Heading m={2} size="2xl" textAlign="center" as="h2" fontWeight="normal" className="hv-tile-title hv-tile-title-default">
                    <span>
                        <Link
                            to={`/${category}/${id}/`}
                            className="thumblink"
                        >
                            {title}
                        </Link>
                    </span>
                </Heading>
            </Box>
        </AspectRatio>
    );
};
