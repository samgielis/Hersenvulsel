import React from 'react';
import { HStack, Heading, Spacer, Box } from "@chakra-ui/layout"
import { Select } from "@chakra-ui/react"
import { SortMethod } from "."
import { getCurrentCategory } from '../../utils/getCurrentCategory';

interface CollectionHeaderProps {
    onSortMethodChanged(sortMethod: SortMethod): void;
}

export const CollectionHeader: React.FC<CollectionHeaderProps> = ({ children, onSortMethodChanged }) => {
    const category = getCurrentCategory();
    return <HStack>
        <Heading size="3xl" color={`hersenvulsel.${category}`} textTransform={'uppercase'}>{children}</Heading>
        <Spacer />
        <Box>

            <Select size="lg" onChange={({ currentTarget }) => { onSortMethodChanged(currentTarget.value as SortMethod) }}>
                <option defaultChecked value='NEWEST_FIRST'>Nieuwste eerst</option>
                <option value='OLDEST_FIRST'>Oudste eerst</option>
            </Select>
        </Box>
    </HStack>
}
