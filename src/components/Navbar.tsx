import React from 'react';
import './Navbar.css';

const Navbar = () => (
    <div id="nav-wrapper" className="nav-wrapper" style={{ height: '90px' }}>
        <div id="nav">
            <div
                className="navbar navbar-inverse navbar-static"
                style={{ zIndex: 10 }}
            >
                <div className="container">
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
                    <div className="navbar-collapse collapse">
                        <ul className="nav  navbar-nav">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/wetenschap">Wetenschap</a>
                            </li>
                            <li>
                                <a href="/geschiedenis">Geschiedenis</a>
                            </li>
                            <li>
                                <a href="/mensen">Mensen</a>
                            </li>
                            <li>
                                <a href="/natuur">Natuur</a>
                            </li>
                            <li>
                                <a href="/entertainment">Entertainment</a>
                            </li>
                            <li>
                                <a href="/faitsdivers">Faits Divers</a>
                            </li>
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
                                <a href="/contact">
                                    <i className="fa fa-envelope fa-lg" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Navbar;
