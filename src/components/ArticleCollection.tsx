import React from 'react';
import './ArticleCollection.css';
import Img, { FluidObject } from 'gatsby-image';

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
        <div className="col-sm-4 pad-bot-20">
            <div className="hv-tile-image-container">
                {image ? (
                    <Img
                        alt={title}
                        fluid={image}
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'black',
                        }}
                    />
                ) : (
                    <div />
                )}
                <b>
                    <p className="hv-tile-category">{category.toUpperCase()}</p>
                </b>

                <div className="hv-tile-title-container">
                    <h2 className="hv-tile-title hv-tile-title-default">
                        <span>
                            <a
                                href={`/${category}/${id}/`}
                                className="thumblink"
                            >
                                {title}
                            </a>
                        </span>
                    </h2>
                </div>
            </div>
        </div>
    );
};

const ArticleCollection = ({ articles }: ArticleCollectionProps) => (
    <div className="row">
        <div className="col-sm-12" style={{ paddingBottom: '50px' }}>
            <div className="row" id="hv-directory-container">
                {articles.map(ArticleTile)}
            </div>
        </div>
    </div>
);

export default ArticleCollection;
