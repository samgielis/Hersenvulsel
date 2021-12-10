import React from 'react';
import './ArticleCollection.css';
import Img, { FluidObject } from 'gatsby-image';
import { AspectRatio, Box, Heading, SimpleGrid, Text } from '@chakra-ui/layout';
import { Link } from 'gatsby';

export interface ArticleTileData {
    title: string;
    category: string;
    id: string;
    image?: FluidObject;
}

interface ArticleCollectionProps {
    articles: ArticleTileData[];
}

const ArticleTile = ({ title, category, id, image }: ArticleTileData) => {
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

const ArticleCollection = ({ articles }: ArticleCollectionProps) => (
    <SimpleGrid spacingX={8} spacingY={8} py={10} w="100%" maxW="1200px" minChildWidth="300px" margin="auto">
        {articles.map((article) => (
            <ArticleTile
                title={article.title}
                id={article.id}
                category={article.category}
                key={article.id}
                image={article.image}
            />
        ))}
    </SimpleGrid>
);

export default ArticleCollection;
