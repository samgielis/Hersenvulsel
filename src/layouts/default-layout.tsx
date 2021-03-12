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

interface LayoutProperties {
    children: ReactNode;
    category?: Category | 'default';
}

const Layout = ({ children, category }: LayoutProperties): JSX.Element => {
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
            <div>
                <main>{children}</main>
                <Footer categories={data.site.siteMetadata.categories} />
            </div>
        </>
    );
};

export default Layout;
