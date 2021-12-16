import { Center, HStack } from '@chakra-ui/layout';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ExternalLink } from '../../Link';

interface ArticleSourceReferenceProps {
    name: string;
    url: string;
}

export const ArticleSourceReference = ({ name, url }: ArticleSourceReferenceProps) => {
    return <HStack spacing={4} textTransform="uppercase" fontSize="12px">
        <Center w="25px" h="25px" bgColor="gray.800" color="gray.100" >
            <FontAwesomeIcon icon={faLink}/>
            </Center>
        <ExternalLink href={url} isExternal target="_blank" color="blue.500">
            {name}
        </ExternalLink>
    </HStack>
}
