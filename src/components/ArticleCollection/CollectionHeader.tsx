import React from 'react';
import { Stack, Spacer, Box } from "@chakra-ui/layout"
import { Select, useBreakpointValue } from "@chakra-ui/react"
import { SortMethod } from "."
import { CategoryThemedHeading } from '../CategoryThemedHeading';

interface CollectionHeaderProps {
    onSortMethodChanged(sortMethod: SortMethod): void;
}

export const CollectionHeader: React.FC<CollectionHeaderProps> = ({ children, onSortMethodChanged }) => {
    return <Stack direction={useBreakpointValue({base: "column", default: "row", sm: "row"})} >
        <CategoryThemedHeading size="xl">{children}</CategoryThemedHeading>
        <Spacer />
        <Box>

            <Select size="md" onChange={({ currentTarget }) => { onSortMethodChanged(currentTarget.value as SortMethod) }}>
                <option defaultChecked value='NEWEST_FIRST'>Nieuwste eerst</option>
                <option value='OLDEST_FIRST'>Oudste eerst</option>
            </Select>
        </Box>
    </Stack>
}
