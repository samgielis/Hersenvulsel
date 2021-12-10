import { HStack } from '@chakra-ui/layout';
import React from 'react';
import { monthNumeralToName } from '../../../utils/StringUtils';

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
        <div className="col-sm-8">
            <HStack className="hv-author-thumbnail-container">
                <a href={authorProfileLink}>
                    <img
                        alt={authorName}
                        title={authorName}
                        className="hv-author-thumbnail"
                        src={authorImageSrc}
                    />
                </a>
                <div style={{ paddingLeft: '10px' }}>
                    <p className="hv-author-name">
                        <a
                            style={{ color: 'black' }}
                            className="hv-author-name-link"
                            href={authorProfileLink}
                        >
                            {authorName}
                        </a>
                    </p>
                    <p className="hv-date-line">
                        {`${date[2]} ${monthNumeralToName(date[1])} ${date[0]}`}
                    </p>
                </div>
            </HStack>
        </div>
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
