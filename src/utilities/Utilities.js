export function abbreviateAuthors(names) {
    return (names.length > 3 ? names.slice(0, 3).concat(['...']) : names).join(', ');
}

export function publishYear(publishDate) {
    return publishDate ? `(${publishDate.split('-')[0]})` : '';
}
