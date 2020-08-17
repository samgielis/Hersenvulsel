/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactNode } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './default-layout.css';
import './hv.css';

interface LayoutProperties {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProperties): JSX.Element => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    return (
        <>
            <Header siteTitle={data.site.siteMetadata.title} />
            <div>
                <main>{children}</main>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
