import React from 'react';
import './ArticleCollection.css';

export interface ArticleTileData {
    title: string;
    category: string;
    id: string;
}

interface ArticleCollectionProps {
    articles: ArticleTileData[];
}

const ArticleTile = ({ title, category, id }: ArticleTileData) => {
    return (
        <div className="col-sm-4 pad-bot-20">
            <div className="hv-tile-image-container">
                <img
                    alt={id}
                    src="https://hersenvulsel.be/mensen/psychiater-die-graag-tanden-verwijderde/img/main.jpg"
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'black',
                    }}
                />
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
                <ul>{articles.map(ArticleTile)}</ul>
            </div>
        </div>
    </div>
);

export default ArticleCollection;
