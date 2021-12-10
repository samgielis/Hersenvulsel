import { Center, HStack, Link } from '@chakra-ui/layout';
import React from 'react';

interface ArticleSourceReferenceProps {
    name: string;
    url: string;
}

export const ArticleSourceReference = ({ name, url }: ArticleSourceReferenceProps) => {
    return <HStack spacing={4} textTransform="uppercase" fontSize="12px">
        <Center className="fa fa-link fa-lg" w="25px" h="25px" bgColor="gray.800" color="gray.100" />
        <Link href={url} isExternal target="_blank" color="blue.500">
            {name}
        </Link>
    </HStack>
}
