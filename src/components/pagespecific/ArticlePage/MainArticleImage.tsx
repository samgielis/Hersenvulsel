import { AspectRatio, Box } from '@chakra-ui/layout';
import React from 'react';
import { ArticleImageProps } from './ArticleImage';

const MainArticleImage = ({ srcSet, credit }: ArticleImageProps) => {
    return (
        <Box pb={10}>
            <figure>
                <AspectRatio ratio={16 / 9}>
                    <img
                        alt="main article"
                        srcSet={srcSet}
                    />
                </AspectRatio>
                <figcaption className="hv-article-figcaption">
                    <i className="fa fa-camera" /> <b>Credit: </b> {credit}
                </figcaption>
            </figure>
        </Box>
    );
};

export default MainArticleImage;
