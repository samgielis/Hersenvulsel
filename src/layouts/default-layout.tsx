/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactNode } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Footer from '../components/Footer';
import './default-layout.css';
import './hv.css';
import Navbar from '../components/Navbar';
import { Category } from '../types/Category';
import CategoryHeader from '../components/CategoryHeader';
import { Container } from '@chakra-ui/layout';

interface LayoutProperties {
    children: ReactNode;
    category?: Category | 'default';
    containerSize?: "md" | "lg";
}

const Layout = ({ children, category, containerSize }: LayoutProperties): JSX.Element => {
    const data = useStaticQuery(graphql`
        query defaultQuery {
            site {
                siteMetadata {
                    categories
                }
            }
        }
    `);

    return (
        <>
            {category && <CategoryHeader category={category} />}
            <Navbar categories={data.site.siteMetadata.categories} />
            <Container maxW={containerSize === "lg" ? "ontainer.lg" : "container.md"}>
                <main>{children}</main>
            </Container>
            <Footer categories={data.site.siteMetadata.categories} />
        </>
    );
};

export default Layout;
