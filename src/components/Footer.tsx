import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { linkTitleToUrl } from '../utils/StringUtils';
import './Footer.css';
import { ExternalLink, Link } from './Link';
import { Box, Center, HStack, Stack } from '@chakra-ui/layout';

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
    <div>
        <div className="hv-footer-link-container">
            {content.map((link: string) => (
                <div key={link}>
                    <FooterLink title={link} />
                    <br />
                </div>
            ))}
        </div>
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
        <footer className="hv-footer" >
            <Center w="100%" mt={20} py={20}>
                <div className="hv-footer-inner-container">
                    <Stack direction={{base: "column", md: "row"}} spacing={10}>

                        <HStack spacing={5}>
                            <Box>
                                <img
                                    className="logo-footer"
                                    src={data.footerImage.childImageSharp.fixed.src}
                                    alt={data.site.siteMetadata.title}
                                />
                            </Box>
                            <Box className="credits-label" pt={6} >
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
                            </Box>
                        </HStack>
                        <FooterLinkColumn
                            content={['Home', ...categories, 'Random']}
                        />
                        <FooterLinkColumn
                            content={[
                                'Contact',
                                'Cookies & Privacy',
                                'Gebruiksvoorwaarden',
                            ]}
                        />
                    </Stack>
                </div>
            </Center>
        </footer>
    );
};

export default Footer;
