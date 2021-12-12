import { Heading } from '@chakra-ui/react';
import React from 'react';
import { Category } from '../../types/Category';
import { getCurrentCategory } from '../../utils/getCurrentCategory';

interface CategoryThemedHeadingProps {
    category?: Category;
    size?: "xl" | "2xl";
}

export const CategoryThemedHeading: React.FC<CategoryThemedHeadingProps> = ({ category, size, children }) => {
    const activeCategory = category || getCurrentCategory() || "default";
    return (
        <Heading
            as="h3"
            size={size || "xl"}
            color={`hersenvulsel.${activeCategory}`}
            textTransform="uppercase"
        >
            {children}
        </Heading>
    );
};
