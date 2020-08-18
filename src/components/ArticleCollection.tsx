import React from 'react';

export interface ArticleThumbnailData {
    title: string;
    category: string;
}

interface ArticleCollectionProps {
    articles: ArticleThumbnailData[];
}

const ArticleCollection = ({ articles }: ArticleCollectionProps) => (
    <div className="row">
        <div className="col-sm-12" style={{ paddingBottom: '50px' }}>
            <div className="row" id="hv-directory-container">
                <ul>
                    {articles.map((x) => {
                        return <li key={x.title}>{x.title}</li>;
                    })}
                </ul>
            </div>
        </div>
    </div>
);

export default ArticleCollection;
