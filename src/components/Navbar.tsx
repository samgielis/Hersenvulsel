import React, { useState } from 'react';
import './Navbar.css';
import { linkTitleToUrl } from '../utils/StringUtils';
import { Box, Center, Container, HStack, Spacer, Stack } from '@chakra-ui/layout';
import { ExternalLink, Link } from './Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faFacebookF, faInstagram, faInstagramSquare } from '@fortawesome/free-brands-svg-icons'
import { faBars, faEnvelope, faHamburger } from '@fortawesome/free-solid-svg-icons';
import { IconButton, useBreakpointValue } from '@chakra-ui/react';

interface NavbarLinkProps {
    title: string;
}

const NavbarLink = ({ title }: NavbarLinkProps) => {
    return (
        <Link to={`/${linkTitleToUrl(title)}`}>{title}</Link>
    );
};

interface NavBarToggleProps {
    onToggle(): void;
    isCollapsed: boolean;
}
const MobileHeight = "45px";
const DesktopHeight = "65px;"
const NavBarToggle = ({ onToggle, isCollapsed }: NavBarToggleProps) => {
    const isMobile = useBreakpointValue({ base: true, lg: false }) === false ? false : true;
    
    if (!isMobile) {
        return null;
    }
    return <HStack h={MobileHeight}>
        <Spacer />
        <IconButton variant={"unstyled"} icon={<FontAwesomeIcon size="lg" icon={faBars} />} onClick={onToggle} aria-label={isCollapsed ? "Open menu" : "Close menu"} />
    </HStack>
}

interface NavbarProps {
    categories: string[];
}

const Navbar = ({ categories }: NavbarProps) => {
    const isMobile = useBreakpointValue({ base: true, lg: false }) === false ? false : true;
    const [isCollapsed, setIsCollapsed] = useState<boolean>(isMobile);
    const collapsedHeight = isMobile ? MobileHeight : DesktopHeight;
    const height = isCollapsed ? collapsedHeight : "95vh"

    return <Box mb={{ base: 0, md: 20 }} bgColor="hersenvulsel.darkgray" borderColor={"black"} textTransform="uppercase" fontWeight="bold" color="hersenvulsel.lightgray" h={height} w="100%" transition="all .2s ease-in-out" overflow="hidden">
        <NavBarToggle isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
            <Center h={isCollapsed && isMobile? "0px" : height} transition="all .2s ease-in-out" textAlign={"center"} opacity={isMobile && isCollapsed ? "0%" : "100%"} >
                <Stack spacing={12} direction={isMobile ? "column" : "row"}>

                    <Stack spacing={6} direction={isMobile ? "column" : "row"}>
                        {['Home', ...categories].map((title) => {
                            return <NavbarLink key={title} title={title} />;
                        })}
                    </Stack>
                    <HStack spacing={6}>
                        <ExternalLink
                            href="https://facebook.com/hersenvulsel"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon size="lg" icon={faFacebookF} />
                        </ExternalLink>
                        <ExternalLink
                            href="https://instagram.com/hersenvulsel"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon size="lg" icon={faInstagram} />
                        </ExternalLink>
                        <ExternalLink href="mailto:info@hersenvulsel.be">
                            <FontAwesomeIcon size="lg" icon={faEnvelope} />
                        </ExternalLink>
                    </HStack>
                </Stack>
            </Center>
    </Box>
};

export default Navbar;
