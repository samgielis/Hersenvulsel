import React from 'react';
import ReactMarkdown from 'react-markdown';
import ArticleImage from './ArticleImage';

interface ArticleBodyProps {
    rawMarkdownBody: string;
}

const ImageRenderer = ({ alt, src }: { alt: string; src: string }) => {
    return <ArticleImage src={src} credit={alt} />;
};

const ArticleBody = ({ rawMarkdownBody }: ArticleBodyProps) => {
    return (
        <ReactMarkdown
            renderers={{
                image: ImageRenderer,
            }}
        >
            {rawMarkdownBody}
        </ReactMarkdown>
    );
};

export default ArticleBody;
