import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { linkTitleToUrl } from '../utils/StringUtils';
import './Footer.css';
import { ExternalLink, Link } from './Link';

interface FooterLinkProps {
    title: string;
}

const FooterLink = ({ title }: FooterLinkProps) => {
    if (title === "Contact") {
        return <ExternalLink href="mailto:info@hersenvulsel.be" className="footer-link">{title}</ExternalLink>
    }
    return (
        <Link className="footer-link" to={`/${linkTitleToUrl(title)}`}>
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

interface FooterProps {
    categories: string[];
}

const Footer = ({ categories }: FooterProps) => {
    const currentYear = new Date().getUTCFullYear();

    const data = useStaticQuery(graphql`
        query FooterQuery {
            site {
                siteMetadata {
                    title
                    author
                }
            }
            footerImage: file(relativePath: { eq: "hv-footer.png" }) {
                childImageSharp {
                    fixed {
                        src
                    }
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
                                src={data.footerImage.childImageSharp.fixed.src}
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
                            content={['Home', ...categories, 'Random']}
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
