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
import CategoryHeader from '../components/CategoryHeader';
import { Container } from '@chakra-ui/layout';
import { CustomThemeProvider } from '../components/CustomThemeProvider';


interface LayoutProperties {
    children: ReactNode;
    containerSize?: "md" | "lg";
}

const Layout = ({ children, containerSize }: LayoutProperties): JSX.Element => {
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
        <CustomThemeProvider>
            <CategoryHeader />
            <Navbar categories={data.site.siteMetadata.categories} />
            <Container maxW={containerSize === "lg" ? "1200px" : "container.md"}>
                <main>{children}</main>
            </Container>
            <Footer categories={data.site.siteMetadata.categories} />
        </CustomThemeProvider>
    );
};

export default Layout;
