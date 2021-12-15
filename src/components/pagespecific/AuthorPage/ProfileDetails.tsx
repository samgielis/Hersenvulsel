import React from 'react';
import { Heading, HStack, VStack, Text } from "@chakra-ui/layout"
import { Avatar } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { AuthorsJsonNode } from '../../../templates/AuthorPage';
import { ExternalLink, Link } from '../../Link';

interface ProfileDetails {
    profileImgURL: string;
    author: AuthorsJsonNode;
}

export const ProfileDetails = ({author, profileImgURL}: ProfileDetails) => {
    const authorName = `${author.fname} ${author.lname}`;

    return <VStack w="100%" spacing={5}>
        <Avatar w={{ base: "75px", md: "140px" }} size="full" bg="transparent" name={authorName} src={profileImgURL} />
        <Heading
            as="h1"
            size="2xl"
        >{authorName}</Heading>
        <Text
            textAlign="center"
            fontSize="large"
            dangerouslySetInnerHTML={{
                __html: author.bio,
            }}
        />
        <Text
            textAlign="center"
            fontSize="medium">
            <VStack>
                <HStack spacing={3}>
                    <FontAwesomeIcon icon={faLink} />
                    <Link
                        to={author.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {author.urlname}
                    </Link>
                </HStack>
                <HStack spacing={3}>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <ExternalLink
                        href={`mailto:${author.contact}`}
                    >
                        {author.contact}
                    </ExternalLink>
                </HStack>
            </VStack>
        </Text>
    </VStack>
}
