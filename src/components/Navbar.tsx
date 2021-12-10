import React from 'react';
import './Navbar.css';
import { Link } from 'gatsby';
import { linkTitleToUrl } from '../utils/StringUtils';

interface NavbarLinkProps {
    title: string;
}

const NavbarLink = ({ title }: NavbarLinkProps) => {
    return (
        <li>
            <Link to={`/${linkTitleToUrl(title)}`}>{title}</Link>
        </li>
    );
};

const NavbarButton = () => (
    <button
        type="button"
        className="navbar-toggle"
        data-toggle="collapse"
        data-target=".navbar-collapse"
    >
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
    </button>
);

interface NavbarProps {
    categories: string[];
}

const Navbar = ({ categories }: NavbarProps) => (
    <div id="nav-wrapper" className="nav-wrapper" style={{ height: '90px' }}>
        <div id="nav">
            <div
                className="navbar navbar-inverse navbar-static"
                style={{ zIndex: 10 }}
            >
                <div className="container">
                    <NavbarButton />
                    <div className="navbar-collapse collapse">
                        <ul className="nav  navbar-nav">
                            {['Home', ...categories].map((title) => {
                                return <NavbarLink key={title} title={title} />;
                            })}
                        </ul>
                        <ul className="nav pull-right navbar-nav">
                            <li>
                                <a
                                    href="https://facebook.com/hersenvulsel"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i className="fa fa-facebook fa-lg" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://instagram.com/hersenvulsel"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i className="fa fa-instagram fa-lg" />
                                </a>
                            </li>
                            <li>
                                <Link to="/contact">
                                    <i className="fa fa-envelope fa-lg" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Navbar;
