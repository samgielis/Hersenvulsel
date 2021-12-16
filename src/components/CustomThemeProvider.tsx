import React from 'react';
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
    fonts: {
        body: `"Helvetica Neue",Helvetica,Arial,sans-serif`,
        heading: `"Helvetica Neue",Helvetica,Arial,sans-serif`,
        mono: `"Helvetica Neue",Helvetica,Arial,sans-serif`,
    },
    colors: {
        hersenvulsel: {
            highlight: "#c93c3c",
            default: "#c93c3c",
            darkgray: "#222",
            lightgray: "#9d9d9d",
            wetenschap: "#2a6fa4",
            mensen: "#de3737",
            geschiedenis: "#e9d822",
            faitsdivers: "#ff8534",
            natuur: "#4ea648",
            entertainment: "#8833af"
        }
    }
});


export const CustomThemeProvider: React.FC = ({ children }) => {
    return <ChakraProvider theme={customTheme}>
        <CSSReset />
        {children}
    </ChakraProvider>
}
