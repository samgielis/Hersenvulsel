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
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
    fonts: {
        body: `"Helvetica Neue",Helvetica,Arial,sans-serif`,
        heading: `"Helvetica Neue",Helvetica,Arial,sans-serif`,
        mono: `"Helvetica Neue",Helvetica,Arial,sans-serif`,
    },
    colors: {
        hersenvulsel: {
            highlight: "#c93c3c",
            default: "#c93c3c",
            darkgray: "#222",
            lightgray: "#9d9d9d",
            wetenschap: "#2a6fa4",
            mensen: "#de3737",
            geschiedenis: "#e9d822",
            faitsdivers: "#ff8534",
            natuur: "#4ea648",
            entertainment: "#8833af"
        }
    }
});

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
        <ChakraProvider theme={customTheme}>
            <CSSReset />
            <CategoryHeader />
            <Navbar categories={data.site.siteMetadata.categories} />
            <Container maxW={containerSize === "lg" ? "1200px" : "container.md"}>
                <main>{children}</main>
            </Container>
            <Footer categories={data.site.siteMetadata.categories} />
        </ChakraProvider>
    );
};

export default Layout;
