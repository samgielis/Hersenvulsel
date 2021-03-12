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

export function monthNumeralToName(month_numeral: string): string {
    switch (month_numeral) {
        case '01':
            return 'Januari';
        case '02':
            return 'Februari';
        case '03':
            return 'Maart';
        case '04':
            return 'April';
        case '05':
            return 'Mei';
        case '06':
            return 'Juni';
        case '07':
            return 'Juli';
        case '08':
            return 'Augustus';
        case '09':
            return 'September';
        case '10':
            return 'Oktober';
        case '11':
            return 'November';
        case '12':
            return 'December';
        default:
            return 'Onbekend';
    }
}
