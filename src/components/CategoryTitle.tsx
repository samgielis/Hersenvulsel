import React from 'react';
import { Category } from '../types/Category';
import { CategoryThemedHeading } from './CategoryThemedHeading';

interface CategoryTitleProps {
    category: Category;
}

const CategoryTitle = ({ category }: CategoryTitleProps) => {
    return (
        <CategoryThemedHeading
            size="xl"
        >
            {category === 'faitsdivers' ? 'faits divers' : category}
        </CategoryThemedHeading>
    );
};

export default CategoryTitle;
