import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import stringReplaceAll from '../utils/StringUtils';

interface FooterLinkProps {
    title: string;
}

const FooterLink = ({ title }: FooterLinkProps) => {
    let url = '';

    if (title !== 'Home') {
        url = stringReplaceAll(title.toLowerCase(), ' ', '-');
        url = stringReplaceAll(url, '&', 'en');
    }

    return (
        <Link className="footer-link" to={`/${url}`}>
            {title}
        </Link>
    );
};

const FooterLinkColumn = ({ content }: { content: string[] }) => (
    <div className="col-sm-4">
        <div className="hv-footer-link-container">
            {content.map((link: string) => (
                <div key={link}>
                    <FooterLink title={link} />
                    <br />
                </div>
            ))}
        </div>
        <div className="footer-spacer" />
    </div>
);

const Footer = () => {
    const currentYear = new Date().getUTCFullYear();

    const data = useStaticQuery(graphql`
        query HeaderQuery {
            site {
                siteMetadata {
                    title
                    author
                    categories
                }
            }
        }
    `);

    return (
        <footer className="hv-footer" id="hv-footer">
            <div className="row hv-footer-inner-container">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <img
                                className="logo-footer pull-left"
                                src="./img/logo/hv-footr.png"
                                alt={data.site.siteMetadata.title}
                            />
                            <div className="credits-label">
                                ©{' '}
                                <a
                                    className="footer-link-red"
                                    href="https://facebook.com/hersenvulsel"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {data.site.siteMetadata.title}
                                </a>{' '}
                                {currentYear} <br />
                                Design:{' '}
                                <a
                                    className="footer-link-red"
                                    href="https://be.linkedin.com/in/samgielis"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {data.site.siteMetadata.author}
                                </a>
                                <div className="footer-spacer" />
                            </div>
                        </div>
                        <FooterLinkColumn
                            content={[
                                'Home',
                                ...data.site.siteMetadata.categories,
                                'Random',
                            ]}
                        />
                        <FooterLinkColumn
                            content={[
                                'Contact',
                                'Adverteren',
                                'Cookies & Privacy',
                                'Gebruiksvoorwaarden',
                            ]}
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
