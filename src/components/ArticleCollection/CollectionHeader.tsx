import React from 'react';
import { HStack, Spacer, Box } from "@chakra-ui/layout"
import { Select } from "@chakra-ui/react"
import { SortMethod } from "."
import { CategoryThemedHeading } from '../CategoryThemedHeading';

interface CollectionHeaderProps {
    onSortMethodChanged(sortMethod: SortMethod): void;
}

export const CollectionHeader: React.FC<CollectionHeaderProps> = ({ children, onSortMethodChanged }) => {
    return <HStack>
        <CategoryThemedHeading size="2xl">{children}</CategoryThemedHeading>
        <Spacer />
        <Box>

            <Select size="lg" onChange={({ currentTarget }) => { onSortMethodChanged(currentTarget.value as SortMethod) }}>
                <option defaultChecked value='NEWEST_FIRST'>Nieuwste eerst</option>
                <option value='OLDEST_FIRST'>Oudste eerst</option>
            </Select>
        </Box>
    </HStack>
}
