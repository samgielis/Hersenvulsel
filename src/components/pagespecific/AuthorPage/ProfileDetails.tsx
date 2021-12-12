import React from 'react';
import { Heading, HStack, Link, VStack, Text } from "@chakra-ui/layout"
import { Avatar } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { AuthorsJsonNode } from '../../../templates/AuthorPage';

interface ProfileDetails {
    profileImgURL: string;
    author: AuthorsJsonNode;
}

export const ProfileDetails = ({author, profileImgURL}: ProfileDetails) => {
    const authorName = `${author.fname} ${author.lname}`;

    return <VStack w="100%" spacing={5}>
        <Avatar w={{ base: "100px", md: "175px" }} size="full" bg="transparent" name={authorName} src={profileImgURL} />
        <Heading
            as="h1"
            size="4xl"
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
                        href={author.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {author.urlname}
                    </Link>
                </HStack>
                <HStack spacing={3}>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <Link
                        isExternal
                        href={`mailto:${author.contact}`}
                    >
                        {author.contact}
                    </Link>
                </HStack>
            </VStack>
        </Text>
    </VStack>
}
