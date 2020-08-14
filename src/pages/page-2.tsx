// Gatsby supports TypeScript natively!
import { Link, PageProps } from 'gatsby';
import React from 'react';

import SEO from '../components/seo';
import Layout from '../layouts/default-layout';

const SecondPage = ({ path }: PageProps): JSX.Element => (
    <Layout>
        <SEO title="Page two" />
        <h1>Hi from the second page</h1>
        <p>Welcome to page 2 ({path})</p>
        <Link to="/">Go back to the homepage</Link>
    </Layout>
);

export default SecondPage;
