import React from "react"
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react"

const customTheme = extendTheme({
    fonts: {
        body: `"Helvetica Neue",Helvetica,Arial,sans-serif`,
        heading: `"Helvetica Neue",Helvetica,Arial,sans-serif`,
        mono: `"Helvetica Neue",Helvetica,Arial,sans-serif`,
    },
});

export const wrapRootElement = ({ element }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      {element}
    </ChakraProvider>
  )
}