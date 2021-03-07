import React from 'react';
import { Category } from '../types/Category';

interface CategoryTitleProps {
    category: Category;
}

const CategoryTitle = ({ category }: CategoryTitleProps) => {
    return (
        <h3 className={`hv-category-title-15px hv-c-${category}`}>
            {category === 'faitsdivers' ? 'faits divers' : category}
        </h3>
    );
};

export default CategoryTitle;
