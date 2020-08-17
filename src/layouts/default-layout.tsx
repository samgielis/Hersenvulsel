/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactNode } from 'react';
import Footer from '../components/Footer';
import './default-layout.css';
import './hv.css';
import Navbar from '../components/Navbar';

interface LayoutProperties {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProperties): JSX.Element => {
    return (
        <>
            <Navbar />
            <div>
                <main>{children}</main>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
