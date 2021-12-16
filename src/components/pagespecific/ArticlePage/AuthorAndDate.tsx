import { HStack, Stack, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';
import React from 'react';
import { monthNumeralToName } from '../../../utils/StringUtils';
import { Link } from '../../Link';

interface AuthorAndDateProps {
    authorhandle: string;
    authorName: string;
    authorImageSrc: string;
    dateString: string;
}

const AuthorAndDate = ({
    authorhandle,
    authorName,
    authorImageSrc,
    dateString,
}: AuthorAndDateProps) => {
    const date = dateString.split('/');
    if (date[2].charAt(0) === '0') {
        date[2] = date[2].charAt(1);
    }

    const authorProfileLink = `../../a/${authorhandle}`;
    return (
        <HStack spacing={4} mb={2}>

            <Avatar as={Link} to={authorProfileLink} name={authorName} src={authorImageSrc} background="transparent" size="lg" _hover={{ opacity: ".8" }} />

            <Stack spacing={0}>
                <Link
                fontSize={"xl"}
                    style={{ color: 'black' }}
                    to={authorProfileLink}
                >
                    {authorName}
                </Link>
                <Text fontSize={"md"}>
                    {`${date[2]} ${monthNumeralToName(date[1])} ${date[0]}`}
                </Text>
            </Stack>
        </HStack>
    );
};

export default AuthorAndDate;

/*
var datum = date.split("/");
    var auth="";
    auth += "<div class=\"hv-author-thumbnail-container pull-left\">";
    auth += "            <a href=\"..\/..\/a\/" + authid + "\">";
    auth += "              <img title=\"" + name + "\" class=\"hv-author-thumbnail\" src=\"..\/..\/a\/" + authid + "\/" + "profiel.png\"\/>";
    auth += "            <\/a>";
    auth += "          <\/div>";
    auth += "          <div style=\"padding-left: 10px\">";
    auth += "            <p class=\"hv-author-name\"><a class=\"hv-author-name-link\" href=\"..\/..\/a\/" + authid + "\">" + name + "<\/a><\/p>";
    if(datum[2].charAt(0) == "0"){
        datum[2] = datum[2].charAt(1);
    }
    auth += "            <p class=\"hv-date-line\">" + datum[2] + " " + this.month_to_monthname(datum[1]) + " " + datum[0] + "<\/p>";
    auth += "          <\/div>";
    return auth;
    */
