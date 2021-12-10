import React from 'react';
import { IconButton, Tooltip, useClipboard } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

export const CopyArticleLinkButton = () => {
    const { hasCopied, onCopy } = useClipboard(location.href, 3000);

    return <Tooltip label={hasCopied ? "Link gekopieerd!" : 'Kopieer link'} fontSize='lg' closeOnClick={false}>
        <IconButton fontSize="20px" variant="ghost" colorScheme="blue" size="lg" borderRadius="3xl" aria-label="Kopieer link naar artikel" icon={<FontAwesomeIcon icon={faLink} />} onClick={onCopy} />
    </Tooltip>

}
