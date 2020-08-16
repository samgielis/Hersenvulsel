function stringReplaceAll(
    input: string,
    toReplace: string,
    replacement: string
): string {
    return input.split(toReplace).join(replacement);
}

export default stringReplaceAll;
