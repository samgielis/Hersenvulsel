import React, { useEffect } from 'react';
import { Center, Heading } from "@chakra-ui/layout"
import { Drawer, DrawerContent, DrawerCloseButton, DrawerBody, useDisclosure } from "@chakra-ui/react"
import { Link } from './Link';

export const RandomArticlePromotion = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    useEffect(() => { setTimeout(onOpen, 5000) }, [])

    return <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen} trapFocus={false} blockScrollOnMount={false}>
    <DrawerContent  bgColor={"hersenvulsel.highlight"} >
    <DrawerCloseButton color="white" />
        <DrawerBody>
            <Center>
                <Link to="/random" color="white">
                    <Heading textTransform="uppercase">
                        Zin in avontuur? Klik hier!
                    </Heading>
                </Link>
            </Center>
        </DrawerBody>
    </DrawerContent>
</Drawer>
}
