export default function ucwords(str: string) {
    return str.split(' ').filter(Boolean).map(v => v.substr(0, 1).toUpperCase() + v.substr(1)).join(' ')
}