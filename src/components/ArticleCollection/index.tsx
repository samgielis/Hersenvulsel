import React, { useEffect, useState } from 'react';
import './ArticleCollection.css';
import { SimpleGrid, Stack } from '@chakra-ui/layout';
import { CollectionHeader } from './CollectionHeader';
import { ArticleTile, ArticleTileData } from './ArticleTile';

interface ArticleCollectionProps {
    collectionTitle: string;
    articles: ArticleTileData[];
}

const ArticleCollection = ({ articles, collectionTitle }: ArticleCollectionProps) => {
    articles.sort((a, b) => { return (+b.publishDate - +a.publishDate) });
    const [sortMethod, setSortMethod] = useState<SortMethod>("NEWEST_FIRST");
    const [sortedArticles, setSortedArticles] = useState<ArticleTileData[]>(articles);

    useEffect(() => {
        setSortedArticles(sortCollection(articles, sortMethod));
    }, [articles, sortMethod, setSortedArticles]);

    return <Stack w="100%" spacing={3}>
        <CollectionHeader onSortMethodChanged={setSortMethod}>{collectionTitle}</CollectionHeader>
        <SimpleGrid spacingX={4} spacingY={4} pb={10} w="100%" minChildWidth="300px" margin="auto">
            {sortedArticles.map((article) => (
                <ArticleTile
                    title={article.title}
                    id={article.id}
                    category={article.category}
                    key={article.id}
                    image={article.image}
                />
            ))}
        </SimpleGrid>
    </Stack>
}

export default ArticleCollection;

export type SortMethod = "OLDEST_FIRST" | "NEWEST_FIRST";

export function sortCollection(articles: ArticleTileData[], method: SortMethod): ArticleTileData[] {
    if (method === "NEWEST_FIRST") {
        articles.sort((a, b) => { return (+b.publishDate - +a.publishDate) });
    } else if (method === 'OLDEST_FIRST') {
        articles.sort((a, b) => { return (+a.publishDate - +b.publishDate) });
    }
    return [...articles];
}
