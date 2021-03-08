import React from 'react';
import ReactMarkdown from 'react-markdown';
import ArticleImage from './ArticleImage';

export interface FluidArticleImageData {
    srcSet: string;
    originalName: string;
}
interface ArticleBodyProps {
    rawMarkdownBody: string;
    images: FluidArticleImageData[];
}

function createImageRenderer(images: FluidArticleImageData[]) {
    const ImageRenderer = ({ alt, src }: { alt: string; src: string }) => {
        const image = images.find(
            (possibleImage) => possibleImage.originalName === src
        );
        if (!image) {
            return (
                <p style={{ color: 'red' }}>
                    Er ging iets mis bij het laden van deze afbeelding
                </p>
            );
        }
        return <ArticleImage srcSet={image?.srcSet} credit={alt} />;
    };
    return ImageRenderer;
}

const ArticleBody = ({ rawMarkdownBody, images }: ArticleBodyProps) => {
    return (
        <ReactMarkdown
            renderers={{
                image: createImageRenderer(images),
            }}
        >
            {rawMarkdownBody}
        </ReactMarkdown>
    );
};

export default ArticleBody;
