import React from 'react';

interface ArticleImageProps {
    src: string;
    credit?: string;
}

const ArticleImage = ({ src, credit }: ArticleImageProps) => {
    return (
        <figure style={{ paddingTop: '20px', paddingBottom: '20px' }}>
            <img src={src} alt={credit} style={{ maxWidth: '100%' }} />
            <figcaption
                className="hv-article-figcaption"
                style={{ fontSize: '0.4em' }}
            >
                <i className="fa fa-camera" />
                <b> credit: </b> {credit}
            </figcaption>
        </figure>
    );
};

export default ArticleImage;
