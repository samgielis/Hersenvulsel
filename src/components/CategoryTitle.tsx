import React from 'react';
import { CategoryThemedHeading, CategoryThemedHeadingProps } from './CategoryThemedHeading';

const CategoryTitle = ({ category , size}: CategoryThemedHeadingProps) => {
    return (
        <CategoryThemedHeading
            size={size}
            category={category}
        >
            {category === 'faitsdivers' ? 'faits divers' : category}
        </CategoryThemedHeading>
    );
};

export default CategoryTitle;
