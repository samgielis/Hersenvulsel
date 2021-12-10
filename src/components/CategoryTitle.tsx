import { Heading } from '@chakra-ui/react';
import React from 'react';
import { Category } from '../types/Category';

interface CategoryTitleProps {
    category: Category;
}

const CategoryTitle = ({ category }: CategoryTitleProps) => {
    return (
        <Heading
            as="h3"
            size="xl"
            className={`hv-category-title-15px hv-c-${category}`}
        >
            {category === 'faitsdivers' ? 'faits divers' : category}
        </Heading>
    );
};

export default CategoryTitle;
