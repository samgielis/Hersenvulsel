import { Box } from '@chakra-ui/layout';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Category } from '../types/Category';
import { getCurrentCategory } from '../utils/getCurrentCategory';

interface CategoryHeaderData {
    allImageSharp: {
        nodes: {
            fixed: {
                originalName: string;
                src: string;
            };
            fluid: {
                originalImg: string;
            };
        }[];
    };
}

function getHeaderImageURL(
    category: Category | 'default',
    data: CategoryHeaderData
): string {
    const categoryNode = data.allImageSharp.nodes.find((node) => {
        return node.fluid.originalImg.indexOf(category) > -1;
    });
    return categoryNode?.fluid.originalImg || '';
}

// somehow regex /header-/ doesn't work for the header-wetenschap.
const CategoryHeader = () => {
    const category = getCurrentCategory();

    const data = useStaticQuery(graphql`
        query headerImages {
            allImageSharp(
                filter: { fixed: { originalName: { regex: "/ea/g" } } }
            ) {
                nodes {
                    fixed {
                        originalName
                        src
                    }
                    fluid {
                        originalImg
                    }
                }
            }
        }
    `);

    return (
        <Box className={`hv-pagehead`} bgColor={`hersenvulsel.${category}`} h="14vw" bgSize="cover">
            <img
                style={{
                    paddingTop: '0.49vw',
                    maxWidth: '95%',
                    maxHeight: '95%',
                    margin: "auto"
                }}
                src={getHeaderImageURL(category, data)}
                alt="Category header"
            />
        </Box>
    );
};

export default CategoryHeader;
