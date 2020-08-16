import React from 'react';

interface CategoryLinkProps {
    category: string;
}

const Footer = () => {
    const currentYear = new Date().getUTCFullYear();

    return (
        <footer className="hv-footer" id="hv-footer">
            <div className="row hv-footer-inner-container">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <img
                                className="logo-footer pull-left"
                                src="./img/logo/hv-footr.png"
                                alt="Hersenvulsel"
                            />
                            <div className="credits-label">
                                ©{' '}
                                <a
                                    className="footer-link-red"
                                    href="https://facebook.com/hersenvulsel"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Hersenvulsel
                                </a>{' '}
                                {currentYear} <br />
                                Design:{' '}
                                <a
                                    className="footer-link-red"
                                    href="https://be.linkedin.com/in/samgielis"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Sam Gielis
                                </a>
                                <div className="footer-spacer" />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="hv-footer-link-container">
                                <a className="footer-link" href="/">
                                    Home
                                </a>
                                <br />
                                <a className="footer-link" href="/wetenschap">
                                    Wetenschap
                                </a>
                                <br />
                                <a className="footer-link" href="/geschiedenis">
                                    Geschiedenis
                                </a>
                                <br />
                                <a className="footer-link" href="/mensen">
                                    Mensen
                                </a>
                                <br />
                                <a className="footer-link" href="/natuur">
                                    Natuur
                                </a>
                                <br />
                                <a
                                    className="footer-link"
                                    href="/entertainment"
                                >
                                    Entertainment
                                </a>
                                <br />
                                <a className="footer-link" href="/faitsdivers">
                                    Faits Divers
                                </a>
                                <br />
                                <a className="footer-link" href="/random">
                                    Random
                                </a>
                                <br />
                            </div>
                            <div className="footer-spacer" />
                        </div>
                        <div className="col-sm-4">
                            <div className="hv-footer-link-container">
                                <a className="footer-link" href="/contact">
                                    Contact
                                </a>
                                <br />
                                <a className="footer-link" href="/adverteren">
                                    Adverteren
                                </a>
                                <br />
                                <a
                                    className="footer-link"
                                    href="/cookies-en-privacy"
                                >
                                    Cookies & Privacy
                                </a>
                                <br />
                                <a
                                    className="footer-link"
                                    href="/gebr/uiksvoorwaarden"
                                >
                                    Gebruiksvoorwaarden
                                </a>
                            </div>
                            <div className="footer-spacer" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
