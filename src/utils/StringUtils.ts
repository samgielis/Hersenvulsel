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

export function getArticleCategoryFromAbsolutePath(path: string): string {
    const regexResult = path.match(/\/articles\/([^/]+)\//);
    if (!regexResult || regexResult.length < 2) {
        return '';
    }
    return regexResult[1];
}
