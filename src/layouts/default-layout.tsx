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
import { RandomArticlePromotion } from '../components/RandomArticlePromotion';
import { CSSReset } from '@chakra-ui/react';


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
            <RandomArticlePromotion/>
            <CategoryHeader />
            <Navbar categories={data.site.siteMetadata.categories} />
            <main>
            <Container maxW={containerSize === "lg" ? "1200px" : "container.md"}>
                <CSSReset />
                <div>
                    {children}
                </div>
            </Container>
            </main>
            <Footer categories={data.site.siteMetadata.categories} />
        </CustomThemeProvider>
    );
};

export default Layout;
