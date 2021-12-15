import { Heading } from '@chakra-ui/react';
import React from 'react';
import { Category } from '../../types/Category';
import { getCurrentCategory } from '../../utils/getCurrentCategory';

export interface CategoryThemedHeadingProps {
    category?: Category;
    size?: "lg" | "xl";
}

export const CategoryThemedHeading: React.FC<CategoryThemedHeadingProps> = ({ category, size, children }) => {
    const activeCategory = category || getCurrentCategory() || "default";
    return (
        <Heading
            as="h3"
            size={size || "lg"}
            color={`hersenvulsel.${activeCategory}`}
            textTransform="uppercase"
        >
            {children}
        </Heading>
    );
};
