export function stringReplaceAll(
    input: string,
    toReplace: string,
    replacement: string
): string {
    return input.split(toReplace).join(replacement);
}

export function linkTitleToUrl(title: string): string {
    if (title === 'Faits Divers') {
        return 'faitsdivers';
    }

    if (title === 'Home') {
        return '';
    }

    const url = stringReplaceAll(title.toLowerCase(), ' ', '-');
    return stringReplaceAll(url, '&', 'en');
}
