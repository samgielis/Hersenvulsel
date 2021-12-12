import React from 'react';
import { Link as ChakraLink, LinkProps } from "@chakra-ui/layout"
import { ComponentWithAs } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";

export const Link: ComponentWithAs<"a", LinkProps> = (props) => {
    return <ChakraLink as={GatsbyLink} {...props} />
}

export const ExternalLink: ComponentWithAs<"a", LinkProps> = (props) => {
    return <ChakraLink {...props} />
}
