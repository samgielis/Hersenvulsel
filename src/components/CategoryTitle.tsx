import { Heading } from '@chakra-ui/react';
import React from 'react';
import { Category } from '../types/Category';
import { getCurrentCategory } from '../utils/getCurrentCategory';

interface CategoryTitleProps {
    category?: Category;
}

const CategoryTitle = ({ category }: CategoryTitleProps) => {
    const activeCategory = category || getCurrentCategory() || "default";
    return (
        <Heading
            as="h3"
            size="xl"
            color={`hersenvulsel.${activeCategory}`}
            textTransform="uppercase"
        >
            {activeCategory === 'faitsdivers' ? 'faits divers' : activeCategory}
        </Heading>
    );
};

export default CategoryTitle;
