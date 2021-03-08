import React from 'react';
import { ArticleImageProps } from './ArticleImage';

const MainArticleImage = ({ srcSet, credit }: ArticleImageProps) => {
    return (
        <div
            className="pull-left"
            style={{ width: '100%', paddingBottom: '50px' }}
        >
            <figure>
                <img
                    alt="main article"
                    srcSet={srcSet}
                    className="pull-left"
                    style={{ float: 'left', maxWidth: '100%' }}
                />
                <figcaption className="hv-article-figcaption">
                    <i className="fa fa-camera" /> <b>Credit: </b> {credit}
                </figcaption>
            </figure>
        </div>
    );
};

export default MainArticleImage;
