let counter = 0
export default function (prefix="") {
    counter += 1
    return `${prefix}${(Math.floor(Math.random() * 101559956668416)).toString(36)}-${counter}`
}
