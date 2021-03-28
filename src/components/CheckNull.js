export function CheckNull(item) {
    if (item === null || item === '' || item.toLowerCase() === 'undefined')
        return ''
    else
        return item
}